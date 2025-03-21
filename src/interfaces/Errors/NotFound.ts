import { ERROR_TYPES } from './ErrorTypes'

class NotFound extends Error {
    type

    constructor() {
        super()
        this.type = ERROR_TYPES.NOT_FOUND
    }
}

export { NotFound }
