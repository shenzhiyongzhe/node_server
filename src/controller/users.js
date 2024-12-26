const { addData, findData } = require("../service/users")

class UsersController
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
            console.log("用户请求参数 " + JSON.stringify(ctx.request.query));
            if (!ctx.request.query.account)
            {
                ctx.body = {
                    code: -1,
                    message: '请求参数错误'
                }
            }
            else
            {
                const res = await findData(ctx.request.query);
                ctx.body = {
                    code: 0,
                    message: '查询数据成功',
                    result: res,
                };
            }

        } catch (err)
        {
            console.error(err);
            return ctx.app.emit('error', "查询数据失败", ctx);
        }
    }
}

module.exports = new UsersController()