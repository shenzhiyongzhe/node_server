const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const DevOps = seq.define(
    'devOps',
    {
        project: {
            primaryKey: true,
            type: DataTypes.STRING(20),
            comment: '项目名称',
        },
        insList: {
            type: DataTypes.TEXT("long"),
            comment: '跳过的实例编号'
        },

    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

// DevOps.sync({ force: true });

module.exports = DevOps;
