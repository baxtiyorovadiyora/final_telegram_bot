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
        bot.sendMessage(chatId, `engilsh kursi tanlandi...
             Ingliz tili — dunyoda eng ko‘p ishlatiladigan xalqaro til 🌍🇬🇧
Uni bilish o‘qish, ish va internet imkoniyatlarini kengaytiradi 📚💻✨`, {
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
        bot.sendMessage(chatId, `Rus tili kursi tanlandi...
            Rus tili — ko‘plab davlatlarda ishlatiladigan muhim til 🇷🇺🌍
Uni bilish o‘qish, ish va muloqotda katta foyda beradi 📚🗣️✨ `, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `Ro'yhatdan o'tish`, callback_data: "register:russian" }]
                ]
            }
        })

        bot.deleteMessage(chatId, message_id)
        return
    }

    if (data == "course_math") {
        bot.sendMessage(chatId, `Matimatika kursi tanlandi...
            Matematika — mantiq va hisob-kitob fani ➕➗📐
U fikrlashni rivojlantirib, hayotda va o‘qishda juda kerak bo‘ladi 📚🧠✨ `, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `Ro'yhatdan o'tish`, callback_data: "register:Matematika" }]
                ]
            }
        })

        bot.deleteMessage(chatId, message_id)
        return
    }

        if (data == "course_programming") {
        bot.sendMessage(chatId, `Dasturlash kursi tanlandi...
                Dasturlash — kompyuterga buyruq berish san’ati 💻⌨️
U orqali saytlar, ilovalar va o‘yinlar yaratiladi 🚀📱🎮 `, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `Ro'yhatdan o'tish`, callback_data: "register:Dastursh" }]
                ]
            }
        })

        bot.deleteMessage(chatId, message_id)
        return
    }



             if (data == "course_design") {
        bot.sendMessage(chatId, `Dizayn kursi tanlandi...
                       Dizayn — chiroyli va qulay ko‘rinish yaratish san’ati 🎨✨
U saytlar, ilovalar va reklamalarda muhim rol o‘ynaydi 💻📱🌟   `, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `Ro'yhatdan o'tish`, callback_data: "register:Diayn" }]
                ]
            }
        })

        bot.deleteMessage(chatId, message_id)
        return
    }


});

console.log(`Bot ishga tushdi....`);