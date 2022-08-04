const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const db = require("./db/db.js");
const productRoutes = require("./routes/productRoutes.js");

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connected");
  }
});

app.use(express.static("../supernova-retail-app/dist"));
app.use(express.static("verify"));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../supernova-retail-app/dist", "index.html")
  );
});

app.use("/products", productRoutes);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
