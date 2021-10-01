const dailyExpenseInputList = require('../../RestaurantInventoryApp/Data/DailyExpenseInputList')
const dotenv = require("dotenv");
dotenv.config();

function remove_duplicates(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}


console.log(remove_duplicates(dailyExpenseInputList))

