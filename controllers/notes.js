import { Router } from "express"
import { addNoteById, getUserNotesById, updateNoteById, deleteNoteById } from "../db/queries.js"

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

notesRouter.put("/:noteId", async (req, res) => {
    const noteId = req.params.noteId
    const editedNote = req.body

    console.log("Tiedot backendille: ", editedNote)

    try {
        const result = await updateNoteById(editedNote, noteId)
        res.status(200).json(result)
    } catch (error) {
        console.error("Tapahtui virhe muokattaessa muistiinpanoa:", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

notesRouter.delete("/:noteId", async (req, res) => {
    const noteId = req.params.noteId

    try {
        await deleteNoteById(noteId)
        res.status(204).end()
    } catch (error) {
        console.error("Tapahtui virhe poistettaessa muistiinpanoa:", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default notesRouter