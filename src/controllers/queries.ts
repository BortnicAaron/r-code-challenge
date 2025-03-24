// features - scopes

const features = {
    PAGINATED_CHARACTERS: 'PAGINATED_CHARACTERS',
    CHARACTER: 'CHARACTER',
    PAGINATED_HISTORY: 'PAGINATED_HISTORY',
} as const

// types

type TFeature = keyof typeof features

// type TScope = keyof typeof scopes

type TState = undefined | {
    [key: string]: unknown
}

type TCreateKeyProps<Feature, State> = {
    feature: Feature
    state?: State
}

type TKey<Feature extends TFeature, State extends TState> = Readonly<[Feature, State]>

// utils

export function createKey<Feature extends TFeature, State extends TState>(dto: TCreateKeyProps<Feature, State>) {
    return [dto.feature, dto.state] as const
}

function getKeyFeature<Feature extends TFeature, State extends TState>(k: TKey<Feature, State>) {
    return k[0]
}

function getKeyState<Feature extends TFeature, State extends TState>(k: TKey<Feature, State>) {
    return k[1]
}

// queries
const queries = {
    getPaginatedCharacters: (page?: number, name?: string) => createKey({
        feature: features.PAGINATED_CHARACTERS,
        state: {
            page: String(page),
            name
        }
    }),
    getCharacter: (id?: number) => createKey({
        feature: features.CHARACTER,
        state: {
            id
        }
    }),
    getPaginatedHistory: (characterId?: string) => createKey({
        feature: features.PAGINATED_HISTORY,
        state: {
            characterId
        }
    }),
}

export {
    features,
    getKeyFeature,
    getKeyState,
    queries
}

export type {
    TFeature,
    TState
}
