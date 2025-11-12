import dotenv from 'dotenv'
dotenv.config
import nodemailer from 'nodemailer'
import http from 'http'

const server = http.createServer((req,res)=>{
    const auth = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.userEMAIL,
            pass: process.env.userPASS
        }
    })
    const reciver = {
        from: process.env.userEMAIL,
        to: process.env.senderEMAIL,
        subject: "Hello ✔",
        text: "Hello world?"
    }

    auth.sendMail(reciver,(error,emailResponse)=>{
        if(error) throw error;
        console.log('sucess');
        res.end()
    })

});

server.listen(8000)
 