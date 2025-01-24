const { DataTypes } = require('sequelize');

const seq = require('../db/seq');
const Instance = seq.define(
    'instances',
    {
        id: {
            primaryKey: true,
            type: DataTypes.STRING(10),
            comment: 'id',
        },
        ins: {
            type: DataTypes.STRING(20),
            comment: '实例编号'
        },
    },
    {
        timestamps: false,
    }
);

// Instance.sync({ force: true });

module.exports = Instance;