import { useMutation } from '@tanstack/react-query'
import { Character } from '../interfaces/Character'
import { Internal } from '../interfaces/Errors/Internal'
import { uptadeCharacterLocally } from '../services/character'


const useUptadeCharacter = (id?: string) => {

    const { data, mutateAsync, status, error } = useMutation({
        mutationFn: async (character: Pick<Character, "name" | "type" | "species" | "status">) => {
            if (!id) throw new Internal(undefined, 'ID is required to update a character')
            return await uptadeCharacterLocally(id, character)
        },
    })

    return {
        data,
        mutateAsync,
        status,
        error
    }
}
export { useUptadeCharacter }

