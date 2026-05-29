import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// CORS
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            process.env.DOMAIN,
        ],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(express.json());

// NODEMAILER TRANSPORTER
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// SEND EMAIL ROUTE
app.post("/send-email", async (req, res) => {
    const { name, email, contact, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission",

            html: `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Contact:</strong> ${contact}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
        });

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Email failed",
        });
    }
});

// SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import nodemailer from "nodemailer";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(
//     cors({
//         origin: [
//             "http://localhost:5173",
//             `${process.env.DOMAIN}`,
//         ],
//         methods: ["GET", "POST"],
//         credentials: true,
//     })

// );
// app.use(express.json());

// // NODEMAILER TRANSPORTER
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // SEND EMAIL ROUTE
// app.post("/send-email", async (req, res) => {
//     const { name, email, contact, message } = req.body;

//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             subject: "New Contact Form Submission",

//             html: `
//         <h2>New Contact Request</h2>

//         <p><strong>Name:</strong> ${name}</p>

//         <p><strong>Email:</strong> ${email}</p>

//         <p><strong>Contact:</strong> ${contact}</p>

//         <p><strong>Message:</strong></p>

//         <p>${message}</p>
//       `,
//         });

//         res.status(200).json({
//             success: true,
//             message: "Email sent successfully",
//         });
//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             success: false,
//             message: "Email failed",
//         });
//     }
// });

// // SERVER
// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });