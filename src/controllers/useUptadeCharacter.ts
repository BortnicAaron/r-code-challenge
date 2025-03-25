import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Character } from '../interfaces/Character'
import { Internal } from '../interfaces/Errors/Internal'
import { LocalCharacterRepository } from '../services/localCharacterServices'
import { features, queries } from './queries'


interface Data {
    name: Character['name'],
    type: Character['type'],
    species: Character['species'],
    status: Character['status'],
    locationName: Character['location']['name']
    locationUrl: Character['location']['url']
    image: Character['image']
}

const useUptadeCharacter = (character?: Partial<Character>) => {
    const queryClient = useQueryClient()

    const { data, mutateAsync, status, error } = useMutation({
        mutationFn: async (data: Data) => {
            if (!character?.id) throw new Internal(undefined, 'ID is required to update a character')
            const r: Partial<Character> = {}
            if (character.name !== data.name) r.name = data.name
            if (character.type !== data.type) r.type = data.type
            if (character.species !== data.species) r.species = data.species
            if (character.status !== data.status) r.status = data.status
            if (character.image !== data.image) r.image = data.image
            if (character.location?.name !== data.locationName || character.location?.url !== data.locationUrl) r.location = { name: data.locationName, url: data.locationUrl }

            return await LocalCharacterRepository.updateCharacter(character.id, r)
        },
        onSuccess: (character) => {
            queryClient.setQueryData(queries.getCharacter(character?.id), character)
            queryClient.invalidateQueries({ queryKey: [features.CHARACTERS] })
            queryClient.invalidateQueries({ queryKey: [features.PAGINATED_CHARACTER] })
            queryClient.invalidateQueries({ queryKey: [features.PAGINATED_HISTORY] })
        }
    })

    return {
        data,
        mutateAsync,
        status,
        error
    }
}
export { useUptadeCharacter }

