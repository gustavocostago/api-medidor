import { prisma } from '../../lib/prisma'

export async function updateMeasures(
  measure_uuid: string,
  measure_value: number
) {
  const isValid = await prisma.measure.findFirst({
    where: {
      measure_uuid,
    },
  })
  if (!isValid) return null
  if (isValid.has_confirmed) return -1
  const measures = await prisma.measure.update({
    where: {
      measure_uuid,
    },
    data: {
      measure_value,
      has_confirmed: true,
    },
  })
  return measures
}
