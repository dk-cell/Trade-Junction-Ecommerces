const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middleware/error");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const user = require("./controller/userController");
const shop = require("./controller/shopController");
const product = require("./controller/productController");
const event = require("./controller/eventController");
const coupon = require("./controller/couponController");

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);


app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.use(ErrorHandler);

module.exports = app;
