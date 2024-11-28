import express from "express"; 
import cors from "cors"; 
import data from "./data.js";  

const app = express();  

// Enable CORS for all routes
app.use(cors());  

// API endpoint to get products
app.get("/api/products", (req, res) => {
  res.json(data.products);
});  

// API endpoint to get a product by its slug
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// API endpoint to get a product by its _id
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
