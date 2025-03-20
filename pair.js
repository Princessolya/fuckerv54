const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
let router = express.Router();
const pino = require("pino");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  delay,
  makeCacheableSignalKeyStore,
  Browsers,
  jidNormalizedUser,
} = require("@whiskeysockets/baileys");
const { upload } = require("./mega");

function removeFile(FilePath) {
  if (!fs.existsSync(FilePath)) return false;
  fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get("/", async (req, res) => {
  let num = req.query.number;
  async function wolfmarePair() {
    const { state, saveCreds } = await useMultiFileAuthState(`./session`);
    try {
      let wolfmarePairWeb = makeWASocket({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(
            state.keys,
            pino({ level: "fatal" }).child({ level: "fatal" })
          ),
        },
        printQRInTerminal: false,
        logger: pino({ level: "fatal" }).child({ level: "fatal" }),
        browser: Browsers.macOS("Safari"),
      });

      if (!wolfmarePairWeb.authState.creds.registered) {
        await delay(1500);
        num = num.replace(/[^0-9]/g, "");
        const code = await wolfmarePairWeb.requestPairingCode(num);
        if (!res.headersSent) {
          await res.send({ code });
        }
      }

      wolfmarePairWeb.ev.on("creds.update", saveCreds);
      wolfmarePairWeb.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s;
        if (connection === "open") {
          try {
            await delay(10000);
            const sessionwolfmare = fs.readFileSync("./session/creds.json");

            const auth_path = "./session/";
            const user_jid = jidNormalizedUser(wolfmarePairWeb.user.id);

            function randomMegaId(length = 6, numberLength = 4) {
              const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              let result = "";
              for (let i = 0; i < length; i++) {
                result += characters.charAt(
                  Math.floor(Math.random() * characters.length)
                );
              }
              const number = Math.floor(
                Math.random() * Math.pow(10, numberLength)
              );
              return `${result}${number}`;
            }

            const mega_url = await upload(
              fs.createReadStream(auth_path + "creds.json"),
              `${randomMegaId()}.json`
            );

            const string_session = mega_url.replace(
              "https://mega.nz/file/",
              ""
            );

            const sid = `◆━━❲ Princess Olya 💙✨ ❳━━◆

Wolfmare හි දත්ත පද්ධතිය තුළ ලියාපදිංචි කොට ඔබගේ session හැඳුනුම් අංකය සාර්ථකව නිකුත් කරන ලදී...✅


╭─「 Princess Olya 💙✨ 」─❂
┊◆╭─❴ පද්ධතිය ❵─❂
┊◆┊📂ගබඩාව : meganz
┊◆┊🖇️පරීක්ෂාව : teamwolfmare
┊◆╰───────────❂
┊◆╭─❴ විස්තර ❵─❂
┊◆┊👑 නම : Princess Olya
┊◆┊🌐 කාණ්ඩය : 1.0.1
┊◆┊🛠️ නිර්මාණය : Team Wolf Mare
┊◆╰───────────❂
┊◆╭─❴ යාවත්කාලීනය ❵─❂
┊◆┊📅 අවසන් යාවත්කාලීනය :
┊◆┊ 2025 පෙබරවාරි 17
┊◆╰───────────❂ 
┊◆╭─❴ උඩුගත තොරතුරු ❵─❂
┊◆┊📚 ගබඩාව : Baileys
┊◆┊🎨 පිටපත : Wolf Mare
┊◆┊📡 ධාවනය : Github
┊◆╰───────────❂
╰──────────────❂

ඔබගේ session හැඳුනුම් අංකය නම්,
> ${string_session}
වේ.


ඔබට පද්ධතිය ස්ථාපනය කිරීමෙන් අනතුරුව සම්පූර්ණ විධාන ලැයිස්තුව ලබා ගැනීමට .menu ලෙස පද්ධතිය ස්ථාපනය කළ whatsapp අංකයට යොමු කරන්න.



╭─「 තවත් විධාන💙✨」─❂
┊■╭───────────❂
┊■┊ .Menu
┊■┊ .alive
┊■┊ .ping
┊■╰──────────❂
╰──────────────❂ 



Princess Olya භාවිතා කළ ඔබට
wolfmare අපේ ස්තූතිය.

> ©️All right's reserved 2025 By Team Wolfmare.
            `;
            const mg = `☝️ *මෙලෙස ඉහළින් දැක්වෙන්නේ ඔබගේ session හැඳුනුම් අංකයයි.*

🚫 *Do not share your session id to anyone*
🚫 *මෙම session හැඳුනුම් අංකය භාහිර අයෙකු සමඟ හුවමාරු කරගැනීමෙන් වළකින්න.*

⚒️ *නවතම යාවත්කාලීන සඳහා wolfmare සමඟ සම්භන්ධ වී සිටින්න*

📍 *නිර්මාණය*

╭─「 *Wolfmare*」─❂
┊📍╭───────────❂
┊📍┊ *Hansaka Franando*
┊📍┊ *Malindu Heshan*
┊📍┊ *Hasindu Lalanka*
┊📍╰──────────❂
╰──────────────❂ 

⛔ *වැදගත් දැන්වීම.*

* *නව යාවත්කාලීන සඳහා ඔබ අපගේ wolfmare කණ්ඩායමේ සහය සමූහය හා සම්භන්ධ වීම අනිවාර්යය වේ.*
* *එම සමූහයට පහත සබැඳිය ඔස්සේ සම්භන්ධ විය හැක.*
* https://chat.whatsapp.com/BagwKoTMIffFpa8KjpCmEn

❌ *ඔබ මෙම සමූහය හා සම්භන්ධ නොවුණහොත් පද්ධතිය ස්ථාපනය කිරීමෙන් අනතුරුව ස්වයංක්‍රීයවම එම සමූහයට ඇතුළත් වනු ඇත.*


> All rights reserved by 2025 wolfmare.`;
            const dt = await wolfmarePairWeb.sendMessage(user_jid, {
              image: {
                url: "https://raw.githubusercontent.com/Princessolya/fuck-db/refs/heads/main/Session%20success.jpg",
              },
              caption: sid,
            });
            const msg = await wolfmarePairWeb.sendMessage(user_jid, {
              text: string_session,
            });
            const msg1 = await wolfmarePairWeb.sendMessage(user_jid, { text: mg });
          } catch (e) {
            exec("pm2 restart wolfmare");
          }

          await delay(100);
          return await removeFile("./session");
          process.exit(0);
        } else if (
          connection === "close" &&
          lastDisconnect &&
          lastDisconnect.error &&
          lastDisconnect.error.output.statusCode !== 401
        ) {
          await delay(10000);
          wolfmarePair();
        }
      });
    } catch (err) {
      exec("pm2 restart wolfmare-md");
      console.log("service restarted");
      wolfmarePair();
      await removeFile("./session");
      if (!res.headersSent) {
        await res.send({ code: "Service Unavailable" });
      }
    }
  }
  return await wolfmarePair();
});

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
  exec("pm2 restart wolfmare");
});

module.exports = router;
