const { watch_page } = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        //모델의 Attributes (Column)을 정의하는곳
        userName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        profileImage: {
            type: DataTypes.STRING(),
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATEONLY(),
            allowNull: false,
        },
        join_day: {
            type: DataTypes.DATEONLY(),
            allowNull: false,
        },
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};