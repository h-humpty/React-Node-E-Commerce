const items = [
  {
    Item: "Extension Cable",
    Category: "Other",
  },
  {
    Item: "Tez Pata",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/0f9/0f9f5f95df173e9ffaaff2977bef88f3.jpg",
  },
  {
    Item: "7up",
    Category: "Beverage",
  },
  {
    Item: "Aquafina",
    Category: "Beverage",
  },
  {
    Item: "Ahmed Butt",
    Category: "Salary",
    MonthlySalary: 15000,
  },
  {
    Item: "Chicken",
    Category: "Poultry",
    image:
      "https://www.edamam.com/food-img/d33/d338229d774a743f7858f6764e095878.jpg",
  },
  {
    Item: "Achaar",
    Category: "Grocery",
  },
  {
    Item: "Acid",
    Category: "Cleaning Product",
  },
  {
    Item: "Air Freshner",
    Category: "Cleaning Product",
  },
  {
    Item: "Ajwain",
    Category: "Spice",
  },
  {
    Item: "Apple",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Aux Cable",
    Category: "Other",
  },
  {
    Item: "Almond",
    Category: "Grocery",
  },
  {
    Item: "Baisan",
    Category: "Grocery",
  },
  {
    Item: "Baking Powder",
    Category: "Grocery",
  },
  {
    Item: "Baking Soda",
    Category: "Grocery",
  },
  {
    Item: "Ballpoint Pen",
    Category: "Office Supply",
  },
  {
    Item: "Banana",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Bandage",
    Category: "Medical Supply",
  },
  {
    Item: "Beef",
    Category: "Beef",
  },
  {
    Item: "Bell Pepper",
    Category: "Fruits & Vegetables",
    image:
      "https://www.edamam.com/food-img/4dc/4dc48b1a506d334b4ab6671b9d56a18f.jpeg",
  },
  {
    Item: "Bill Book",
    Category: "Office Supply",
  },
  {
    Item: "Biryani Masala",
    Category: "Spice",
  },
  {
    Item: "Biryani Parcel",
    Category: "Parcel Supply",
  },
  {
    Item: "Black Pepper",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/c6e/c6e5c3bd8d3bc15175d9766971a4d1b2.jpg",
  },
  {
    Item: "Blade",
    Category: "Other",
  },
  {
    Item: "Blender Repair",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Bringal",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Bucket",
    Category: "Cleaning Product",
  },
  {
    Item: "Bulb",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Burger Bun",
    Category: "Grocery",
  },
  {
    Item: "Butter",
    Category: "Grocery",
  },
  {
    Item: "Butter Paper",
    Category: "Grocery",
  },
  {
    Item: "Cabbage",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Cashew",
    Category: "Grocery",
    image:
      "https://www.edamam.com/food-img/484/4848d71f6a14dd5076083f5e17925420.jpg",
  },
  {
    Item: "Surgical Cap",
    Category: "Medical Supply",
  },
  {
    Item: "Car",
    Category: "Petrol",
  },
  {
    Item: "Amjad",
    Category: "Personal",
  },
  {
    Item: "Carrot",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Cement",
    Category: "Other",
  },
  {
    Item: "Chaat Masala",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/c3f/c3f96d47d334b92f0120ff0b3a512ec3.jpg",
  },
  {
    Item: "Charger",
    Category: "Other",
  },
  {
    Item: "Cheese",
    Category: "Grocery",
  },
  {
    Item: "China Salt",
    Category: "Spice",
  },
  {
    Item: "Choona",
    Category: "Other",
  },
  {
    Item: "Choti Ilaichi",
    Category: "Spice",
  },
  {
    Item: "Cilantro",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Cleaning Brush",
    Category: "Cleaning Product",
  },
  {
    Item: "Cleaning Cloth",
    Category: "Cleaning Product",
  },
  {
    Item: "Cleaning Product",
    Category: "Cleaning Product",
  },
  {
    Item: "Coal",
    Category: "Coal",
  },
  {
    Item: "Coconut Powder",
    Category: "Grocery",
  },
  {
    Item: "Coke",
    Category: "Beverage",
  },
  {
    Item: "Condensend Milk",
    Category: "Grocery",
  },
  {
    Item: "Corn Flour",
    Category: "Grocery",
  },
  {
    Item: "Cream",
    Category: "Grocery",
  },
  {
    Item: "Cucumber",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Currency Checker Light",
    Category: "Other",
  },
  {
    Item: "Cylinder",
    Category: "Cylinder",
  },
  {
    Item: "Daar Cheeni",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/d4d/d4daa18b92c596a1c99c08537c38e65b.jpg",
  },
  {
    Item: "Daal Chana",
    Category: "Grocery",
  },
  {
    Item: "Daal Maash",
    Category: "Grocery",
  },
  {
    Item: "Daal Masoor",
    Category: "Grocery",
  },
  {
    Item: "Delivery",
    Category: "Petrol",
  },
  {
    Item: "Mountain Dew ",
    Category: "Beverage",
  },
  {
    Item: "Sookha Dhaniya",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/a90/a901cee0b9028841d258f5d07b5924e7.jpg",
  },
  {
    Item: "Green Dhaniya",
    Category: "Fruits & Vegetables",
    image:
      "https://www.edamam.com/food-img/d57/d57e375b6ff99a90c7ee2b1990a1af36.jpg",
  },
  {
    Item: "Diary",
    Category: "Office Supply",
  },
  {
    Item: "Dimmer",
    Category: "Other",
  },
  {
    Item: "Dishwashing Foam",
    Category: "Cleaning Product",
  },
  {
    Item: "Dishwashing Soap",
    Category: "Cleaning Product",
  },
  {
    Item: "Disposable Cup",
    Category: "Parcel Supply",
  },
  {
    Item: "Dried Plum",
    Category: "Spice",
  },
  {
    Item: "Dry Grass",
    Category: "Other",
  },
  {
    Item: "Egg",
    Category: "Grocery",
  },
  {
    Item: "Electric Bill (Restaurant)",
    Category: "Rent & Bill",
  },
  {
    Item: "Electric Bill (House)",
    Category: "Rent & Bill",
  },
  {
    Item: "Electrician",
    Category: "Contractor",
    image:
      "https://www.edamam.com/food-img/39d/39d4bfdf9dad662e89ae7bcb933c0def.jpg",
  },
  {
    Item: "Elaichi",
    Category: "Spice",
  },
  {
    Item: "Ethernet Cable",
    Category: "Office Supply",
  },
  {
    Item: "Fine(Maida)",
    Category: "Wheat",
  },
  {
    Item: "Fish",
    Category: "Fish",
  },
  {
    Item: "Fish Masala",
    Category: "Spice",
  },
  {
    Item: "Flex",
    Category: "Advertisment",
  },
  {
    Item: "Flour",
    Category: "Wheat",
  },
  {
    Item: "Food Color",
    Category: "Spice",
  },
  {
    Item: "Garam Masala",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/c23/c23e20823b442067307aa436969358f1.jpg",
  },
  {
    Item: "Garlic",
    Category: "Fruits & Vegetables",
    image:
      "https://www.edamam.com/food-img/6ee/6ee142951f48aaf94f4312409f8d133d.jpg",
  },
  {
    Item: "Gas Lighter",
    Category: "Kitchen Supply",
  },
  {
    Item: "Generator Repair",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Ghee",
    Category: "Grocery",
    image:
      "https://www.edamam.com/food-img/2b5/2b504c036c64481b224c9d74cc4a82e0.jpg",
  },
  {
    Item: "Ginger",
    Category: "Fruits & Vegetables",
    image:
      "https://www.edamam.com/food-img/b9c/b9c06ef451ef29513880af0a53ebbaa6.jpg",
  },
  {
    Item: "Drinking Glass",
    Category: "Crockery",
  },
  {
    Item: "Glass Cleaner",
    Category: "Cleaning Product",
  },
  {
    Item: "Glass Parcel",
    Category: "Parcel Supply",
  },
  {
    Item: "Glucose",
    Category: "Grocery",
  },
  {
    Item: "Grape",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Green Pepper",
    Category: "Fruits & Vegetables",
    image:
      "https://www.edamam.com/food-img/73f/73ff2eeb21372fe15b0ec51f9ecf368d.jpeg",
  },
  {
    Item: "Green Tea",
    Category: "Grocery",
  },
  {
    Item: "Haldee",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/03e/03eb469286b3caf1ae9c13e4eba13587.jpg",
  },
  {
    Item: "Holder",
    Category: "Other",
  },
  {
    Item: "Ice",
    Category: "Other",
  },
  {
    Item: "Ice Cream",
    Category: "Grocery",
  },
  {
    Item: "Icing Sugar",
    Category: "Spice",
  },
  {
    Item: "Imli",
    Category: "Grocery",
  },
  {
    Item: "Internet Bill",
    Category: "Rent & Bill",
  },
  {
    Item: "Iodine",
    Category: "Medical Supply",
  },
  {
    Item: "Jaifal",
    Category: "Spice",
  },
  {
    Item: "Jalwatri",
    Category: "Spice",
  },
  {
    Item: "Kachri Powder",
    Category: "Spice",
  },
  {
    Item: "Kali Elaichi",
    Category: "Spice",
  },
  {
    Item: "Kadu",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Kalvanji",
    Category: "Spice",
  },
  {
    Item: "Kasuri Mehthi",
    Category: "Spice",
  },
  {
    Item: "Ketchup",
    Category: "Grocery",
  },
  {
    Item: "Kucha",
    Category: "Cleaning Product",
  },
  {
    Item: "Kishmish",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/159/159e247350db62e1f87b0636a53687f5.jpg",
  },
  {
    Item: "Laung",
    Category: "Spice",
  },
  {
    Item: "Lemon",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Lettuce",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Lemon Juice",
    Category: "Grocery",
    image:
      "https://www.edamam.com/food-img/e31/e310952d214e78a4cb8b73f30ceeaaf2.jpg",
  },
  {
    Item: "Dishwashing Liquid",
    Category: "Cleaning Product",
  },
  {
    Item: "Loader",
    Category: "Transportation",
  },
  {
    Item: "Lock",
    Category: "Other",
  },
  {
    Item: "Ludo Shee",
    Category: "Other",
  },
  {
    Item: "Mask",
    Category: "Medical Supply",
  },
  {
    Item: "MatchBox",
    Category: "Grocery",
  },
  {
    Item: "Mayonnaise",
    Category: "Grocery",
  },
  {
    Item: "Memory Ram",
    Category: "Other",
  },
  {
    Item: "Menu Lamination",
    Category: "Other",
  },
  {
    Item: "Milk",
    Category: "Dairy",
    image:
      "https://www.edamam.com/food-img/7c9/7c9962acf83654a8d98ea6a2ade93735.jpg",
  },
  {
    Item: "Mint",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Mirror",
    Category: "Other",
  },
  {
    Item: "Mistari",
    Category: "Contractor",
  },
  {
    Item: "Mix Fruit",
    Category: "Grocery",
  },
  {
    Item: "Mop",
    Category: "Cleaning Product",
  },
  {
    Item: "Mosquito Powder",
    Category: "Cleaning Product",
  },
  {
    Item: "Motor Switch",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Motorcycle Repair",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Mozarella",
    Category: "Grocery",
  },
  {
    Item: "Mutton",
    Category: "Mutton",
  },
  {
    Item: "Newspaper",
    Category: "Parcel Supply",
  },
  {
    Item: "Newspaper Distributor",
    Category: "Advertisment",
  },
  {
    Item: "Oil",
    Category: "Grocery",
    image:
      "https://www.edamam.com/food-img/07e/07e106ab3536d57428e5c46d009038f8.jpg",
  },
  {
    Item: "Olive Oil",
    Category: "Grocery",
  },
  {
    Item: "Onion",
    Category: "Fruits & Vegetables",
    image:
      "https://www.edamam.com/food-img/205/205e6bf2399b85d34741892ef91cc603.jpg",
  },
  {
    Item: "Order Book",
    Category: "Office Supply",
  },
  {
    Item: "Pamphlet Distribution",
    Category: "Advertisment",
  },
  {
    Item: "Panadol",
    Category: "Medical Supply",
  },
  {
    Item: "Papaya",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Paprika",
    Category: "Spice",
  },
  {
    Item: "Paper A4",
    Category: "Office Supply",
  },
  {
    Item: "Parcel Bag",
    Category: "Parcel Supply",
  },
  {
    Item: "Parcel Box",
    Category: "Parcel Supply",
  },
  {
    Item: "Parcel Cup",
    Category: "Parcel Supply",
  },
  {
    Item: "Parcel Glass",
    Category: "Parcel Supply",
  },
  {
    Item: "Pea",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Peanut",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Pen",
    Category: "Office Supply",
  },
  {
    Item: "Pepsi",
    Category: "Beverage",
  },
  {
    Item: "Photocopy",
    Category: "Office Supply",
  },
  {
    Item: "Pineapple",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Pipe",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Pistachio",
    Category: "Grocery",
  },
  {
    Item: "Plumbing",
    Category: "Contractor",
  },
  {
    Item: "Potato",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Pressure Rubber",
    Category: "Kitchen Supply",
  },
  {
    Item: "Printer",
    Category: "Office Supply",
  },
  {
    Item: "Raddish",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Recharge Card",
    Category: "Telecom",
  },
  {
    Item: "Red Pepper",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Red Pepper Flakes",
    Category: "Spice",
  },
  {
    Item: "Red Pepper Powder",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/e6f/e6f19043caefc23b5feda5520076617e.jpg",
  },
  {
    Item: "Rent",
    Category: "Rent & Bill",
  },
  {
    Item: "Rice",
    Category: "Grocery",
    image:
      "https://www.edamam.com/food-img/e35/e35ea1529983a3db51a32a1afa7b3837.jpg",
  },
  {
    Item: "Salt",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/694/6943ea510918c6025795e8dc6e6eaaeb.jpg",
  },
  {
    Item: "Saffron",
    Category: "Spice",
  },
  {
    Item: "Saunf",
    Category: "Spice",
  },
  {
    Item: "Scale Repair",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Scrapper",
    Category: "Other",
  },
  {
    Item: "Sesame Seed",
    Category: "Spice",
  },
  {
    Item: "Shampoo",
    Category: "Other",
  },
  {
    Item: "Shawarma Bread",
    Category: "Grocery",
  },
  {
    Item: "Sprayer",
    Category: "Kitchen Supply",
  },
  {
    Item: "Soap",
    Category: "Cleaning Product",
  },
  {
    Item: "Sooji",
    Category: "Spice",
  },
  {
    Item: "Biscuit",
    Category: "Grocery",
  },
  {
    Item: "Soy Sauce",
    Category: "Grocery",
  },
  {
    Item: "Spinach",
    Category: "Fruits & Vegetables",
  },
  {
    Item: "Sponge",
    Category: "Cleaning Product",
  },
  {
    Item: "Sprite",
    Category: "Beverage",
  },
  {
    Item: "Medicine",
    Category: "Medical Supply",
  },
  {
    Item: "Sting",
    Category: "Beverage",
  },
  {
    Item: "Straw",
    Category: "Kitchen Supply",
  },
  {
    Item: "Sugar",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/011/01178ad203a61393cfcfd240d51aa1e6.jpg",
  },
  {
    Item: "Surf",
    Category: "Cleaning Product",
  },
  {
    Item: "Swahgha",
    Category: "Spice",
  },
  {
    Item: "Tape",
    Category: "Other",
  },
  {
    Item: "Tea",
    Category: "Grocery",
    image:
      "https://www.edamam.com/food-img/793/79376cb6e124624e22780db7401601a4.jpg",
  },
  {
    Item: "Tahini",
    Category: "Grocery",
  },
  {
    Item: "Tissue",
    Category: "Cleaning Product",
  },
  {
    Item: "Tomato",
    Category: "Fruits & Vegetables",
    image:
      "https://www.edamam.com/food-img/23e/23e727a14f1035bdc2733bb0477efbd2.jpg",
  },
  {
    Item: "Toothpick",
    Category: "Restaurant Supply",
  },
  {
    Item: "Towel",
    Category: "Cleaning Product",
  },
  {
    Item: "Transportation",
    Category: "Transportation",
  },
  {
    Item: "VGA Cable",
    Category: "Office Supply",
  },
  {
    Item: "Vinegar",
    Category: "Grocery",
  },
  {
    Item: "Wallpaper",
    Category: "Decor",
  },
  {
    Item: "Tap Water",
    Category: "Beverage",
    image:
      "https://www.edamam.com/food-img/5dd/5dd9d1361847b2ca53c4b19a8f92627e.jpg",
  },
  {
    Item: "Weighing Balance Repair",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Weld",
    Category: "Repair & Maintainence",
  },
  {
    Item: "Welder",
    Category: "Contractor",
  },
  {
    Item: "White Chick Peas",
    Category: "Grocery",
  },
  {
    Item: "White Pepper",
    Category: "Spice",
  },
  {
    Item: "Wire",
    Category: "Other",
  },
  {
    Item: "Wood",
    Category: "Other",
  },
  {
    Item: "Wrapping Roll",
    Category: "Kitchen Supply",
  },
  {
    Item: "Yeast",
    Category: "Grocery",
  },
  {
    Item: "Yoghurt",
    Category: "Dairy",
    image:
      "https://www.edamam.com/food-img/933/933eb3791b3a2175e007f1607d56b7e2.jpg",
  },
  {
    Item: "Zeera",
    Category: "Spice",
    image:
      "https://www.edamam.com/food-img/07e/07e2a4eb77ce46591033846504817d35.jpg",
  },
  {
    Item: "Knife",
    Category: "Kitchen Supply",
  },
];

module.exports = items;
