const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/react-Ecommerce-db",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    brand: String,
    availableColors: [String],
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      Email: String,
      Name: String,
      Address: String,
      total: Number,
      CartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/order", async (req, res) => {
  const Neworder = new Order(req.body);
  const savedOrder = await Neworder.save();
  console.log(savedOrder);
  res.send(savedOrder);
});

const port = process.env.PORT || 3000;

if(process.env.NODE_ENV==='production')
{
app.use(express.static('SHOPPINGCART/build'))
}
app.listen(port, () => console.log("serve at http://localhost:3000"));
