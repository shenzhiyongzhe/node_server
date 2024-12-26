const Router = require('koa-router');

const { create, queryData } = require("../controller/stat")

const router = new Router({ prefix: '/stat' });

// 添加数据接口
router.post('/', create);
router.get('/', queryData);
module.exports = router;
