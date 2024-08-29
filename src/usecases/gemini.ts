import { GoogleAIFileManager } from '@google/generative-ai/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { writeFileSync, unlinkSync } from 'fs'

export default async function geminiApi(base64: string) {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error()

  const fileManager = new GoogleAIFileManager(key)
  const buffer = Buffer.from(base64, 'base64')
  writeFileSync('imagem.jpg', buffer)
  const uploadResponse = await fileManager.uploadFile('imagem.jpg', {
    mimeType: 'image/jpeg',
    displayName: 'medidor',
  })

  // console.log(
  //   `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
  // )

  const getResponse = await fileManager.getFile(uploadResponse.file.name)
  const image_url = getResponse.uri
  // console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`)
  const genAI = new GoogleGenerativeAI(key)

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  })
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    {
      text: 'faça a leitura desse medidor e me informe a medida lida, responda em pt-br',
    },
  ])
  // console.log(result.response.text())
  unlinkSync('imagem.jpg')
  const numsStr = result.response.text().replace(/[^0-9]/g, '')
  const measure_value = parseInt(numsStr)
  return { image_url, measure_value }
}
