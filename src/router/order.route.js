const Router = require('koa-router');

const { create, findAll } = require("../controller/order.controller");

const router = new Router({ prefix: '/order' });

// 添加数据接口
router.post('/create', create)
router.post('/findAll', findAll);

module.exports = router;