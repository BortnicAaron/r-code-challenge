import { Character } from "./Character"

export interface History {
    id: number,
    characterId: number,
    createdAt: string
    type: 'UPDATE'
    previousData: Partial<Character>,
    currentData: Partial<Character>
}
