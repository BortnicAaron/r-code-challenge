import { useQuery } from '@tanstack/react-query'
import { NotFound } from '../interfaces/Errors/NotFound'
import { getPaginatedCharacters } from '../services/character'
import { queries } from './queries'

interface IConfig {
    staleTime?: number,
    refetchOnMount?: boolean,
    refetchOnReconnect?: boolean,
    refetchOnWindowFocus?: boolean,
    refetchInterval?: number | false
    retryOnMount?: boolean
    retry?: boolean
    keepPreviousData?: boolean
}

const configDefault: IConfig = {
    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retryOnMount: true,
    retry: false,
    keepPreviousData: true
}


const usePaginatedCharacters = (page: number | undefined, nameCharacter: string | undefined, configInput?: IConfig) => {
    const config = {
        ...configDefault,
        ...configInput
    }

    const { data, isFetching, status, error, isRefetching } = useQuery({
        queryKey: queries.getPaginatedCharacters(page, nameCharacter),
        queryFn: () => getPaginatedCharacters({ page, name: nameCharacter }),
        ...config
    })

    return {
        data,
        isFetching,
        isRefetching,
        status,
        isNotFound: error instanceof NotFound
    }
}
export { usePaginatedCharacters }

