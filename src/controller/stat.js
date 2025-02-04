const { createOrUpdateStat, findData, } = require("../service/stat")

class StatController
{
    async create(ctx)
    {
        try
        {
            const res = await createOrUpdateStat(ctx.request.body);
            ctx.body = {
                code: 0,
                message: '更新数据成功',
                result: res,
            };
        } catch (err)
        {
            console.error(err);
            return ctx.app.emit('error', "添加数据失败", ctx);
        }
    }

    async queryData(ctx)
    {
        try
        {
            const res = await findData(ctx.request.query);

            ctx.body = {
                code: 0,
                message: '查询数据成功',
                result: res,
            };
        } catch (err)
        {
            console.error(err);
            return ctx.app.emit('error', "查询数据失败", ctx);
        }
    }

}

module.exports = new StatController