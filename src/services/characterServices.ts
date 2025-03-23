import { api } from '../config/api'
import { Character, Location } from '../interfaces/Character'
import { PaginatedResponse } from '../interfaces/PaginatedResponse'
import { httpErrorHandler } from './httpErrorHandler'

interface GetPaginatedCharacters {
    page?: number,
    name?: string
}

interface CharacterMsg {
    id: number,
    name: string
    status: 'Alive' | 'Dead' | 'unknown',
    species: string,
    type: string,
    gender: string,
    image: string,
    episode: string[]
    location: Location
}
interface PaginatedResponseMsg<T> {
    info: {
        count: number
        pages: number
        next: string | null
        prev: string | null
    }
    results: T
}

function buildPaginatedResponse<T>(paginatedResponseMsg: PaginatedResponseMsg<T>): PaginatedResponse<T> {
    const info = paginatedResponseMsg.info
    return {
        info: {
            count: info.count,
            next: info.next,
            pages: info.pages,
            prev: info.prev
        },
        results: paginatedResponseMsg.results
    }
}


const buildCharacter = (characterMsg: CharacterMsg): Character => {
    return {
        episode: characterMsg.episode,
        gender: characterMsg.gender,
        id: characterMsg.id,
        image: characterMsg.image,
        location: {
            name: characterMsg.location.name,
            url: characterMsg.location.url,
        },
        name: characterMsg.name,
        species: characterMsg.species,
        status: characterMsg.status,
        type: characterMsg.type,
    }
}

export const CharacterServices = {
    getPaginatedCharacters: async ({ page, name }: GetPaginatedCharacters): Promise<PaginatedResponse<Character[]>> => {
        try {
            const { data } = await api.get<PaginatedResponseMsg<CharacterMsg[]>>('/character', {
                params: {
                    page: page || undefined,
                    name: name || undefined
                }
            })

            return buildPaginatedResponse({
                info: data.info,
                results: data.results.map(buildCharacter)
            })
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },

    getCharacter: async (id: number): Promise<Character> => {
        try {
            const { data } = await api.get<CharacterMsg>(`/character/${id}`)
            return buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },
}
