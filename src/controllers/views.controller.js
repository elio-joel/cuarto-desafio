import { ProductService } from "../services/products.services.js";

import CartMongoManager from "../dao/mongoManagers/carts.manager.js";

const register = async (req, res) => {
  res.render("register", { title: "Welcome new User!!", style: "login.css" });
};

const login = async (req, res) => {
  res.render("login", { title: "Hello User!!", style: "login.js" });
};

const resetPasswordRequest = async (req, res) => {
  res.render("resetPasswordRequest", {
    title: "Hello User!! Lets recover your password",
    style: "login.css",
  });
};

const resetPassword = async (req, res) => {
  res.render("resetPassword", {
    title: "Hello User!! Lets recover your password",
    style: "login.css",
  });
};

const userProfile = async (req, res) => {
  res.render("userProfile", {
    title: "User profile",
    style: "login.css",
    user: req.user,
  });
};

const staticProducts = async (req, res) => {
  const productsServices = new ProductService();
  const products = await productsServices.getProducts(100);
  res.render("home", {
    title: "MarcelaBeauty",
    style: "product.css",
    products: products,
  });
};

const realTimeProducts = async (req, res) => {
  res.render("realTimeProducts", {
    title: "MarcelaBeauty",
    style: "productList.css",
  });
};

const webchat = async (req, res) => {
  res.render("chat", {
    style: "chat.css",
    title: "MarcelaBeauty Support",
    user: req.user,
  });
};

const products = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category, available } = req.query;
    // baseUrl obtiene los links de navegacion
    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;
    const productsServices = new ProductService();
    const products = await productsServices.getProducts(
      limit,
      page,
      sort,
      category,
      available,
      baseUrl
    );
    res.render("productList", {
      title: "MarcelaBeauty",
      style: "productList.css",
      products: products,
      user: req.user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const carts = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartManager = new CartMongoManager();
    const cart = await cartManager.getCartById(cartId);
    res.render("cart", {
      title: "MarcelaBeauty",
      style: "cart.css",
      cart: cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {
  register,
  login,
  resetPasswordRequest,
  resetPassword,
  userProfile,
  staticProducts,
  realTimeProducts,
  webchat,
  products,
  carts,
};
