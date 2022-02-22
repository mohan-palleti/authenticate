const mongoose = require("mongoose");
const bcrpt = require("bcryptjs");
const Userschema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

Userschema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  var hash = bcrpt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

Userschema.methods.checkPassword = function (password) {
  return bcrpt.compareSync(password, this.password);
};

const User = mongoose.model("user", Userschema);

module.exports = User;
