const DevOps = require('../model/devOps');
const { getDate } = require("../utils")
const moment = require('moment-timezone');

class DevOpsService
{

    async findOrCreate(params)
    {
        const { project, insList, action } = params;
        const res = await DevOps.findOne({ where: { project } })
        const parseList = JSON.parse(insList)
        let updatedList = []
        if (!res)
        {
            await DevOps.create({ project, insList })
        }
        else
        {
            const updated_at = moment(res.dataValues.updated_at).tz('Asia/Shanghai').format().toString().slice(0, 10)

            const dataList = JSON.parse(res.dataValues?.insList)
            if (action == "add")
            {
                if (updated_at == getDate())
                {
                    console.log("追加数据");
                    if (dataList)
                    {
                        updatedList = [...dataList, ...parseList]
                    }
                    updatedList = [...new Set(updatedList)]
                }
                else
                {
                    console.log("覆盖数据");
                    updatedList = parseList;
                }
            }
            else if (action == "delete")
            {
                console.log("删除数据");
                updatedList = dataList.filter(item => !parseList.includes(item))
            }
            else if (action == "clear")
            {
                console.log("清空实例数据");
                updatedList = []
            }

            await DevOps.update({ insList: JSON.stringify(updatedList) }, { where: { project } })
        }
        return updatedList;

    }

    async findAll(project)
    {
        const res = await DevOps.findOne({ where: { project } })
        if (!res)
        {
            return []
        }
        if (!res.dataValues)
        {
            return []
        }
        if (!res.dataValues.insList)
        {
            return []
        }
        const insList = JSON.parse(res.dataValues.insList)
        return insList;
    }
    async getListCount()
    {
        const obj = {
            "lordnine": 0,
            "nightcrow": 0,
            "nightcrowGlobal": 0,
        }
        for (let key in obj)
        {
            const res = await DevOps.findOne({ where: { project: key } })
            const dataValues = res?.dataValues
            if (dataValues)
            {
                const insListStr = dataValues.insList
                if (insListStr != null && insListStr != [])
                {
                    obj[key] = JSON.parse(insListStr).length
                }
            }

        }
        return obj
    }
}

module.exports = new DevOpsService();
