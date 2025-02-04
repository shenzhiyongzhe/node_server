const Router = require('koa-router');


const {
    upload,
    create,
    remove,
    restore,
    findAll,
    search,
    orderByDevices,
    collectTodaysStat,
    exportAllDevices,
} = require('../controller/devices.controller');

const router = new Router({ prefix: '/devices' });

// 商品图片上传接口
router.post('/upload', upload);

// 添加数据接口
router.post('/', create);


// 硬删除接口
// router.delete('/:id', auth, hadAdminPermission, remove)

router.post('/:vm/off', remove);
router.post('/:vm/on', restore);

// 获取商品列表
router.get('/', findAll);
router.get('/search', search);
router.get('/sortBy', orderByDevices);
router.get('/collectTodaysStat', collectTodaysStat)
router.get('/exportDevicesList', exportAllDevices)
module.exports = router;
