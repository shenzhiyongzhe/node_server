const Router = require('koa-router');

const { create, queryData } = require("../controller/users");

const router = new Router({ prefix: '/users' });

// 添加数据接口
router.post('/', create)
router.get('/', queryData);
module.exports = router;
