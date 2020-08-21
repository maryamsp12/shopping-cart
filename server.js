// 1- install nodemon globally
// 2- add server.js
// 3- In server.js implement backend. for that we need to some libraries.
// express(web server) body-parser(parse data inside the post request to the server) mongoose(connect us to mongodb database) shortid(library to save user friendly id to the product)
// npm install express body-parser mongoose shortid & import in server.js file

// Postman is a tool where you can run your API and get the result
// run npm run server in a new terminal

// import all installed packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// initialize mongoose db. takes two parameters 1- url and 2- for better connection to bd
mongoose.connect(
    "mongodb://localhost/react-shopping-cart-db",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });

// define product model. mongoosemodel is responsible for creating a model.
// it accepts two parameters name of this collection inside db and list of fields of this model inside db
const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: { type: String, default: shortid.generate }, // new id will be created and set to the _id
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    }))

// define api to get list of products
app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// create new product in db
app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})

// delete product
app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

// launch the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));