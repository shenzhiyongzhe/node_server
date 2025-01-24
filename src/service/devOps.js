const DevOps = require('../model/devOps');
const { getDate } = require("../utils")
const moment = require('moment-timezone');

class DevOpsService
{

    async findOrCreate(params)
    {
        const { project, insList, action } = params;
        const res = await DevOps.findOne({ where: { project } })
        let updatedList = ''
        if (!res)
        {
            updatedList = insList.toString()
            await DevOps.create({ project, insList: updatedList })
        }
        else
        {
            const updated_at = moment(res.dataValues.updated_at).tz('Asia/Shanghai').format().toString().slice(0, 10)
            const dataList = res.dataValues.insList?.split(',')
            if (action == "add")
            {
                if (updated_at == getDate())
                {
                    console.log("追加数据");
                    updatedList = [...dataList, ...insList]
                    updatedList = [...new Set(updatedList)]
                }
                else
                {
                    console.log("覆盖数据");
                    updatedList = insList;
                }
            }
            else if (action == "delete")
            {
                console.log("删除数据");
                updatedList = dataList.filter(item => !insList.includes(item))
            }

            await DevOps.update({ insList: updatedList.toString() }, { where: { project } })
        }
        return updatedList;

    }

    async findAll(project)
    {
        const res = await DevOps.findOne({ where: { project } })
        return res;
    }
}

module.exports = new DevOpsService();
