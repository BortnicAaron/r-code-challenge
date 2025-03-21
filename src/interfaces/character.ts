export interface Character {
    id: string,
    name: string
    status: string,
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