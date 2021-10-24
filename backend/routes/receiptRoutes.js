const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Receipt = require("../models/receiptModel.js");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");
const axios = require("axios");
const cron = require("node-cron");

// setInterval(function(){
//   if(userArray) {
//     var report = mongoose.connection.db.collection('report');
//     report.insert({datenow:new Date(),userlist:userArray},function(err,doc) {
//       if(err) throw err;
//     });
//   }
// },600000);

async function loop() {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.LOYVERSE_TOKEN}`,
      "Content-Type": "application/json",
      Origin: "*",
    },
  };

  const { data } = await axios.get(
    `https://api.loyverse.com/v1.0/receipts`,
    config
  );

  const LastData = await Receipt.aggregate([
    {
      $sort: {
        receipt_date: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);
  // console.log(LastData);
  // res.json(LastData)

  (async () => {
    // console.log(data)
    
      // console.log(data.receipts[i].receipt_date)
      // console.log("date = " + data.receipts[0].receipt_date )
      // console.log(LastData[0]);
      // console.log(LastData[0].receipt_date < data.receipts[i].receipt_date);

    
      if (LastData.length === 1) {
        for (let i = 0; i < data.receipts.length; i++) {
        if (
          LastData[0].receipt_date < data.receipts[i].receipt_date 
        ) {

          let duplicate = await Receipt.find({receipt_number : data.receipts[i].receipt_number })
        
          console.log(duplicate)
          if(duplicate.length === 0) {

            await Receipt.create(data.receipts[i]);
          }
          // console.log(data.receipts[i])
        }
      }
      } else if (LastData.length === 0) {
        await Receipt.create(data.receipts[0]);
      }
    
  })();
}

setInterval(loop, 6000);

router.route("/").get(
  asyncHandler(async (req, res) => {
    // const receipts = await Receipt.find({});

    const pageSize = 50;
    const page = req.query.pageNumber ? req.query.pageNumber : 1;

    // console.log(req.query.display);

    if (req.query.display === "All") {
      const receipts = await Receipt.aggregate([
        {
          $group: {
            _id: "$receipt_type",
            Total: {
              $sum: {
                $toInt: "$total_money",
              },
            },
          },
        },
      ]);

      res.json(receipts);
    } else {
      const count = await Receipt.countDocuments({});
      const receipts = await Receipt.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      res.json({ receipts, page, pages: Math.ceil(count / pageSize) });
    }
  })
);

router.route("/sum").get(
  asyncHandler(async (req, res) => {
    const receipts = await Receipt.find({});

    res.json({ receipts });
  })
);

router.route("/unpaid").get(
  asyncHandler(async (req, res) => {
    // const receipts = await Receipt.find({ });

    const receipts = await Receipt.aggregate([
      {
        $match: {
          paid: false,
        },
      },
      {
        $sort: {
          created_at: -1,
        },
      },
    ]);

    res.json(receipts);
  })
);

router.route("/").put(
  asyncHandler(async (req, res) => {
    const receiptNumber = req.query.receiptNumber;

    const receipt = await Receipt.find({
      receipt_number: receiptNumber,
    });

    // console.log(receipt === {})

    if (receipt && receipt.receipt_number === receiptNumber) {
      await Receipt.findOneAndUpdate(
        { receipt_number: receiptNumber },
        {
          $set: {
            paid: false,
          },
        },
        { useFindAndModify: false }
      );
    } else {
      try {
        console.log(receiptNumber);

        const config = {
          headers: {
            Authorization: `Bearer ${process.env.LOYVERSE_TOKEN}`,
            "Content-Type": "application/json",
            Origin: "*",
          },
        };

        const { data } = await axios.get(
          `https://api.loyverse.com/v1.0/receipts/${receiptNumber}`,
          config
        );
        const receipt = [{ ...data, paid: false }];

        await Receipt.create(receipt);
      } catch (error) {
        console.error(error);
      }
    }
  })
);

router.route("/paid").put(
  asyncHandler(async (req, res) => {
    const receiptNumber = req.query.receiptNumber;
    const { date } = req.body;

    await Receipt.findOneAndUpdate(
      { receipt_number: receiptNumber },
      {
        $set: {
          paid: true,
          date_paid: date,
        },
      },
      { useFindAndModify: false }
    );
  })
);

router.route("/remove").put(
  asyncHandler(async (req, res) => {
    const receiptNumber = req.query.receiptNumber;

    await Receipt.findOneAndUpdate(
      { receipt_number: receiptNumber },
      {
        $set: {
          paid: true,
        },
      },
      { useFindAndModify: false }
    );
  })
);

// router.route("/getAll").get(
//   asyncHandler(async(req,res) => {

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${process.env.LOYVERSE_TOKEN}`,
//           "Content-Type": "application/json",
//           Origin: "*",
//         },
//       };
//       const { data } = await axios.get(
//         `https://api.loyverse.com/v1.0/receipts?limit=250`,
//         config
//       );

//       // console.log(data)

//       let dataArr = []
//       let cursor = data.cursor
//       let index = 0

//       // console.log(cursor)

//       console.log(dataArr)

//       // (async ()=>{
//         while(cursor !== 0) {
//           const { data } = await axios.get(
//             `https://api.loyverse.com/v1.0/receipts?cursor=${cursor}&limit=250`,
//             config
//           )
//           cursor = data.cursor ? data.cursor : 0
//           index = index + 1
//           // dataArr.push(data.receipts)
//           // console.log(data)
//           await Receipt.insertMany(data.receipts)
//         }
//       //  })();

//       // res.json(dataArr)
//     }
//     catch(error) {

//       console.error(error)
//     }

//   })
// )

module.exports = router;
