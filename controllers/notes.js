import { Router } from "express"
import { addNoteById } from "../db/queries.js"

const notesRouter = Router()

notesRouter.get("/", (req, res) => {
    res.send("Moi")
})

notesRouter.post("/", async (req, res) => {
    console.log(req.body)
    const { content, title, id} = req.body

    const result = await addNoteById(title, content, id)
    res.status(201).json(result)
})

export default notesRouter