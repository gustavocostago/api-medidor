import { Request, Response } from 'express'
import geminiApi from '../../usecases/gemini'
import { insertMeasure } from '../../repositories/prisma/insert-measure'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { isValidInsertMeasure } from '../../repositories/prisma/is-valid-insert-measure'
import { Base64 } from 'js-base64'
import { MeasureType } from '../../entities/measure'

export default async function upload(req: Request, res: Response) {
  const uploadBodySchema = z.object({
    image: z.string().refine(Base64.isValid),
    customer_code: z.string(),
    measure_datetime: z.coerce.date(),
    measure_type: z.nativeEnum(MeasureType),
  })
  try {
    const { image, customer_code, measure_datetime, measure_type } =
      uploadBodySchema.parse(req.body)

    const isValid = await isValidInsertMeasure(
      customer_code,
      measure_datetime,
      measure_type
    )
    if (isValid === -1) {
      return res.status(409).send({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      })
    }
    const { image_url, measure_value } = await geminiApi(image)
    const measureId = await insertMeasure(
      customer_code,
      image_url,
      measure_datetime,
      measure_type,
      measure_value
    )
    return res.status(200).send({
      image_url: image_url,
      measure_value: measure_value,
      measure_uuid: measureId,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = fromZodError(err)
      return res.status(400).send({ message: validationError })
    }
    return res.status(500).send({ message: 'Server Internal Error' })
  }
}
