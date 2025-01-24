const Router = require('koa-router');

const { create, query } = require("../controller/instance.controller");

const router = new Router({ prefix: '/instance' });

// 添加数据接口
router.post('/create', create)
router.post('/query', query);
module.exports = router;