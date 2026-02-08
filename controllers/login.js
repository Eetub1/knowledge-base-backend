import { Router } from "express"
import pool from "../db/pool.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { findUserByUsername } from "../db/queries.js"

const loginRouter = Router()

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body

    const user = await findUserByUsername(username)
    
    const passwordCorrect = user === undefined 
        ? false
        : await bcrypt.compare(password, user.password_hash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: "invalid username or password"
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {expiresIn: 60*120}
    )
    res.status(200).send({ 
        token, 
        username: user.username, 
        id: user.id 
    })
})

export default loginRouter