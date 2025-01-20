const Router = require('koa-router');
const router = new Router({ prefix: '/devOps' });

let today = new Date().getDate()
let devOpsObj = {
    "LordNine": [],
    "NightCrow": [],
    "NightCrowGlobal": []
}

const getInsList = (ctx) =>
{
    try
    {
        const obj = {}
        const { project } = ctx.request.query
        if (!project)
        {
            ctx.body = {
                code: 1,
                message: '参数错误',
                result: null,
            };
        }

        obj.project = project
        obj.insList = devOpsObj[project];
        console.log(project);
        ctx.body = {
            code: 0,
            message: '获取运维实例列表成功',
            result: obj,
        };
    } catch (error)
    {
        console.log(error);
    }

}
const updateInsList = (ctx) =>
{
    try
    {
        const { project, insList } = ctx.request.body;
        if (!project || !insList)
        {
            ctx.body = {
                code: 1,
                message: '参数错误',
                result: null,
            };
        }
        if (new Date().getDate() != today)
        {
            console.log('覆盖昨天数据');
            devOpsObj[project] = insList
            today = new Date().getDate()
        }
        else if (new Date().getDate() == today)
        {
            console.log("追加今天的数据");
            devOpsObj[project] = [...devOpsObj[project], ...insList]
            devOpsObj[project] = [...new Set(devOpsObj[project])]
        }

        ctx.body = {
            code: 0,
            message: '更新运维实例列表成功',
            result: devOpsObj,
        };
    }
    catch (error)
    {
        console.log(error);
    }
    console.log("更新运维实例列表成功");
}
router.get('/insList', getInsList);
router.post('/insList', updateInsList)

module.exports = router;