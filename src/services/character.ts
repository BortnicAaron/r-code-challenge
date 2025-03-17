import api from '../config/api'
import { Character } from '../interfaces/character'
import { PaginatedResponse } from '../interfaces/pagination'

const BASE_PATH = '/character'

interface IGetCharacters {
  page?: number,
  name?: string
}

export const getCharacters = ({ page, name }: IGetCharacters) =>
  api.get<PaginatedResponse<Character[]>>(BASE_PATH, {
    params: {
      page: page,
      name: name
    }
  })

export const getCharacter = (id: number) =>
  api.get<Character>(`${BASE_PATH}/${id}`)