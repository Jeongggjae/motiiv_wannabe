const { watch_page, user } = require('../models');
const Post = require('./post');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Is_watch', {
        //모델의 Attributes (Column)을 정의하는곳
        UserId: {
            type: DataTypes.STRING(),
            reference: {
                model: User,
                foreignKey: 'id',
            }
        },
        PostId: {
            type: DataTypes.STRING(),
            reference: {
                model: Post,
                foreignKey: 'id',
            }
        },
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};