const { exec } = require("child_process");
const { upload } = require('./mega');
const express = require('express');
let router = express.Router()
const pino = require("pino");

let { toBuffer } = require("qrcode");

const path = require('path');

const fs = require("fs-extra");

const { Boom } = require("@hapi/boom");

const MESSAGE = process.env.MESSAGE ||  `◆━━❲ Princess Olya 💙✨ ❳━━◆

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
> ${Scan_Id}
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
`























if (fs.existsSync('./auth_info_baileys')) {

    fs.emptyDirSync(__dirname + '/auth_info_baileys');

  };

  

  router.get('/', async (req, res) =>  {



  const { default: SuhailWASocket, useMultiFileAuthState, Browsers, delay,DisconnectReason, makeInMemoryStore, } = require("@whiskeysockets/baileys");

  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

  async function SUHAIL() {

    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')

    try {

      let Smd =SuhailWASocket({ 

        printQRInTerminal: false,

        logger: pino({ level: "silent" }), 

        browser: Browsers.macOS("Desktop"),

        auth: state 

        });





      Smd.ev.on("connection.update", async (s) => {

        const { connection, lastDisconnect, qr } = s;

        if (qr) {

                    // Ensure the response is only sent once

                    if (!res.headersSent) {

                        res.setHeader('Content-Type', 'image/png');

                        try {

                            const qrBuffer = (await toBuffer(qr));  // Convert QR to buffer

                            res.end(qrBuffer);  // Send the buffer as the response

                            return; // Exit the function to avoid sending further responses

                        } catch (error) {

                            console.error("Error generating QR Code buffer:", error);

                            

                            return; // Exit after sending the error response

                        }

                    }

        }





        if (connection == "open"){

          await delay(3000);

          let user = Smd.user.id;





//===========================================================================================

//===============================  SESSION ID    ===========================================

//===========================================================================================



          function randomMegaId(length = 6, numberLength = 4) {

                      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                      let result = '';

                      for (let i = 0; i < length; i++) {

                      result += characters.charAt(Math.floor(Math.random() * characters.length));

                        }

                       const number = Math.floor(Math.random() * Math.pow(10, numberLength));

                        return `${result}${number}`;

                        }



                        const auth_path = './auth_info_baileys/';

                        const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${randomMegaId()}.json`);



                        const string_session = mega_url.replace('https://mega.nz/file/', '');



                        const Scan_Id = string_session;

          console.log(`> ${Scan_Id}
☝️ *මෙලෙස ඉහළින් දැක්වෙන්නේ ඔබගේ session හැඳුනුම් අංකයයි.*

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


> All rights reserved by 2025 wolfmare.
`)





          let msgsss = await Smd.sendMessage(user, { text:  Scan_Id });

          await Smd.sendMessage(user, { text: MESSAGE } , { quoted : msgsss });

          await delay(1000);

          try{ await fs.emptyDirSync(__dirname+'/auth_info_baileys'); }catch(e){}





        }



        Smd.ev.on('creds.update', saveCreds)



        if (connection === "close") {            

            let reason = new Boom(lastDisconnect?.error)?.output.statusCode

            // console.log("Reason : ",DisconnectReason[reason])

            if (reason === DisconnectReason.connectionClosed) {

              console.log("Connection closed!")

             // SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.connectionLost) {

                console.log("Connection Lost from Server!")

            //  SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.restartRequired) {

                console.log("Restart Required, Restarting...")

              SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.timedOut) {

                console.log("Connection TimedOut!")

             // SUHAIL().catch(err => console.log(err));

            }  else {

                console.log('Connection closed with bot. Please run again.');

                console.log(reason)

              await delay(5000);

              exec('pm2 restart qasim');

              process.exit(0)

            }

          }







      });

    } catch (err) {

        console.log(err);

        exec('pm2 restart qasim');

       await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 

       

    }

  }

  SUHAIL().catch(async(err) => {

    console.log(err)

    await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 

    exec('pm2 restart qasim');





    //// MADE WITH 



});

return await SUHAIL()



  });

module.exports = router
