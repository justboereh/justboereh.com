import { H3Event } from 'h3'

export const BadRequest = (event: H3Event, msg?: string) => {
    setResponseStatus(event, 400)

    return msg || 'Bad Request'
}

export const NotFound = (event: H3Event, msg?: string) => {
    setResponseStatus(event, 404)

    return msg || 'Not Found'
}
