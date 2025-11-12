import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

    const auth = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.userEMAIL,
            pass: process.env.userPASS
        }
    })

    export const welcomeMail =async (emailofUser)  => {
        const mailThis = {
            from: process.env.userEMAIL,
            to: emailofUser,
            subject: "Welcome to task-manager-app ",
            html :`
            <h2>Hello Sir,</h2>
            <p>Welcome to <strong>Task Manager App</strong>!</p>
            <p>Your account has been successfully created. Start managing your tasks today 🚀</p>
            <br>
            <p>Best Regards,<br>Task Manager Team</p>
            `
        };
        await auth.sendMail(mailThis) 
    };

    export const deleteMail =async (emailofUser)  => {
        const mailThis = {
            from: process.env.userEMAIL,
            to: emailofUser,
            subject: "Sad to see you go from task-manager-app ",
            html :`
            <h2>Hello Sir,</h2>
            <p>We are very sad to see you leave <strong>Task Manager App</strong>!</p>
            <p>Your account has been successfully deleted.</p>
            <br>
            <p>Best Regards,<br>Task Manager Team</p>
            `
        };
        await auth.deleteMail(mailThis) 
    };
