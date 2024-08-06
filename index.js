import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import ScheduleDay from "./ScheduleDay.js";
import mongoose from 'mongoose';
import router from "./router.js";
import fileUpload from "express-fileupload";
import ScheduleBot from "./ScheduleBot.js";

const PORT = 5000;
const tokenBot = '7469541723:AAFoLvL3mXtRREuUx5Hks9H7EshxZnEq_Nk';
const passwordMongoDB = `L9WjvQvz80s3mjkQ`;
const MONGO_DB_URL = `mongodb+srv://pencil:${passwordMongoDB}@cluster0.rzevdaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const passwordPostgresQL = ``;
const POSTGRESQL_DB_URL = `postgresql://mksenni:tq78MykHQOEY1NyvlVNtT0Bf7mxJUjI8@dpg-cqovtpo8fa8c73c3ncl0-a/schedule_5u9c`;


const bot = new TelegramBot(tokenBot, {polling: true});

const days = {monday: 'Понедельник', tuesday: 'Вторник', wednesday: 'Среда', thursday: 'Четверг', friday: 'Пятница', saturday: 'Суббота'}

const scheduleBot = ScheduleBot;

const gameDb = {};

const startGameRandomNumber = async (chatId) => {
    gameDb[chatId] = String(Math.floor(Math.random() * 10));
    await bot.sendMessage(chatId, `Я загадал число от 0 до 9. Попробуй отгадать!`, scheduleBot.gameOptions);
}

bot.onText(/\/hello (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    // console.log('onText msg', msg);

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    console.log(msg)

    if (data === '/play_again') {

        return startGameRandomNumber(chatId);
    }
    if (data === gameDb[chatId]) {

        return bot.sendMessage(chatId, `Ты угадал цифру ${data}!`, scheduleBot.playAgainOptions);
    } else if (data !== gameDb[chatId]) {
        if (Object.keys(days).includes(data)) {
            return bot.sendMessage(chatId, `Ты выбрал ${data}`);
        }
        return bot.sendMessage(chatId, `Не получилось...я загадал цифру ${gameDb[chatId]}`, scheduleBot.playAgainOptions);
    }

    try {
        const {faculty, course, date, month, week, lessons} = data;
        const scheduleDay = await ScheduleDay.create({faculty, course, date, month, week, lessons});
        return bot.sendMessage(chatId, `Ты внес в расписание ${scheduleDay}!`);
    } catch (e) {
        return bot.sendMessage(chatId, `Ошибка!`);
    }
})

const startBot = async () => {
    await bot.setMyCommands([
        {command: '/start', description: 'Начать беседу'},
        {command: '/schedule', description: 'Получить расписание'},
        {command: '/game', description: 'Давай поиграем'},
        {command: '/setschedule', description: 'Внести расписание'},
    ]);

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        // send a message to the chat acknowledging receipt of their message
        if (text === '/start') {
            await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/a90/399/a9039918-d481-320b-bbae-7b5cc05a520b/9.webp`)
            return bot.sendMessage(chatId, `${msg.chat.first_name}! Где вас носит!`);
        }

        if (text.trim().includes('потерял')) {
            await bot.sendMessage(chatId, `Может быть вас превратить в карту?`);
            return bot.sendMessage(chatId, `Или в настенные часы?`);
        }

        if (text === '/schedule') {
            return bot.sendMessage(chatId, `Какой день недели интересует?`, scheduleBot.scheduleOptions);
        }

        if (text === '/game') {
            return startGameRandomNumber(chatId);
        }
        return bot.sendMessage(chatId, `Я тебя не понимать`);
    });
}

await startBot();

const app = express();
app.use(express.json());
app.use(express.static('static'));
app.use('/api', router);
app.use(fileUpload({}));

app.get('/', (req, res) => {
    // console.log(res.body)
    res.status(200).json('server is work')
})

const startApp = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL);
        app.listen(PORT, () => {
            console.log("SERVER START ON PORT " + PORT)
        });
    } catch (error) {
        console.log(error);
    }

}

await startApp();
