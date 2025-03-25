import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Comment } from '../interfaces/Comment'
import { NotFound } from '../interfaces/Errors/NotFound'
import { LocalCommentServices } from '../services/localCommentServices'
import { queries } from './queries'


const usePaginatedComment = (characterId?: number) => {

    const { data, isFetching, status, error, isRefetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: queries.getPaginatedComment(characterId),
        queryFn: async ({ pageParam }) => {
            const paginatedComment = await LocalCommentServices.getPaginatedComment({ characterId: characterId!, page: Number(pageParam) })

            return paginatedComment
        },
        getNextPageParam: (lastPage, pages) => lastPage.info.next,
        initialPageParam: '1',
        staleTime: 5_000,
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retryOnMount: false,
        retry: false,
        enabled: Boolean(characterId)
    })

    const r = useMemo(() => {
        const r = data?.pages.reduce((previousValue, currentValue) => {
            return [...previousValue, ...currentValue.results]
        }, [] as Comment[])

        return r
    }, [data?.pages])

    return {
        data,
        r,
        isFetching,
        isRefetching,
        status,
        isNotFound: error instanceof NotFound,
        fetchNextPage,
        hasNextPage
    }
}
export { usePaginatedComment }

