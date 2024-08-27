import express from 'express'
import cors from 'cors'
import 'dotenv/config'
export const app = express()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, () => {
  console.log('servidor online está rodando na porta: ', process.env.PORT)
})
