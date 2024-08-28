import { Request, Response } from 'express'
import geminiApi from '../../usecases/gemini'

export default async function upload(req: Request, res: Response) {
  const result = await geminiApi(req.body.image)
  res.send({ image_url: 'url', measure_value: result, measure_uuid: 'uuid' })
}
