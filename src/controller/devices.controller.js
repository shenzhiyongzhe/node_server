const path = require('path');

const {
    fileUploadError,
    unSupportedFileType,
    publishGoodsError,
    invalidGoodsID,
} = require('../constant/err.type');

const {
    createGoods,
    updateGoods,
    removeGoods,
    restoreGoods,
    findDevices,
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
            const res = await createGoods(ctx.request.body);
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

    async update(ctx)
    {
        try
        {
            const res = await updateGoods(ctx.params.vm, ctx.request.body);
            if (res)
            {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: '',
                };
            } else
            {
                return ctx.app.emit('error', invalidGoodsID, ctx);
            }
        } catch (err)
        {
            console.error(err);
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
        // 1. 解析pageNum和pageSize
        const { pageNum = 1, pageSize = 500 } = ctx.request.query;
        // 2. 调用数据处理的相关方法
        const res = await findDevices(pageNum, pageSize);
        // 3. 返回结果
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
            console.log("设备搜索参数：:" + JSON.stringify(ctx.request.query));
            const res = await searchDevice(ctx.request.query.vm);

            ctx.body = {
                code: 0,
                message: '搜索数据成功',
                result: res,
            };
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
            console.log(res)
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
            console.log("排序参数：" + ctx.request.query.sortByArr)
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
            // console.log(typeof ctx.request.query.fields);
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
