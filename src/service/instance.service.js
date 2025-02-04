const { Op } = require('sequelize');
const Instance = require("../model/instance.model")

class InstanceService
{
    async findOrCreate(list)
    {
        return await Instance.bulkCreate(list, { updateOnDuplicate: ['ins'] });
    }

    async findAll(params)
    {
        const { field, list } = params;
        return await Instance.findAll({ where: { [field]: { [Op.in]: list } } })
    }
}
module.exports = new InstanceService()