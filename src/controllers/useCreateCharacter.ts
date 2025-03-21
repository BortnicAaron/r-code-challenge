import { useMutation } from '@tanstack/react-query'

const useCreateCharacter = () => {
    //const invalidateQueries = useInvalidateQueries()

    const { data, mutate, mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: async () => {
            //return await createCharacterLocally({})
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

export { useCreateCharacter }
