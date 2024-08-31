import express from 'express'
import cors from 'cors'
import 'dotenv/config'
export const app = express()

import upload from './controllers/measure/upload'
import list from './controllers/measure/list'
import confirm from './controllers/measure/confirm'

app.use(express.json({ limit: '200mb' }))
app.use(cors())

app.post('/upload', upload)
app.patch('/confirm', confirm)
app.get('/:customer_code/list', list)

app.listen(25000, () => {
  console.log('servidor online está rodando na porta: 25000')
})
