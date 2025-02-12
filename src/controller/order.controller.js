const { findOrCreate, findAll, } = require("../service/order.service")

class OrderController
{
    async create(ctx)
    {
        try
        {
            const res = await findOrCreate(ctx.request.body)
            ctx.body = {
                code: 0,
                msg: "创建订单成功",
                result: res
            }
        } catch (error)
        {
            console.log(error);
        }

    }
    async findAll(ctx)
    {
        try
        {
            const res = await findAll(ctx.request.body)
            ctx.body = {
                code: 0,
                msg: "查询订单信息成功",
                result: res
            }
        } catch (error)
        {
            console.log(error);
        }

    }
}

module.exports = new OrderController