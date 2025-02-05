const Stat = require('../model/stat');

class StatService
{
    async createOrUpdateStat(statData)
    {
        const { date, ...detail } = statData;
        const [stats, created] = await Stat.findOrCreate({ where: { date }, defaults: statData });
        if (!created)
        {
            await Stat.update(detail, { where: { date } });
        }
        return stats;
    }

    async findAllStat(pageNum, pageSize)
    {
        // const offset = (pageNum - 1) * pageSize;
        const res = await Stat.findAll({
            // offset: offset,
            limit: pageSize * 1,
            order: [["date", 'DESC']]
        });
        return res
    }
    async findTheDateStat(date)
    {
        return await Stat.findByPk(date)
    }

    async getTotalPageCount()
    {
        return await Stat.count()
    }
}

module.exports = new StatService();
