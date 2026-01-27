import { Router } from "express"
const loginRouter = Router()

loginRouter.post("/", (req, res) => {
    console.log("MOI")
    res.send("Viesti vastaanotettu!")
})

loginRouter.get("/", (req, res) => {
    console.log("moro get")
    res.send("moi teit get pyynnön tänne")
})

export default loginRouter