import express from "express"
import cors from "cors"

import loginRouter from "./controllers/login.js"
import usersRouter from "./controllers/users.js"
import notesRouter from "./controllers/notes.js"
import foldersRouter from "./controllers/folders.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)
app.use("/api/notes", notesRouter)
app.use("/api/folders", foldersRouter)

//testi
app.get("/", (req, res) => {
  res.send("Kaikki toimii!")
})

export default app