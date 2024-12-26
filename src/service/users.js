const Users = require('../model/users');

class UsersService
{
    async addData(params)
    {
        console.log("params:" + JSON.stringify(params));
        const res = await Users.findOne({ where: { account: params.account } });
        console.log("res:" + JSON.stringify(res))
        if (res == null)
        {
            const res = await Users.create(params);
            return res.dataValues;
        }
        else
        {
            const { account, ...param } = params;
            const res = await Users.update(param, { where: { account } });
            return res[0] == 1 ? "更新成功" : "更新失败";
        }
    }
    async findData(params)
    {
        const res = await Users.findOne({ where: { account: params.account } })
        return res;
    }
}

module.exports = new UsersService()