import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt"

import crypto from "crypto"
import { Meeting } from "../models/meeting.model.js";
const login = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please Provide" })
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })
        }


        let isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" })
        }

    } catch (e) {
        return res.status(500).json({ message: `Something went wrong ${e}` })
    }
}


const register = async (req, res) => {
    const { name, username, password } = req.body;


    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" })

    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }

}


const getUserHistory = async (req, res) => {
    const { token } = req.body;
    console.log("📤 Getting history for token:", token);

    try {
        const user = await User.findOne({ token });
        console.log("🧾 Found user:", user);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const meetings = await Meeting.find({ user_id: user.username });
        console.log("✅ Meetings fetched:", meetings);

        res.json(meetings);
    } catch (e) {
        console.error("❌ Error in getUserHistory:", e);
        res.status(500).json({ message: `Something went wrong: ${e}` });
    }
};



const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;
    console.log("📥 Received addToHistory:", { token, meeting_code });

    try {
        const user = await User.findOne({ token });

        if (!user) {
            console.log("❌ User not found for token:", token);
            return res.status(401).json({ message: "Invalid or missing token" });
        }

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        });

        await newMeeting.save();
        console.log("✅ Meeting saved:", newMeeting);

        res.status(201).json({ message: "Added code to history" });
    } catch (e) {
        console.error("❌ Error in addToHistory:", e);
        res.status(500).json({ message: `Something went wrong: ${e}` });
    }
};



export { login, register, getUserHistory, addToHistory }