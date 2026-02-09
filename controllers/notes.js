import { Router } from "express"
import { addNoteById, getUserNotesById } from "../db/queries.js"

const notesRouter = Router()

notesRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId

    const result = await getUserNotesById(userId)
    res.status(200).json(result)
})

//testi
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