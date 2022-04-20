'use strict';
const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Course);
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'First Name value is required'
          },
          notEmpty: {
            msg: 'First Name value is required'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Last Name value is required'
          },
          notEmpty: {
            msg: 'Last Name value is required'
          }
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email Address must be unique'
        },
        validate: {
          isEmail: {
            msg: 'Email Address format is invalid'
          },
          notNull: {
            msg: 'Email Address value is required'
          },
          notEmpty: {
            msg: 'Email Address value is required'
          }
        }
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          len: {
            args: [7,50],
            msg: 'Password must 7 - 50 characters long.'
          },
          // Commenting out additional password validations for now since it's not a project requirement
          // is: {
          //   args: /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$/,
          //   msg: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Special characters $%!@-+= okay.'
          // },
          notNull: {
            msg: 'Password value is required'
          },
          notEmpty: {
            msg: 'Password value is required'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      hooks: {
        // Sequelize Hooks info: https://sequelize.org/docs/v6/other-topics/hooks/
        // When a new user is created using the /api/users POST route the user's password
        // should be hashed before persisting the user to the database.
        afterValidate: (user) => {
          if (user.password) {
            user.password = bcryptjs.hashSync(user.password,10);
          }
        }
      },
    sequelize }
  );
  return User;
};
