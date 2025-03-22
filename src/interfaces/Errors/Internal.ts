import { ERROR_TYPES } from './ErrorTypes'

class Internal extends Error {
    type
    cause

    constructor(cause?: unknown, message?: string) {
        super(message)
        this.type = ERROR_TYPES.INTERNAL
        this.cause = cause
    }
}

export { Internal }
