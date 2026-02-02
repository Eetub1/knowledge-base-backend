import express from 'express'
import cors from 'cors'
import loginRouter from './controllers/login.js'
import usersRouter from './controllers/users.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users/', usersRouter)

//testi
app.get('/', (req, res) => {
  res.send('Kaikki toimii!')
})

export default app