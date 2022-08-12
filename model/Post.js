const { Model, DataTypes } = require("sequelize");

const sequelize = require('./conn');

class Post extends Model { }

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;