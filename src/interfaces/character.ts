export type Status = 'Alive' | 'Dead' | 'unknown'


export interface Location {
    name: string
    url: string
}

export interface Character {
    id: number,
    name: string
    status: Status,
    species: string,
    type: string,
    gender: string,
    image: string,
    episode: string[]
    location: Location
    deletedAt?: string
}