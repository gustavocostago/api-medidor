import { MeasureType } from '../../entities/measure'
import { prisma } from '../../lib/prisma'
export async function insertMeasure(
  customer_code: string,
  image_url: string,
  measure_datetime: Date,
  measure_type: MeasureType,
  measure_value: number
) {
  const { measure_uuid } = await prisma.measure.create({
    data: {
      customer_code,
      image_url,
      measure_datetime,
      measure_type,
      measure_value,
    },
  })
  return measure_uuid
}
