import { localApi } from '../config/api'
import { Character, Location, Status } from '../interfaces/Character'
import { httpErrorHandler } from './httpErrorHandler'

export interface UpdateCharacterLocally {
    name: Character['name']
    type: Character['type']
    species: Character['species']
    status: Character['status']
    location?: Character['location']
}


interface CharacterLocationLocally {
    name: string
    url: string
}

interface CharacterLocally {
    id: string
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: CharacterLocationLocally
    location: CharacterLocationLocally
    image: string
    episode: string[]
    url: string
    created: string
    deletedAt?: string
}


const buildLocation = (characterLocationLocally: CharacterLocationLocally): Location => {
    return {
        name: characterLocationLocally.name,
        url: characterLocationLocally.url
    }
}

const buildCharacter = (characterLocally: CharacterLocally): Character => {
    return {
        id: Number(characterLocally.id),
        episode: characterLocally.episode,
        gender: characterLocally.gender,
        image: characterLocally.image,
        location: buildLocation(characterLocally.location),
        name: characterLocally.name,
        species: characterLocally.species,
        status: characterLocally.status as Status,
        type: characterLocally.type,
        deletedAt: characterLocally.deletedAt
    }
}

export const LocalCharacterRepository = {
    getCharacters: async (): Promise<Character[]> => {
        try {
            const { data } = await localApi.get<CharacterLocally[]>('/characters').catch(httpErrorHandler)

            return data.map(buildCharacter)

        } catch (error) {
            throw httpErrorHandler(error)
        }
    },

    getCharacter: async (id: number): Promise<Character> => {
        try {
            const { data } = await localApi.get<CharacterLocally>(`/characters/${id}`)
            return buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },

    createCharacter: async (character: Character): Promise<Character> => {
        try {
            const { data } = await localApi.post<CharacterLocally>('/characters', character)
            return buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },

    updateCharacter: async (id: number, character: UpdateCharacterLocally): Promise<Character> => {
        try {
            const { data } = await localApi.patch<CharacterLocally>(`/characters/${id}`, {
                name: character.name,
                type: character.type,
                species: character.species,
                status: character.status,
                location: character.location
            })
            return buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }

    },

    deleteCharacter: async (id: number): Promise<Character> => {
        try {
            const { data } = await localApi.patch<CharacterLocally>(`/characters/${id}`, {
                deletedAt: new Date().toISOString()
            })
            return buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }
    }

}