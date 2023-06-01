const express = require("express");
const path = require("path");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const SendShopToken = require("../utils/SendShopToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller } = require("../middleware/auth");

const router = express.Router();

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  const { email } = req.body;
  const EmailId = await Shop.findOne({ email });
  if (EmailId) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "error in deleting file" });
      }
    });
    return next(new ErrorHandler("User already exists", 400));
  }
  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const { name, password, address, phoneNumber, zipCode } = req.body;
  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
    phoneNumber: phoneNumber,
    address: address,
    zipCode: zipCode,
  };

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click on the link to activate your shop: ${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `please check your email:- ${user.email} to activate your account!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//create token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate seller
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      //   console.log("Hey ", newSeller);
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      SendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//seller-login

router.post(
  "/login-seller",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please fill all required fields!", 400));
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("Seller doen't exists!", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password!", 400));
      }
      SendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

//load seller
router.get(
  "/get-seller-details",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);

      if (!seller) {
        return next(new ErrorHandler("seller doen't exists!", 400));
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message), 500);
    }
  })
);

// log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
