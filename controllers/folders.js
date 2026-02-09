import { Router } from "express"
import { createFolderByUserId, getFoldersByUserId } from "../db/queries.js"

const foldersRouter = Router()

foldersRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId

    const result = await getFoldersByUserId(userId)
    res.status(200).json(result)
})

foldersRouter.post("/", async (req, res) => {
    const { title, userId } = req.body

    const result = await createFolderByUserId(title, userId)
    res.status(201).json(result)
})

export default foldersRouter