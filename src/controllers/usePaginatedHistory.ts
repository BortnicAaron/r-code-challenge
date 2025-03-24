import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { NotFound } from '../interfaces/Errors/NotFound'
import { History } from '../interfaces/History'
import { LocalHistoryServices } from '../services/localHistoryServices'
import { queries } from './queries'


const usePaginatedHistory = (characterId?: number) => {

    const { data, isFetching, status, error, isRefetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: queries.getPaginatedHistory(characterId),
        queryFn: async ({ pageParam }) => {
            const paginatedHistory = await LocalHistoryServices.getPaginatedHistory({ characterId: characterId!, page: Number(pageParam) })

            return paginatedHistory
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
        }, [] as History[])

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
export { usePaginatedHistory }

