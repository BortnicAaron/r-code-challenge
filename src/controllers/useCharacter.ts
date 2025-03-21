import { skipToken, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Character } from '../interfaces/Character'
import { NotFound } from '../interfaces/Errors/NotFound'
import { createCharacterLocally, getCharacter, getCharacterLocally } from '../services/character'
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


const useCharacter = (id: string | undefined, configInput?: IConfig) => {
    const config = {
        ...configDefault,
        ...configInput
    }

    const { data, isFetching, status, error, isRefetching } = useQuery({
        queryKey: queries.getCharacter(id),
        queryFn: id ? async () => {
            let characterLocally: AxiosResponse<Character, any>
            try {
                characterLocally = (await getCharacterLocally(id))
            } catch (error) {
                const character = await getCharacter(id)
                characterLocally = (await createCharacterLocally(character.data))
            }


            return characterLocally
        } : skipToken,
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
export { useCharacter }

