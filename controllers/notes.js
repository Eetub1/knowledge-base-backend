import { Router } from "express"

const notesRouter = Router()

notesRouter.get("/", (req, res) => {
    res.send("Moi")
})

export default notesRouter