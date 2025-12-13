import { bot } from "../bot.js";
import User from "../../models/User.js";

async function onStart(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  const existingUser = await User.findOne({ chatId: chatId });

  if (existingUser == null) {
    const newUser = new User({
      chatId: chatId,
      firstname: firstname,
      username: msg.chat.username,
    });

    newUser.save();
  }

  console.log(existingUser);

  await bot.sendMessage(
    chatId,
    `
        👋 Assalomu alaykum, ${firstname}!

📚 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma’lumot olasiz  
• Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin  
• Jadval va to‘lovlar haqida ma’lumot olasiz  

Quyidagi menyudan kerakli bo‘limni tanlang 👇

        `,
    {
      reply_markup: {
        keyboard: [
          [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
          [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
          [{ text: "❓ Yordam" }],
        ],
        resize_keyboard: true,
      },
    }
  );
}

export default onStart;