const { watch_page } = require('../models');
const Post = require('./post');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Like', {
        //모델의 Attributes (Column)을 정의하는곳
        UserId: {
            type: DataTypes.INTEGER,
            reference: {
                model: User,
                key: 'id',
            }
        },
        PostId: {
            type: DataTypes.INTEGER,
            reference: {
                model: Post,
                key: 'id',
            }
        },
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};