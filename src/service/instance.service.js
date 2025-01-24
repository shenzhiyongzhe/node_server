const { Op } = require('sequelize');
const Instance = require("../model/instance.model")

class InstanceService
{
    async findOrCreate(list)
    {
        return await Instance.bulkCreate(list, { updateOnDuplicate: ['ins'] });
    }

    async findAll(ids)
    {
        return await Instance.findAll({ where: { id: { [Op.in]: ids } } })
    }
}
module.exports = new InstanceService()