import { prisma } from '../../lib/prisma'

export async function listMeasures(customer_code: string) {
  const measures = await prisma.measure.findMany({
    where: {
      customer_code,
    },
    select: {
      measure_uuid: true,
      customer_code: false,
      measure_datetime: true,
      measure_type: true,
      has_confirmed: true,
      image_url: true,
    },
  })
  return measures
}
