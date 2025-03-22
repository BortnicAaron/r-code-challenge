import { useMutation } from '@tanstack/react-query'
import { Character } from '../interfaces/Character'
import { Internal } from '../interfaces/Errors/Internal'
import { LocalCharacterRepository } from '../services/localCharacterServices'


interface Data {
    name: Character['name'],
    type: Character['type'],
    species: Character['species'],
    status: Character['status'],
    locationName?: Character['location']['name']
}

const useUptadeCharacter = (id?: number) => {

    const { data, mutateAsync, status, error } = useMutation({
        mutationFn: async (character: Data) => {
            if (!id) throw new Internal(undefined, 'ID is required to update a character')
            return await LocalCharacterRepository.updateCharacter(id, {
                ...character,
                location: character.locationName ? {
                    name: character.locationName,
                    url: ''
                } : undefined
            })
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

