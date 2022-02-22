require("dotenv").config();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../modules/user_module");

const newToken = (user) => {
  console.log(process.env.JWT_KEY);
  return jwt.sign({ user }, process.env.JWT_KEY);
};

const register =
  (body("user_name")
    .notEmpty()
    .isEmail()
    .withMessage("please enter proper Username"),
  body("email").notEmpty().isEmail(),
  body("password")
    .notEmpty()
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage("Enter a proper password"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await User.findOne({ email: req.body.email });
      //if user is found send error
      if (user) {
        return res.status(401).send("try another email");
      }
      // if user not  found . create user

      user = await User.create(req.body);

      const token = newToken(user);

      res.status(201).send({ user, token });
    } catch (err) {
      res.status(501).send(err.message);
    }
  });

const login =
  (body("email").notEmpty().isEmail(),
  body("password")
    .notEmpty()
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage("Enter a proper password"),
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.status(401).send("try aonther email or password");

      const match = user.checkPassword(req.body.password);
      if (!match) return res.status(401).send("try aonther email or password");

      const token = newToken(user);

      res.status(201).send({ user, token, message: true });
    } catch (err) {
      res.status(501).send(err.message);
    }
  });

module.exports = { register, login };
