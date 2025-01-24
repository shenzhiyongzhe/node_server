const Router = require('koa-router');
const { create, query } = require("../controller/devOps.controller")

const router = new Router({ prefix: '/devOps' });


router.get('/insList', query);
router.post('/insList', create)

module.exports = router;