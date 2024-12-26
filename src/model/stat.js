const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Stat = seq.define(
    'stat',
    {
        date: {
            primaryKey: true,
            type: DataTypes.STRING(12),
            comment: '统计数据的日期',
        },
        total_value: {
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '总价值'
        },
        total_stock: {
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '总库存'
        },
        daily_produce:{
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '每日产出'
        },
        total_produce: {
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '总产出'
        },
        net_income: {
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '净收益',
        },
        total_income:{
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '总收益'
        },
        traded_vm_number:{
            type:DataTypes.INTEGER.UNSIGNED,
            comment:'已交易设备数量'
        },
        total_vm_number:{
            type:DataTypes.INTEGER,
            comment:'总设备'
        },
        account_value: {
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '账号价值'
        },
        fixed_cost: {
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '固定成本'
        },
        total_cost: {
            type: DataTypes.BIGINT.UNSIGNED,
            comment: '总成本'
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

// Stats.sync({ force: true });

module.exports = Stat;
