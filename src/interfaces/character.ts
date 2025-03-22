export type Status = 'Alive' | 'Dead' | 'unknown'

export interface Character {
    id: string,
    name: string
    status: Status,
    species: string,
    type: string,
    gender: string,
    image: string,
    episode: string[]
    location: {
        name: string
        url: string
    }
}