const { addData, findData, } = require("../service/stat")

class StatController
{
    async create(ctx)
    {
        try
        {
            console.log("create" + JSON.stringify(ctx.request.body));
            const res = await addData(ctx.request.body);

            ctx.body = {
                code: 0,
                message: '添加或更新数据成功',
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
            console.log("请求统计数据参数： " + JSON.stringify(ctx.request.query));
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