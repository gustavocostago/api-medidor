import { Request, Response } from 'express'
import { z } from 'zod'
import { listMeasures } from '../../repositories/prisma/list-measures'
import { fromZodError } from 'zod-validation-error'
import { MeasureType } from '../../entities/measure'

export default async function list(req: Request, res: Response) {
  const listParamsSchema = z.object({
    customer_code: z.string(),
  })
  const listQuerySchema = z.object({
    measure_type: z.nativeEnum(MeasureType).optional(),
  })
  try {
    const { customer_code } = listParamsSchema.parse(req.params)
    const { measure_type } = listQuerySchema.parse(req.query)
    const measures = await listMeasures(customer_code, measure_type)
    if (!measures) {
      return res.status(404).send({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      })
    }
    return res.status(200).send({ customer_code, measures })
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = fromZodError(err)
      return res.status(400).send({ message: validationError })
    }
    return res.status(500).send({ message: 'Server Internal Error' })
  }
}
