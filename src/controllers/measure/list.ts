import { Request, Response } from 'express'
import { z } from 'zod'
import { listMeasures } from '../../repositories/prisma/list-measures'

export default async function list(req: Request, res: Response) {
  const listBodySchema = z.object({
    customer_code: z.string(),
  })
  const { customer_code } = listBodySchema.parse(req.params)
  try {
    const measures = await listMeasures(customer_code)
    return res.status(200).send({ customer_code, measures })
  } catch {
    return res.status(500).send({ message: 'Server Internal Error' })
  }
}
