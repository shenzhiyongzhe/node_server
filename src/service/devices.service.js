const { Op } = require('sequelize');
const Devices = require('../model/devices');
const { createOrUpdateStat, findData, } = require("../service/stat")

class DevicesService
{
    async findOrCreate(vmInfo)
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
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Devices.findAndCountAll({
            offset: offset,
            limit: pageSize * 1,
            attributes: { exclude: ['historyDealRecord'] }

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
        const logGrowthFunction = (created_at) =>
        {
            const currentDate = new Date();

            // 将目标日期转换为 Date 对象
            const targetDate = new Date(created_at)

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
            const total_vm_number = await Devices.count({ where: { banTimes: { [Op.eq]: 0 } } })

            const total_stock = await Devices.sum('diamond', { where: { banTimes: { [Op.eq]: 0 } } })

            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

            const date = new Date()
            const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`
            const time = `${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`

            const yesterday = new Date(date);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = `${yesterday.getFullYear()}-${(yesterday.getMonth() + 1).toString().padStart(2, 0)}-${yesterday.getDate().toString().padStart(2, 0)}`

            let daily_produce = 0;

            const todayRecordList = [];
            const tradedVMList = [];
            const createdCharacterTimeList = []

            let historyDealRecordJsonList = await Devices.findAll({
                attributes: ["vm", "historyDealRecord", "config"],
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
                        const config = JSON.parse(list.config)
                        if (config.createCharacterTime)
                        {
                            createdCharacterTimeList.push([list.vm, config.createCharacterTime])
                        }
                    }
                }
            })

            const filterTradedVMList = [...new Set(tradedVMList)]
            const traded_vm_number = filterTradedVMList.length;
            const filterCreatedCharacterList = []

            for (let i = 0; i < filterTradedVMList.length; i++)
            {
                for (let j = 0; j < createdCharacterTimeList.length; j++)
                {
                    if (filterTradedVMList[i] == createdCharacterTimeList[j][0])
                    {
                        filterCreatedCharacterList.push(createdCharacterTimeList[j][1])
                        break;
                    }
                }
            }
            todayRecordList.map(item =>
            {
                daily_produce += item[0]
            })

            let account_value = 0

            filterCreatedCharacterList.map(item =>
            {
                account_value += Math.floor(logGrowthFunction(item))
            })
            let yesterdayStat = await findData({ date: yesterdayStr })
            yesterdayStat = yesterdayStat.dataValues;

            daily_produce = Math.floor(daily_produce * 0.03);
            const total_produce = daily_produce + yesterdayStat.total_produce;
            const fixedCost = Math.floor(traded_vm_number * 1.17)
            const net_income = daily_produce - fixedCost
            console.log("统计日期为: ", today + " " + time)
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
            const res = await createOrUpdateStat(todayStat)
            return res

        } catch (error)
        {
            console.error('Error:', error);
        }
    }
    async orderDevice(arr)
    {
        const res = await Devices.findAll({
            order: [...arr],
            limit: 500,
            attributes: { exclude: ['historyDealRecord'] }
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
