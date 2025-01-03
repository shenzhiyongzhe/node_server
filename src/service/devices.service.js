const { Op } = require('sequelize');
const Devices = require('../model/devices');
const { addData, findData, } = require("../service/stat")

class DevicesService
{
    async createGoods(vmInfo)
    {
        const { vm, ...data } = vmInfo;
        const [devices, created] = await Devices.findOrCreate({
            where: { vm },
            defaults: vmInfo
        })

        if (!created)
        {
            await Devices.update(data, { where: { vm } });
        }
        return devices
    }

    async updateGoods(vm, goods)
    {
        const res = await Devices.update(goods, { where: { vm } });

        return res[0] > 0 ? true : false;
    }

    async removeGoods(vm)
    {
        const res = await Devices.destroy({ where: { vm } });

        return res > 0 ? true : false;
    }

    async restoreGoods(vm)
    {
        const res = await Devices.restore({ where: { vm } });
        return res > 0 ? true : false;
    }

    async findDevices(pageNum, pageSize)
    {
        // // 1. 获取总数
        // const count = await Goods.count()
        // // console.log(count)
        // // 2. 获取分页的具体数据
        // const offset = (pageNum - 1) * pageSize
        // const rows = await Goods.findAll({ offset: offset, limit: pageSize * 1 })

        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Devices.findAndCountAll({
            offset: offset,
            limit: pageSize * 1,
        });
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        };
    }
    async searchDevice(vm)
    {
        const res = await Devices.findOne({ where: { vm } });
        return res;
    }
    async collectTodaysData()
    {
        const logGrowthFunction = () =>
        {
            const currentDate = new Date();

            // 将目标日期转换为 Date 对象
            const targetDate = new Date('2024-11-13')

            // 计算两个日期之间的差值（以毫秒为单位）
            const differenceInMilliseconds = currentDate - targetDate;

            // 将毫秒转换为天数
            const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

            if (differenceInDays <= 0)
            {
                throw new Error("x must be greater than 0");
            }
            return 25 * Math.log(differenceInDays) + 40;
        }

        try
        {
            const total_vm_number = await Devices.count()

            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

            const date = new Date()
            const today = date.toJSON().slice(0, 10)
            const yesterday = new Date(date);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toJSON().slice(0, 10)

            const total_stock = await Devices.sum('diamond')

            let daily_produce = 0;

            const todayRecordList = [];
            const tradedVMList = [];

            let historyDealRecordJsonList = await Devices.findAll({
                attributes: ["vm", "historyDealRecord"],
                where: {
                    historyDealRecord: { [Op.ne]: null },
                    updated_at: {
                        [Op.gte]: startOfDay, // 大于等于今天的开始时间
                        [Op.lte]: endOfDay    // 小于等于今天的结束时间
                    }
                }
            })

            historyDealRecordJsonList.map(list =>
            {
                const record = JSON.parse(list.historyDealRecord)
                for (let key in record)
                {
                    if (key.startsWith(today))
                    {
                        todayRecordList.push(record[key])
                        tradedVMList.push(list.vm)
                    }
                }
            })

            const filterTradedVMList = [...new Set(tradedVMList)]
            const traded_vm_number = filterTradedVMList.length;

            todayRecordList.map(item =>
            {
                daily_produce += item[0]
            })

            let yesterdayStat = await findData({ date: yesterdayStr })
            yesterdayStat = yesterdayStat.dataValues;

            daily_produce = Math.floor(daily_produce * 0.03);
            const total_produce = daily_produce + yesterdayStat.total_produce;
            const fixedCost = Math.floor(traded_vm_number * 1.17)
            const net_income = daily_produce - fixedCost
            const account_value = Math.floor(traded_vm_number * logGrowthFunction())

            const todayStat = {
                "date": today,
                "total_value": account_value + total_produce,
                "total_stock": Math.floor(total_stock * 0.03),
                "daily_produce": daily_produce,
                "total_produce": total_produce,
                "net_income": net_income,
                "total_income": yesterdayStat.total_income + net_income,
                "traded_vm_number": traded_vm_number,
                "total_vm_number": total_vm_number,
                "account_value": account_value,
                "fixed_cost": fixedCost,
                "total_cost": yesterdayStat.total_cost + fixedCost,
            };
            addData(todayStat)
            return todayStat

        } catch (error)
        {
            console.error('Error:', error);
        }
    }
    async orderDevice(arr)
    {
        const res = await Devices.findAll({
            order: [...arr],
            limit: 500
        })
        return res;
    }
    async exportDeviceList(fields)
    {
        const res = await Devices.findAll({
            attributes: [...fields]
        })
        return res;
    }
}

module.exports = new DevicesService();
