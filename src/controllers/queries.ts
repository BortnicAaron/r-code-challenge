// features - scopes

const features = {
    PAGINATED_CHARACTER: 'PAGINATED_CHARACTER',
    CHARACTER: 'CHARACTER',
    CHARACTERS: 'CHARACTERS',
    PAGINATED_HISTORY: 'PAGINATED_HISTORY',
    PAGINATED_COMMENT: 'PAGINATED_COMMENT',
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
        feature: features.PAGINATED_CHARACTER,
        state: {
            page: String(page),
            name
        }
    }),
    getCharacters: () => createKey({
        feature: features.CHARACTERS,
    }),
    getCharacter: (id?: number) => createKey({
        feature: features.CHARACTER,
        state: {
            id
        }
    }),
    getPaginatedHistory: (characterId?: number) => createKey({
        feature: features.PAGINATED_HISTORY,
        state: {
            characterId
        }
    }),
    getPaginatedComment: (characterId?: number) => createKey({
        feature: features.PAGINATED_COMMENT,
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
