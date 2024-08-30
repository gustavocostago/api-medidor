export enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}
export interface Measure {
  customer_code: string
  image_url: string
  measure_datetime: Date
  measure_type: MeasureType
  measure_value: number
}
