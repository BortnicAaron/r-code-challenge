import { api } from '../config/api'
import { Character } from '../interfaces/Character'
import { PaginatedResponse } from '../interfaces/PaginatedResponse'
import { httpErrorHandler } from './httpErrorHandler'

export interface GetPaginatedCharacters {
    page?: number,
    name?: string
}

export const CharacterServices = {
    getPaginatedCharacters: async ({ page, name }: GetPaginatedCharacters): Promise<PaginatedResponse<Character[]>> => {
        try {
            const { data } = await api.get<PaginatedResponse<Character[]>>('/character', {
                params: {
                    page: page || undefined,
                    name: name || undefined
                }
            })

            return data
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },

    getCharacter: async (id: number): Promise<Character> => {
        try {
            const { data } = await api.get<Character>(`/character/${id}`)
            return data
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },
}
