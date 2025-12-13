import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onStart from "./handrers/onStart.js";
import onCourses from "./handrers/onCourses.js";

config();

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })


bot.on("message", async (msg) => {
    console.log(11111);

    const chatId = msg.chat.id;
    const firstname = msg.chat.first_name;
    const text = msg.text;

    if (text == "/start") {
        return onStart(msg)
    }

    if (text == "📚 Kurslar") {
        console.log(1);
        return onCourses(msg)
    }

    return bot.sendMessage(chatId, `Botda kutilmagan xatolik, iltimos /start bosing... ❗`);
})

bot.on("callback_query", async (query) => {
    console.log(query);
    const query_id = query.id
    const msg = query.message
    const chatId = msg.chat.id
    const message_id = msg.message_id

    const data = query.data


    if (data == "course_english") {
        bot.sendMessage(chatId, `engilsh kursi tanlandi...`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `Ro'yhatdan o'tish`, callback_data: "register:engilsh" }]
                ]
            }
        })
        bot.deleteMessage(chatId, message_id)
        return

    }

    if (data == "course_russian") {
        bot.sendMessage(chatId, `Rus tili kursi tanlandi...`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `Ro'yhatdan o'tish`, callback_data: "register:russian" }]
                ]
            }
        })

        bot.deleteMessage(chatId, message_id)
        return
    }


});

console.log(`Bot ishga tushdi....`);