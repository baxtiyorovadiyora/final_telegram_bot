import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onStart from "./handrers/onStart.js";
import onCourses from "./handrers/onCourses.js";

config();

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });


const users = {};

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;


    if (users[chatId]?.step === "name") {
        users[chatId].name = text;
        users[chatId].step = "phone";

        return bot.sendMessage(chatId, "📞 Telefon raqamingizni yuboring:", {
            reply_markup: {
                keyboard: [
                    [{ text: "📱 Telefon raqamni yuborish", request_contact: true }]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    }

    if (text === "/start") {
        return onStart(msg);
    }

    if (text === "📚 Kurslar") {
        return onCourses(msg);
    }

    return bot.sendMessage(
        chatId,
        "Iltimos menyudan foydalaning 👇"
    );
});

bot.on("contact", async (msg) => {
    const chatId = msg.chat.id;
    if (!users[chatId]) return;

    users[chatId].phone = msg.contact.phone_number;
    const user = users[chatId];

    await bot.sendMessage(chatId,
        `✅ Ro'yxatdan o'tish yakunlandi!

👤 Ism: ${user.name}
📞 Telefon: ${user.phone}
📚 Kurs: ${user.course}

Tez orada bog‘lanamiz 😊`,
        { reply_markup: { remove_keyboard: true } }
    );

    delete users[chatId];
});

bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const message_id = query.message.message_id;
    const data = query.data;


    if (data === "course_english") {
        await bot.sendMessage(chatId,
            `🇬🇧 Ingliz tili
Ingliz tili — xalqaro til 🌍
O‘qish, ish va internet uchun juda muhim 📚💻`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📝 Ro'yxatdan o'tish", callback_data: "register:Ingliz tili" }]
                    ]
                }
            }
        );
        return bot.deleteMessage(chatId, message_id);
    }

    if (data === "course_russian") {
        await bot.sendMessage(chatId,
            `🇷🇺 Rus tili
Muloqot va ish uchun muhim til 🗣️🌍`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📝 Ro'yxatdan o'tish", callback_data: "register:Rus tili" }]
                    ]
                }
            }
        );
        return bot.deleteMessage(chatId, message_id);
    }

    if (data === "course_math") {
        await bot.sendMessage(chatId,
            `➕ Matematika
Mantiq va hisob-kitob fani 🧠📐`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📝 Ro'yxatdan o'tish", callback_data: "register:Matematika" }]
                    ]
                }
            }
        );
        return bot.deleteMessage(chatId, message_id);
    }

    if (data === "course_programming") {
        await bot.sendMessage(chatId,
            `💻 Dasturlash
Sayt, ilova va o‘yinlar yaratish 🚀`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📝 Ro'yxatdan o'tish", callback_data: "register:Dasturlash" }]
                    ]
                }
            }
        );
        return bot.deleteMessage(chatId, message_id);
    }


    if (data === "course_design") {
        await bot.sendMessage(chatId,
            `🎨 Dizayn
Chiroyli va qulay dizayn yaratish ✨`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📝 Ro'yxatdan o'tish", callback_data: "register:Dizayn" }]
                    ]
                }
            }
        );
        return bot.deleteMessage(chatId, message_id);
    }


    if (data.startsWith("register:")) {
        const course = data.split(":")[1];

        users[chatId] = {
            course,
            step: "name"
        };

        await bot.sendMessage(chatId, "✍️ Ismingizni kiriting:");
        return bot.deleteMessage(chatId, message_id);
    }
});

console.log("🤖 Bot ishga tushdi...");


