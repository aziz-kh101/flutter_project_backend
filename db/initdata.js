const mongoose = require("mongoose");
const Food = require("../models/food");
require("dotenv").config();

const foods = [
  {
    name: "Cheese Burger",
    description:
      "The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.",
    timeToCook: 15,
    image: "/images/burger/b1.png",
    price: 5.99,
    rating: 4.5,
    category: "Burger",
  },
  {
    name: "Chicken Burger",
    image: "/images/burger/b2.png",
    description:
      "The Chicken Burger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.",
    timeToCook: 20,
    price: 6.99,
    rating: 4.5,
    category: "Burger",
  },
  {
    name: "Veggie Burger",
    description:
      "The Veggie Burger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.",
    image: "/images/burger/b3.png",
    price: 4.99,
    rating: 4.5,
    timeToCook: 10,
    category: "Burger",
  },
  {
    name: "Fish Burger",
    description:
      "The Fish Burger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.",
    image: "/images/burger/b4.png",
    price: 7.99,
    rating: 4.5,
    timeToCook: 25,
    category: "Burger",
  },
];

const init = async () => {
  await mongoose.connect(process.env.CONNECT_DB_URI);
  await Food.deleteMany();
  await Food.insertMany(foods);
  console.log("Initialized food data");
  process.exit();
};

init();
