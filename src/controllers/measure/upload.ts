import { Request, Response } from 'express'
import geminiApi from '../../usecases/gemini'
import { insertMeasure } from '../../repositories/prisma/insert-measure'
import { z } from 'zod'

export default async function upload(req: Request, res: Response) {
  const uploadBodySchema = z.object({
    image: z.string(),
    customer_code: z.string(),
    measure_datetime: z.coerce.date(),
    measure_type: z.enum(['WATER', 'GAS']),
  })
  const { image, customer_code, measure_datetime, measure_type } =
    uploadBodySchema.parse(req.body)
  const { image_url, measure_value } = await geminiApi(image)
  const measureId = await insertMeasure(
    customer_code,
    image_url,
    measure_datetime,
    measure_type,
    measure_value
  )
  res.send({
    image_url: image_url,
    measure_value: measure_value,
    measure_uuid: measureId,
  })
}
