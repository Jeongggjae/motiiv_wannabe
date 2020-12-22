const { watch_page, user } = require('../models');
const Post = require('./post');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        //모델의 Attributes (Column)을 정의하는곳
        UserId: {
            type: DataTypes.STRING(),
            reference: {
                model: User,
                key: 'id'
            }
        },
        PostId: {
            type: DataTypes.STRING(),
            reference: {
                model: Post,
                key: 'id',
            }
        },
        content: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        comment_date: {
            type: DataTypes.DATEONLY(),
        },
        comment_update: {
            type: DataTypes.DATEONLY(),
            allowNull: false,
        },
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: false,
    });
};