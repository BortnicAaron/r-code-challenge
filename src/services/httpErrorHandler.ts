import { isAxiosError } from 'axios'
import { Internal } from '../interfaces/Errors/Internal'
import { NotFound } from '../interfaces/Errors/NotFound'

const httpErrorHandler = (error: unknown) => {
    if (error === null) throw new Internal(error, 'Unrecoverable error!! Error is null!')
    if (isAxiosError(error)) {
        const response = error?.response

        if (response) {
            const statusCode = response?.status
            if (statusCode === 404) {
                throw new NotFound()
            }
        }
    }
    throw new Internal(error, 'Internal error!! httpErrorHandler')
}

export { httpErrorHandler }
