import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Internal } from '../interfaces/Errors/Internal'
import { NotFound } from '../interfaces/Errors/NotFound'
import { LocalCharacterRepository } from '../services/localCharacterServices'
import { queries } from './queries'

const useDeleteCharacter = (id?: number) => {
    const queryClient = useQueryClient()


    const { mutateAsync, data, status, error } = useMutation({
        mutationFn: async () => {
            if (!id) throw new Internal(undefined, 'ID is required to update a character')
            return await LocalCharacterRepository.deleteCharacter(id)
        },
        onSuccess: (character) => {
            queryClient.setQueryData(queries.getCharacter(id), character)
            queryClient.invalidateQueries({
                queryKey: queries.getPaginatedComment(id)
            })
        }
    })

    return {
        data,
        status,
        isNotFound: error instanceof NotFound,
        mutateAsync
    }
}
export { useDeleteCharacter }
