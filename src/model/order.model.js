const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Order = seq.define(
    'orders',
    {
        id: {
            primaryKey: true,
            type: DataTypes.STRING(30),
            comment: 'id',
        },
        recipient: {
            type: DataTypes.STRING(20),
            comment: '收钻的实例编号',
            allowNull: true,
        },
        sender: {
            type: DataTypes.STRING(20),
            comment: '出钻的实例编号',
            allowNull: true,
        },
        serverName: {
            type: DataTypes.STRING(10),
            comment: '区服信息'
        },
        equipmentType: {
            type: DataTypes.STRING(20),
            comment: '装备类型'
        },
        equipmentName: {
            type: DataTypes.STRING(20),
            comment: '装备名称'
        },
        englishName: {
            type: DataTypes.STRING(20),
            comment: '装备英文名称'
        },
        identified: {
            type: DataTypes.BOOLEAN,
            comment: "装备是否鉴定"
        },
        purchasePrice: {
            type: DataTypes.INTEGER,
            comment: '购买价格'
        },
        soldPrice: {
            type: DataTypes.INTEGER,
            comment: '出售价格'
        },
        state: {
            type: DataTypes.STRING(20),
            comment: '订单状态'
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

// Order.sync({ force: true });

module.exports = Order;