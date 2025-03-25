import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Internal } from '../interfaces/Errors/Internal'
import { LocalCommentServices } from '../services/localCommentServices'
import { queries } from './queries'

const useCreateComment = (characterId?: number) => {
    const queryClient = useQueryClient()

    const { data, mutate, mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: async (msg: string) => {
            if (!characterId) throw new Internal(undefined, 'ID is required to create a comment')
            return await LocalCommentServices.createComment(characterId, msg)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queries.getPaginatedComment(characterId)
            })
        }
    })

    return {
        data,
        mutate,
        mutateAsync,
        isSuccess,
        isPending
    }
}

export { useCreateComment }
