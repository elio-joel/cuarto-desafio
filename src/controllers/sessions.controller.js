import { UserService } from "../services/user.services.js";

const userService = new UserService();

const register = (req, res) => {
  res.send({ status: 1, msg: "New User registered", user: req.user });
};

const login = (req, res) => {
  res
    .cookie(process.env.AUTH_COOKIE, req.user, { httpOnly: true })
    .send({ status: 1, msg: "User successfully logged in", jwt: req.user });
};

const resetPassword = (req, res) => {
  res.send({ status: 1, msg: "Password successfully reseted." });
};
const resetpasswordrequest = async (req, res) => {
  try {
    const { email } = req.body;
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const user = await userService.createResetPasswordRequest(email, baseUrl);
    res.send({
      status: 1,
      msg: `Email to reset the password was successfully sent to ${user.email}.`,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  const jwtCookie = req.cookies[process.env.AUTH_COOKIE];
  if (!jwtCookie) {
    return res.status(400).send({ status: 0, msg: "User is not logged in." });
  }
  res
    .clearCookie(process.env.AUTH_COOKIE)
    .send({ status: 1, msg: "User successfully logged out" });
};

const github = (req, res) => {};

const githubCallback = (req, res) => {
  res
    .cookie(process.env.AUTH_COOKIE, req.user, { httpOnly: true })
    .redirect("/products");
};

const currentUser = (req, res) => {
  res.send({ status: 1, msg: "User logged in", user: req.user });
};

const togglePremiumFeature = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await userService.togglePremiumFeature(email);
    res.send({
      status: 1,
      msg: `Premium feature for ${user.email} successfully toggled. New role is ${user.role}`,
    });
  } catch (error) {
    next(error);
  }
};


export default {
  register,
  login,
  resetPassword,
  logout,
  github,
  githubCallback,
  currentUser,
};
