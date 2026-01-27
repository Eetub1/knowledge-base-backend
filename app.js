import express from 'express'
import cors from 'cors'
const app = express()
import loginRouter from './controllers/login.js'

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)

//testi
app.get('/', (req, res) => {
  res.send('Kaikki toimii!')
})

export default app