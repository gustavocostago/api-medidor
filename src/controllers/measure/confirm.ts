import { Request, Response } from 'express'
import { z } from 'zod'
import { updateMeasures } from '../../repositories/prisma/update-measure'

export default async function confirm(req: Request, res: Response) {
  const listBodySchema = z.object({
    measure_uuid: z.string(),
    confirmed_value: z.number(),
  })
  const { measure_uuid, confirmed_value } = listBodySchema.parse(req.body)
  try {
    await updateMeasures(measure_uuid, confirmed_value)
    return res.status(200).send({ message: 'OK' })
  } catch {
    return res.status(500).send({ message: 'Server Internal Error' })
  }
}
