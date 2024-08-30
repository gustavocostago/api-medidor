import { MeasureType } from '../../entities/measure'
import { prisma } from '../../lib/prisma'

export async function isValidInsertMeasure(
  customer_code: string,
  measure_datetime: Date,
  measure_type: MeasureType
) {
  const measure = await prisma.measure.findFirst({
    where: { customer_code },
  })
  if (measure) {
    if (
      measure.measure_datetime.getMonth() === measure_datetime.getMonth() &&
      measure.measure_type == measure_type
    )
      return -1
  }
}
