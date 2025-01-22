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

    async findData(params)
    {
        if (Object.keys(params).length == 0)
        {
            const { count, rows } = await Stat.findAndCountAll();
            return {
                total: count,
                list: rows,
            };
        }
        else
        {
            const res = await Stat.findOne({ where: { ...params } })
            return res;
        }

    }
}

module.exports = new StatService();
