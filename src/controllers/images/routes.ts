import { Router } from 'express'
import upload from './upload'

export const imageRoutes = Router()
imageRoutes.post('/', upload)
