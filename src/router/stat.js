const Router = require('koa-router');

const { create, findAll, getTotalPageCount } = require("../controller/stat")

const router = new Router({ prefix: '/stat' });

// 添加数据接口
router.post('/', create);
router.get('/', findAll);
router.get('/getTotalPageCount', getTotalPageCount);
module.exports = router;
