import { useQuery } from '@tanstack/react-query'
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
        queryFn: async () => {
            const paginatedCharacters = await CharacterServices.getPaginatedCharacters({ page, name: nameCharacter })

            const characters = paginatedCharacters.results
            const charactersLocally = await LocalCharacterRepository.getCharacters()

            const r = characters.map((character) => {
                const characterFinded = charactersLocally.find((characterLocally) => String(characterLocally.id) === String(character.id))

                if (characterFinded) {
                    return {
                        ...charactersLocally,
                        ...characterFinded
                    }
                }
                return character
            })

            paginatedCharacters.results = r
            return paginatedCharacters
        },
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

