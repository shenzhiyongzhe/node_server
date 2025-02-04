const Router = require('koa-router');
const { create, query, getListCount } = require("../controller/devOps.controller")

const router = new Router({ prefix: '/devOps' });


router.get('/insList', query);
router.get("/getListCount", getListCount)
router.post('/insList', create)

module.exports = router;