import dotenv from "dotenv"
import cors from "cors"
import { connect } from "mongoose";
import express from "express"
import passport from "./middlewares/passport.middleware.js";
import session from "express-session";
import cookieParser from 'cookie-parser';

dotenv.config({ path: "./env" })

const app = express()

// To handle middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"));
app.use(cookieParser())

// Express session middleware (required by Passport.js)
app.use(session({
    secret: 'your-secret-key', // Change this to a secure key
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport.js and session
app.use(passport.initialize());
app.use(passport.session());

// Database connection
(async () => {
    try {
        const con = await connect(`${process.env.MONGO_URL}/mera-dukaan`)
        console.log("Database connected on: ", con.connection.host);

        app.listen(8080, () => {
            console.log("Listening to app on port 8080 :)");
        });
    } catch (error) {
        console.log("Database connection error: ", error);
        process.exit(1)
    }
})()

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Routes
import customerRouter from "./routes/costumer.route.js"

app.use("/api/customer", customerRouter)