import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Internal } from '../interfaces/Errors/Internal'
import { NotFound } from '../interfaces/Errors/NotFound'
import { LocalCharacterServices } from '../services/localCharacterServices'
import { features, queries } from './queries'

const useDeleteCharacter = (id?: number) => {
    const queryClient = useQueryClient()


    const { mutateAsync, data, status, error } = useMutation({
        mutationFn: async () => {
            if (!id) throw new Internal(undefined, 'ID is required to update a character')
            return await LocalCharacterServices.deleteCharacter(id)
        },
        onSuccess: (character) => {
            queryClient.setQueryData(queries.getCharacter(id), character)
            queryClient.invalidateQueries({ queryKey: [features.CHARACTERS] })
            queryClient.invalidateQueries({ queryKey: [features.PAGINATED_CHARACTER] })
            queryClient.invalidateQueries({ queryKey: queries.getPaginatedComment(id) })
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
