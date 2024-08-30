import { MeasureType } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export async function listMeasures(
  customer_code: string,
  measure_type?: MeasureType
) {
  const measures = await prisma.measure.findMany({
    where: {
      customer_code,
      measure_type,
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
  if (measures.length === 0) return null
  return measures
}
