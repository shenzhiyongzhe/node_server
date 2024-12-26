const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Users = seq.define(
    'users',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            comment: '用户id',
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '用户账号'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '账号密码'
        },
        permission: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '用户权限'
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'token',
        },
        login_time: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: 0,
            comment: '登录记录'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

// Users.sync({ force: true });

module.exports = Users;
