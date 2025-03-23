import { localApi } from '../config/api'
import { Character } from '../interfaces/Character'
import { History } from '../interfaces/History'
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
    }
}