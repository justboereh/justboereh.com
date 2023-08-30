import { theatres } from 'assets/scripts/theatres'
import { BadRequest } from '~/server/utils/responses'

export default defineEventHandler((event) => {
    const theatreParam = getRouterParam(event, 'theatre')
    if (!theatreParam) return BadRequest(event)

    const theatre = theatres.find((x) => x.name === theatreParam)
	if (!theatre) return BadRequest(event)
	
	
})
