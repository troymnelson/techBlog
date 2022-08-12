const { Model, DataTypes } = require("sequelize");

const sequelize = require('./conn');
const User = require('./User');

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    },

    {
        sequelize,
        underscored: true,
        modelName: 'post',
    }
);


User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;