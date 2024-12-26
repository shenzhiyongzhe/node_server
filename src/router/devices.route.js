const Router = require('koa-router');


const {
    upload,
    create,
    update,
    remove,
    restore,
    findAll,
    search,
    orderByDevices,
    collectTodaysStat,
} = require('../controller/devices.controller');

const router = new Router({ prefix: '/devices' });

// 商品图片上传接口
router.post('/upload', upload);

// 添加数据接口
router.post('/', create);

// 修改数据接口
router.put('/:vm', update);

// 硬删除接口
// router.delete('/:id', auth, hadAdminPermission, remove)

router.post('/:vm/off', remove);
router.post('/:vm/on', restore);

// 获取商品列表
router.get('/', findAll);
router.get('/search', search);
router.get('/sortBy', orderByDevices);
router.get('/collectTodaysStat', collectTodaysStat)
module.exports = router;
