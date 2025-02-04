const { findOrCreate, findAll, getListCount } = require("../service/devOps")

class DevOpsController
{
    async create(ctx)
    {
        try
        {
            const { project, insList, action } = ctx.request.body;
            if (!project || !insList || !action)
            {
                ctx.body = { code: 1, message: "参数不全" };
                return;
            }
            const res = await findOrCreate(ctx.request.body);
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
    async query(ctx)
    {
        try
        {
            const { project } = ctx.request.query
            const res = await findAll(project);
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
    async getListCount(ctx)
    {
        try
        {
            const res = await getListCount();
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

module.exports = new DevOpsController