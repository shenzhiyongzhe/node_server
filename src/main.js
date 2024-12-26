const schedule = require('node-schedule');

const { APP_PORT } = require('./config/config.default')

const app = require('./app')

const { collectTodaysData } = require('./service/devices.service');


app.listen(APP_PORT, () =>
{
    console.log(`server is running on http://localhost:${APP_PORT}`)
})

const rule = new schedule.RecurrenceRule();
rule.hour = 23; // 每天的第8小时执行
rule.minute = 45; // 每天的第0分钟执行
rule.second = 0;

const job = schedule.scheduleJob(rule, () =>
{
    console.log('每天23：45执行一次的定时任务');
    collectTodaysData()
});