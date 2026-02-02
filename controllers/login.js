import { Router } from "express"
import pool from "../db/pool.js"
const loginRouter = Router()

loginRouter.post("/", (req, res) => {
    console.log("MOI")
    res.send("Viesti vastaanotettu!")
})

loginRouter.get("/", (req, res) => {
    console.log("moro get")
    res.send("moi teit get pyynnön tänne")
})

loginRouter.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users LIMIT 1")
        res.json({
            message: "Connection successful!",
            rowCount: result.rowCount,
            firstUser: result.rows[0]
        })
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
})

export default loginRouter