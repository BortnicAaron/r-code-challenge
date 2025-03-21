import api from '../config/api'
import { Character } from '../interfaces/Character'
import { PaginatedResponse } from '../interfaces/PaginatedResponse'
import { httpErrorHandler } from './httpErrorHandler'

const BASE_PATH = '/character'

export interface GetPaginatedCharacters {
  page?: number,
  name?: string
}

export const getPaginatedCharacters = ({ page, name }: GetPaginatedCharacters) =>
  api.get<PaginatedResponse<Character[]>>(BASE_PATH, {
    params: {
      page: page || undefined,
      name: name || undefined
    }
  }).catch(httpErrorHandler)

export const getCharacter = (id: number) =>
  api.get<Character>(`${BASE_PATH}/${id}`).catch(httpErrorHandler)