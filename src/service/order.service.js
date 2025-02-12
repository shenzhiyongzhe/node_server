const { Op } = require('sequelize');
const Order = require('../model/order.model');

class OrderService
{
    async findOrCreate(params)
    {
        const { id } = params;
        const [order, created] = await Order.findOrCreate({
            where: { id },
            defaults: params
        })

        if (!created)
        {
            await Order.update(params, { where: { id } });
        }
        return order
    }

    async findAll(params)
    {
        const { pageNum = 1, pageSize = 100, ...condition } = params;
        const res = await Order.findAll({
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
            where: condition
        })
        return res;
    }
}

module.exports = new OrderService();