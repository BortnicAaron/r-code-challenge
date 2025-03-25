import { Location } from "./Character"

export interface Data {
    name?: string
    status?: 'Alive' | 'Dead' | 'unknown',
    species?: string,
    type?: string,
    image?: string,
    episode?: string[]
    location?: Partial<Location>
}

export interface History {
    id: number,
    characterId: number,
    createdAt: string
    type: 'UPDATE'
    previousData: Partial<Data>,
    currentData: Partial<Data>
}
