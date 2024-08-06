require("dotenv").config(); // Load environment variables first

const mongoose = require("mongoose");
const Product = require("./models/Product"); // Ensure this path is correct

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    seedDB();
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

const seedProducts = [
  {
    name: "Laptop",
    description:
      "A high-performance laptop suitable for programming and design.",
    price: 1200,
    imageUrl: "http://localhost:3000/images/laptop.jpeg",
    category: "Electronics",
    stock: 15,
  },

  {
    name: "Smartphone",
    description:
      "A latest-model smartphone with a high-resolution camera and fast processor.",
    price: 800,
    imageUrl: "http://localhost:3000/images/smartphone.jpeg",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness levels.",
    price: 45,
    imageUrl: "http://localhost:3000/images/desk_lamp.jpeg",
    category: "Home",
    stock: 30,
  },
  {
    name: "Office Chair",
    description:
      "Ergonomic office chair with lumbar support and adjustable height.",
    price: 220,
    imageUrl: "http://localhost:3000/images/office_chair.jpeg",
    category: "Furniture",
    stock: 12,
  },

  {
    name: "Coffee Maker",
    description:
      "Automatic coffee maker with programmable timer and multiple brew settings.",
    price: 90,
    imageUrl: "http://localhost:3000/images/coffee_maker.jpeg",
    category: "Kitchen",
    stock: 18,
  },
  {
    name: "Smartwatch",
    description:
      "Smartwatch with health tracking features and customizable watch faces.",
    price: 200,
    imageUrl: "http://localhost:3000/images/smartwatch.jpeg",
    category: "Electronics",
    stock: 22,
  },
  {
    name: "Water Bottle",
    description:
      "Durable stainless steel water bottle with insulation to keep drinks cold or hot.",
    price: 20,
    imageUrl: "http://localhost:3000/images/water_bottle.jpeg",
    category: "Accessories",
    stock: 50,
  },
  {
    name: "Backpack",
    description: "Stylish and functional backpack with multiple compartments.",
    price: 60,
    imageUrl: "http://localhost:3000/images/backpack.jpeg",
    category: "Accessories",
    stock: 28,
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with high-quality sound and long battery life.",
    price: 75,
    imageUrl: "http://localhost:3000/images/bluetooth_speaker.jpeg",
    category: "Electronics",
    stock: 35,
  },
  {
    name: "Camera",
    description:
      "Digital camera with a high-resolution sensor and optical zoom lens.",
    price: 500,
    imageUrl: "http://localhost:3000/images/camera.jpeg",
    category: "Electronics",
    stock: 10,
  },
  {
    name: "Gaming Console",
    description: "Latest gaming console with a library of popular games.",
    price: 350,
    imageUrl: "http://localhost:3000/images/gaming_console.jpeg",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Air Purifier",
    description:
      "High-efficiency air purifier with multiple filtration stages.",
    price: 130,
    imageUrl: "http://localhost:3000/images/air_purifier.jpeg",
    category: "Home",
    stock: 12,
  },
  {
    name: "Digital Thermometer",
    description:
      "Accurate and fast digital thermometer for temperature measurement.",
    price: 18,
    imageUrl: "http://localhost:3000/images/digital_thermometer.jpeg",
    category: "Health",
    stock: 30,
  },
  {
    name: "Fitness Tracker",
    description:
      "Wearable fitness tracker with heart rate monitor and activity tracking.",
    price: 80,
    imageUrl: "http://localhost:3000/images/fitness_tracker.jpeg",
    category: "Fitness",
    stock: 25,
  },
  {
    name: "Electric Kettle",
    description:
      "Fast-boiling electric kettle with automatic shut-off and temperature control.",
    price: 35,
    imageUrl: "http://localhost:3000/images/electric_kettle.jpeg",
    category: "Kitchen",
    stock: 20,
  },
  {
    name: "Desk Organizer",
    description: "Wooden desk organizer with compartments for office supplies.",
    price: 40,
    imageUrl: "http://localhost:3000/images/desk_organizer.jpeg",
    category: "Office",
    stock: 18,
  },
  {
    name: "Exercise Bike",
    description:
      "Adjustable exercise bike with built-in workout programs and resistance levels.",
    price: 250,
    imageUrl: "http://localhost:3000/images/exercise_bike.jpeg",
    category: "Fitness",
    stock: 8,
  },
  {
    name: "Smart Home Hub",
    description:
      "Central hub for controlling smart home devices and automation.",
    price: 100,
    imageUrl: "http://localhost:3000/images/smart_home_hub.jpeg",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Reading Glasses",
    description:
      "Stylish reading glasses with anti-reflective coating and comfortable fit.",
    price: 25,
    imageUrl: "http://localhost:3000/images/reading_glasses.jpeg",
    category: "Accessories",
    stock: 40,
  },
  {
    name: "Portable Charger",
    description:
      "Compact portable charger with high-capacity battery and fast charging.",
    price: 30,
    imageUrl: "http://localhost:3000/images/portable_charger.jpeg",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Electric Toothbrush",
    description:
      "Rechargeable electric toothbrush with multiple brushing modes.",
    price: 60,
    imageUrl: "http://localhost:3000/images/electric_toothbrush.jpeg",
    category: "Health",
    stock: 15,
  },
  {
    name: "Wall Art",
    description: "Framed wall art with modern abstract design.",
    price: 90,
    imageUrl: "http://localhost:3000/images/wall_art.jpeg",
    category: "Home",
    stock: 10,
  },
  {
    name: "Headphones",
    description:
      "Noise-cancelling over-ear headphones with high sound quality.",
    price: 150,
    imageUrl: "http://localhost:3000/images/headphones.jpeg",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Blanket",
    description: "Soft and warm blanket made from high-quality materials.",
    price: 50,
    imageUrl: "http://localhost:3000/images/blanket.jpeg",
    category: "Home",
    stock: 25,
  },
  {
    name: "Cooking Pan",
    description: "Durable non-stick cooking pan with ergonomic handle.",
    price: 70,
    imageUrl: "http://localhost:3000/images/cooking_pan.jpeg",
    category: "Kitchen",
    stock: 18,
  },
  {
    name: "Plant Pot",
    description: "Decorative plant pot made from eco-friendly materials.",
    price: 15,
    imageUrl: "http://localhost:3000/images/plant_pot.jpeg",
    category: "Home",
    stock: 40,
  },
  {
    name: "Handbag",
    description: "Stylish handbag with ample space and multiple pockets.",
    price: 120,
    imageUrl: "http://localhost:3000/images/handbag.jpeg",
    category: "Accessories",
    stock: 22,
  },
  {
    name: "Yoga Mat",
    description: "High-density yoga mat with a non-slip surface.",
    price: 25,
    imageUrl: "http://localhost:3000/images/yoga_mat.jpeg",
    category: "Fitness",
    stock: 40,
  },
  {
    name: "Cookbook",
    description:
      "A cookbook with a variety of delicious recipes for every occasion.",
    price: 35,
    imageUrl: "http://localhost:3000/images/cookbook.jpeg",
    category: "Books",
    stock: 30,
  },
  {
    name: "Blank Notebook",
    description: "Simple blank notebook for notes and sketches.",
    price: 12,
    imageUrl: "http://localhost:3000/images/blank_notebook.jpeg",
    category: "Stationery",
    stock: 50,
  },
  {
    name: "Smart Light Bulb",
    description:
      "Wi-Fi enabled smart light bulb with adjustable brightness and color.",
    price: 25,
    imageUrl: "http://localhost:3000/images/smart_light_bulb.jpeg",
    category: "Home",
    stock: 30,
  },
];

// Add more products as needed

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("Database seeded!");
  } catch (err) {
    console.error("Error seeding database", err);
  } finally {
    mongoose.connection.close();
  }
};
