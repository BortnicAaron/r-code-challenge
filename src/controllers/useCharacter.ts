import { skipToken, useQuery } from '@tanstack/react-query'
import { Character } from '../interfaces/Character'
import { NotFound } from '../interfaces/Errors/NotFound'
import { CharacterServices } from '../services/characterServices'
import { LocalCharacterRepository } from '../services/localCharacterServices'
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
    staleTime: 30_000,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retryOnMount: true,
    retry: false,
    keepPreviousData: true
}


const useCharacter = (id: number | undefined, configInput?: IConfig) => {
    const config = {
        ...configDefault,
        ...configInput
    }

    const { data, isFetching, status, error, isRefetching } = useQuery({
        queryKey: queries.getCharacter(id),
        queryFn: id ? async () => {
            let characterLocally: Character
            try {
                characterLocally = (await LocalCharacterRepository.getCharacter(id))
            } catch (error) {
                const character = await CharacterServices.getCharacter(id)
                characterLocally = (await LocalCharacterRepository.createCharacter(character))
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
        isNotFound: error instanceof NotFound,
    }
}
export { useCharacter }

