import { Request, Response } from 'express'
import { z } from 'zod'
import { updateMeasures } from '../../repositories/prisma/update-measure'
import { fromZodError } from 'zod-validation-error'

export default async function confirm(req: Request, res: Response) {
  const listBodySchema = z.object({
    measure_uuid: z.string(),
    confirmed_value: z.number(),
  })
  try {
    const { measure_uuid, confirmed_value } = listBodySchema.parse(req.body)
    const result = await updateMeasures(measure_uuid, confirmed_value)
    if (!result) {
      return res.status(404).send({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      })
    }
    if (result === -1) {
      return res.status(409).send({
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura do mês já realizada',
      })
    }
    return res.status(200).send({ sucess: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = fromZodError(err)
      return res.status(400).send(validationError)
    }
    return res.status(500).send({ message: 'Server Internal Error' })
  }
}
