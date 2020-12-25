const { watch_page, user } = require('../models');
const Post = require('./post');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: false
        },
        //모델의 Attributes (Column)을 정의하는곳
        UserId: {
            type: DataTypes.INTEGER,
            reference: {
                model: User,
                key: 'id',
            },
            unique: false
        },
        PostId: {
            type: DataTypes.INTEGER,
            reference: {
                model: Post,
                key: 'id',
            },
            unique: false
        },
        content: {
            type: DataTypes.STRING(),
            allowNull: false,
            unique: false
        },
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};