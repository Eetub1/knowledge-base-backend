import { Router } from "express"
import { createFolderByUserId } from "../db/queries.js"

const foldersRouter = Router()

foldersRouter.post("/", async (req, res) => {
    const { title, userId } = req.body

    const result = await createFolderByUserId(title, userId)
    console.log("MOOOO")
    res.status(201).json(result)
})

export default foldersRouter