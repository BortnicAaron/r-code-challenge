import { localApi } from '../config/api'
import { Comment } from '../interfaces/Comment'
import { PaginatedResponse } from '../interfaces/PaginatedResponse'
import { httpErrorHandler } from './httpErrorHandler'

interface CommentMsg {
    id: number,
    characterId: number
    message: string,
    createdAt: string
}


const buildComment = (commentMsg: CommentMsg): Comment => {
    return {
        characterId: commentMsg.characterId,
        createdAt: commentMsg.createdAt,
        id: commentMsg.id,
        message: commentMsg.message
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


export const LocalCommentServices = {
    createComment: async (characterId: number, message: string): Promise<Comment> => {
        try {
            const msg = message.replace(/\n+$/, '')
            const { data } = await localApi.post<CommentMsg>('/comment', {
                characterId,
                message: msg,
                createdAt: new Date().toISOString()
            }).catch(httpErrorHandler)

            return buildComment(data)

        } catch (error) {
            throw httpErrorHandler(error)
        }
    },
    getPaginatedComment: async ({ characterId, page = 1 }: { characterId: number, page?: number }) => {
        try {
            const { data } = await localApi.get<PaginatedResponseMsg<CommentMsg[]>>('/comment', {
                params: {
                    characterId,
                    '_page': page,
                    '_sort': '-createdAt',
                    '_per_page': 3
                }
            }).catch(httpErrorHandler)

            return buildPaginatedResponse({
                ...data,
                data: data.data.map(buildComment),
            })
        } catch (error) {
            throw httpErrorHandler(error)
        }
    },
}