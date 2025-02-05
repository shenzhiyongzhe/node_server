const { createOrUpdateStat, findAllStat, getTotalPageCount } = require("../service/stat")

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

    async findAll(ctx)
    {
        try
        {
            const { pageNum = 1, pageSize = 1 } = ctx.request.query;
            console.log("页面索引：" + pageNum, pageSize);
            const res = await findAllStat(pageNum, pageSize);
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

    async getTotalPageCount(ctx)
    {
        try
        {
            const res = await getTotalPageCount()
            const pageSize = 30;
            const pageNos = Math.ceil(res / pageSize)
            ctx.body = {
                code: 0,
                message: '查询页面总数量成功',
                result: { pageSize, pageNos },
            };
        } catch (error)
        {
            console.log(error);
            return ctx.app.emit('error', "查询数据失败", ctx);

        }
    }
}

module.exports = new StatController