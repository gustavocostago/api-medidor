import { prisma } from '../../lib/prisma'

export async function updateMeasures(
  measure_uuid: string,
  measure_value: number
) {
  const measures = await prisma.measure.update({
    where: {
      measure_uuid,
    },
    data: {
      measure_value,
    },
  })
  return measures
}
