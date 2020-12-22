const { DATE } = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
        //모델의 Attributes (Column)을 정의하는곳
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        thumbnailURL: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            reference: {
                model: User,
                key: 'id',
            }
        },
        videoURL: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        view_count: {
            type: DataTypes.INTEGER,
        },
        category_one: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        category_two: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        category_three: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        video_source: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};