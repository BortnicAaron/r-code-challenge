import { localApi } from '../config/api'
import { Character, Location, Status } from '../interfaces/Character'
import { httpErrorHandler } from './httpErrorHandler'
import { LocalHistoryServices } from './localHistoryServices'

export interface UpdateCharacterLocally {
    name?: string
    type?: string
    species?: string
    status?: Status
    location?: {
        name: string
        url: string
    }
    image?: string
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

export const LocalCharacterServices = {
    getCharacters: async (): Promise<Character[]> => {
        try {
            const { data } = await localApi.get<CharacterLocally[]>('/character').catch(httpErrorHandler)

            return data.map(buildCharacter)

        } catch (error) {
            throw httpErrorHandler(error)
        }
    },

    getCharacter: async (id: number): Promise<Character> => {
        try {
            const { data } = await localApi.get<CharacterLocally>(`/character/${id}`)
            return buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },

    createCharacter: async (character: Character): Promise<Character> => {
        try {
            const { data } = await localApi.post<CharacterLocally>('/character', character)
            return buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },

    updateCharacter: async (id: number, character: UpdateCharacterLocally): Promise<Character> => {
        let currentCharacter: Character | undefined
        let prevCharacter: Character | undefined

        try {
            prevCharacter = await LocalCharacterServices.getCharacter(id)
        } catch (error) {
            throw httpErrorHandler(error)
        }

        try {
            const { data } = await localApi.patch<CharacterLocally>(`/character/${id}`, {
                name: character.name,
                type: character.type,
                species: character.species,
                status: character.status,
                location: character.location,
                image: character.image
            })

            currentCharacter = buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }


        try {

            LocalHistoryServices.createHistory({
                characterId: id,
                type: 'UPDATE',
                currentData: {
                    name: character.name,
                    type: character.type,
                    species: character.species,
                    status: character.status,
                    location: character.location || undefined,
                    image: character.image
                },
                previousData: {
                    name: prevCharacter.name,
                    type: prevCharacter.type,
                    species: prevCharacter.species,
                    status: prevCharacter.status,
                    location: prevCharacter.location,
                    image: prevCharacter.image
                }
            })
        } catch (error) {

        }

        return (currentCharacter)

    },

    deleteCharacter: async (id: number): Promise<Character> => {
        try {
            const { data } = await localApi.patch<CharacterLocally>(`/character/${id}`, {
                deletedAt: new Date().toISOString()
            })
            return buildCharacter(data)
        } catch (error) {
            throw httpErrorHandler(error)
        }
    }

}


