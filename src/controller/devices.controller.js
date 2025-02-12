const path = require('path');

const {
    fileUploadError,
    unSupportedFileType,
    publishGoodsError,
    invalidGoodsID,
} = require('../constant/err.type');

const {
    findOrCreate,
    removeGoods,
    restoreGoods,
    findAllDevices,
    searchDevice,
    collectTodaysData,
    orderDevice,
    exportDeviceList,
} = require('../service/devices.service');

class DevicesController
{
    async upload(ctx, next)
    {
        // console.log(ctx.request.files)
        const { file } = ctx.request.files;
        // console.log(file)
        const fileTypes = ['image/jpeg', 'image/png'];
        if (file)
        {
            if (!fileTypes.includes(file.type))
            {
                return ctx.app.emit('error', unSupportedFileType, ctx);
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.path),
                },
            };
        } else
        {
            return ctx.app.emit('error', fileUploadError, ctx);
        }
    }
    async create(ctx)
    {
        try
        {
            const res = await findOrCreate(ctx.request.body);
            ctx.body = {
                code: 0,
                message: '更新device数据成功',
                result: res,
            };
        } catch (err)
        {
            console.error(err);
            return ctx.app.emit('error', publishGoodsError, ctx);
        }
    }

    async remove(ctx)
    {
        const res = await removeGoods(ctx.params.vm);
        console.log(JSON.stringify(ctx.params));
        if (res)
        {
            ctx.body = {
                code: 0,
                message: '软删除数据devices成功',
                result: '',
            };
        } else
        {
            return ctx.app.emit('error', invalidGoodsID, ctx);
        }
    }
    async restore(ctx)
    {
        const res = await restoreGoods(ctx.params.id);
        if (res)
        {
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result: '',
            };
        } else
        {
            return ctx.app.emit('error', invalidGoodsID, ctx);
        }
    }
    async findAll(ctx)
    {
        const res = await findAllDevices(ctx.request.body);
        ctx.body = {
            code: 0,
            message: '获取设备列表成功',
            result: res,
        };
    }

    async search(ctx)
    {
        try
        {
            const { list } = ctx.request.body;
            if (list)
            {
                const res = await searchDevice(list);
                ctx.body = {
                    code: 0,
                    message: '搜索数据成功',
                    result: res,
                };
            }
            else
            {
                ctx.body = {
                    code: 1,
                    message: '参数错误',
                    result: null,
                };
            }

        } catch (err)
        {
            console.error(err);
            return ctx.app.emit('error', publishGoodsError, ctx);
        }
    }

    async collectTodaysStat(ctx)
    {
        try
        {
            const res = await collectTodaysData()
            ctx.body = {
                code: 0,
                message: '搜索数据成功',
                result: res,
            };
        } catch (error)
        {
            console.error(error);
        }
    }
    async orderByDevices(ctx)
    {
        try
        {
            const sortArr = JSON.parse(ctx.request.query.sortByArr)
            const res = await orderDevice(sortArr)
            ctx.body = {
                code: 0,
                message: '排序数据成功',
                result: res,
            };
        } catch (error)
        {
            console.error(error);
        }
    }
    async exportAllDevices(ctx)
    {
        try
        {
            const fields = JSON.parse(ctx.request.query.fields)
            console.log('请求的字段有：' + ctx.request.query.fields);
            const res = await exportDeviceList(fields)
            ctx.body = {
                code: 0,
                message: "获取所有设备信息成功。",
                result: res
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }
}

module.exports = new DevicesController();
