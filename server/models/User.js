const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter your name"
        },
        is: {
          args: [/^[a-zA-Z ]*$/],
          msg: "Name must only contain letters"
        },
        len: {
          args: [5, 50],
          msg: "Name must only contain min 5 and max 50 letters"
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: "Email address already in use!"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Enter a valid email"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your password"
        }
      }
    }
  },
  { timestamps: false }
);

module.exports = User;
