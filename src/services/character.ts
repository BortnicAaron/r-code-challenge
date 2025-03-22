import { api, localApi } from '../config/api'
import { Character } from '../interfaces/Character'
import { PaginatedResponse } from '../interfaces/PaginatedResponse'
import { httpErrorHandler } from './httpErrorHandler'

export interface GetPaginatedCharacters {
  page?: number,
  name?: string
}

export const getPaginatedCharacters = ({ page, name }: GetPaginatedCharacters) =>
  api.get<PaginatedResponse<Character[]>>('/character', {
    params: {
      page: page || undefined,
      name: name || undefined
    }
  }).catch(httpErrorHandler)

export const getCharacter = (id: string) =>
  api.get<Character>(`/character/${id}`).catch(httpErrorHandler)


export const createCharacterLocally = (character: Character) =>
  localApi.post<Character>(`/characters`, character).catch(httpErrorHandler)


export const getCharacterLocally = (id: string) =>
  localApi.get<Character>(`/characters/${id}`).catch(httpErrorHandler)

export const uptadeCharacterLocally = (id: string, character: Pick<Character, 'name' | 'type' | 'species' | 'status'>) =>
  localApi.patch<Character>(`/characters/${id}`, character).catch(httpErrorHandler)