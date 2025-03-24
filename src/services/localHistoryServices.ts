import { localApi } from '../config/api'
import { Character } from '../interfaces/Character'
import { History } from '../interfaces/History'
import { PaginatedResponse } from '../interfaces/PaginatedResponse'
import { httpErrorHandler } from './httpErrorHandler'

interface HistoryMsg {
    id: number,
    characterId: number,
    createdAt: string
    type: 'UPDATE'
    previousData: Partial<Character>,
    currentData: Partial<Character>
}


const buildHistory = (historyMsg: HistoryMsg): History => {
    return {
        characterId: historyMsg.characterId,
        id: historyMsg.id,
        createdAt: historyMsg.createdAt,
        type: historyMsg.type,
        currentData: historyMsg.currentData,
        previousData: historyMsg.previousData
    }
}

interface PaginatedResponseMsg<T> {
    first: number
    items: number
    last: number
    next: string | null
    pages: number
    prev: string | null
    data: T
}

function buildPaginatedResponse<T>(paginatedResponseMsg: PaginatedResponseMsg<T>): PaginatedResponse<T> {
    return {
        info: {
            count: paginatedResponseMsg.items,
            next: paginatedResponseMsg.next,
            pages: paginatedResponseMsg.pages,
            prev: paginatedResponseMsg.prev
        },
        results: paginatedResponseMsg.data
    }
}


export const LocalHistoryServices = {
    createHistory: async (history: Omit<History, 'id' | 'createdAt'>): Promise<History> => {
        try {
            const { data } = await localApi.post<HistoryMsg>('/history', {
                characterId: history.characterId,
                createdAt: new Date().toISOString(),
                type: history.type,
                previousData: history.previousData,
                currentData: history.currentData
            }).catch(httpErrorHandler)

            return buildHistory(data)

        } catch (error) {
            throw httpErrorHandler(error)
        }
    },
    getPaginatedHistory: async ({ characterId, page = 1 }: { characterId: number, page?: number }) => {
        try {
            const { data } = await localApi.get<PaginatedResponseMsg<HistoryMsg[]>>('/history', {
                params: {
                    characterId,
                    '_page': page,
                    '_sort': '-createdAt',
                    '_per_page': 3
                }
            }).catch(httpErrorHandler)

            return buildPaginatedResponse({
                ...data,
                data: data.data.map(buildHistory),
            })
        } catch (error) {
            throw httpErrorHandler(error)
        }
    }
}