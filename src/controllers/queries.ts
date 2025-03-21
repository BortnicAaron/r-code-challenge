// features - scopes

const features = {
    CHARACTERS: 'CHARACTERS',
    CHARACTER: 'CHARACTER',
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
        feature: features.CHARACTERS,
        state: {
            page,
            name
        }
    }),
    getCharacter: (id?: string) => createKey({
        feature: features.CHARACTERS,
        state: {
            id
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
