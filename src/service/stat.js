const Stat = require('../model/stat');

class StatService
{
    async addData(data)
    {
        console.log("添加或更新统计数据:" + JSON.stringify(data));
        const date = await Stat.findOne({ where: { date: data.date } });
        console.log("date:" + JSON.stringify(date));
        if (date == null)
        {
            const res = await Stat.create(data);
            return res.dataValues;
        }
        else
        {
            const { date, ...params } = data;
            const res = await Stat.update(data, { where: { date } });
            return res[0] == 1 ? "更新成功" : "更新失败";
        }
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
