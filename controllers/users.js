import { Router } from "express"
import { createUser } from '../db/queries.js'
import bcrypt from "bcrypt"

const usersRouter = Router()

usersRouter.post("/", async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" })
    }

    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newUser = await createUser(username, passwordHash)
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default usersRouter