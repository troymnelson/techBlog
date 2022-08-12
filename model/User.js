const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

const sequelize = require('./conn');


class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'user',

        hooks: {
            async beforeCreate(user) {
                const hashed_pass = await bcrypt.hash(user.password, 10);
                user.password = hashed_pass;
            }
        }
    }
);


User.prototype.validatePassword = async function (password, stored_password) {
    return await bcrypt.compare(password, stored_password);
}


module.exports = User;