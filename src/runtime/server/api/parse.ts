import { parseContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const config = await useRuntimeConfig()
  const endpointToken = config.content?.parseEndpoint?.token
  const { id, content, token } = await useBody(event)
  console.log('endpointToken', token)
  if (endpointToken && endpointToken !== token) {
    return {
      msg: 'unauthorized'
    }
  }
  // @ts-ignore
  const parsedContent = await parseContent(id || 'content:_file.md', content)

  return parsedContent
})
