const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Devices = seq.define(
    'devices',
    {
        vm: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: '云机编号',
        },
        serverName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "00",
            comment: '服务器名称'
        },
        lv: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            defaultValue: 0,
            comment: '玩家等级'
        },
        combatPower: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            comment: '战斗力'
        },
        diamond: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            comment: '钻石总数量',
        },
        monthlyIncome: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            comment: '月收益'
        },
        dailyDiamond: {
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '日收益'
        },
        historyDealRecord: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: "历史交易数据"
        },
        config: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: "脚本配置文件"
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

// Devices.sync({ force: true });

module.exports = Devices;
