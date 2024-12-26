const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello word");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.SERVER_NAME}:${process.env.SERVER_PASSWORD}@cluster0.xuxoczf.mongodb.net/?retryWrites=true&w=majority`;
console.log(process.env.SERVER_NAME);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    client.connect();
    const productsCollction = client.db("MegaMart").collection("products");
    const catgoryCollction = client.db("MegaMart").collection("catagoroy");
    const daliyProductCollction = client
      .db("MegaMart")
      .collection("dailyProduct");
    // await client.db("admin").command({ ping: 1 });
    app.get("/products", async (req, res) => {
      const qurey = {};
      const result = await productsCollction.find(qurey).toArray();
      res.send(result);
    });
    app.get("/catgory", async (req, res) => {
      const qurey = {};
      const result = await catgoryCollction.find(qurey).toArray();
      res.send(result);
    });
    app.get("/dailyProduct", async (req, res) => {
      const qurey = {};
      const result = await daliyProductCollction.find(qurey).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));
app.listen(port, () => {
  console.log("server is running");
});
