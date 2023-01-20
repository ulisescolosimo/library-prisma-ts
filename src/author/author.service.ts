import { db } from '../utils/db.utils'
import type { Book } from '../book/book.service'

export type Author = {
    id: number
    firstName: string
    lastName: string
}

export const listAuthors = async (): Promise<Author[]> => {
    return db.author.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    })
}

export const getAuthorById = async (id: number): Promise<Author | null> => {
        return db.author.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
            }
        });
}

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
    const { firstName, lastName } = author
    return db.author.create({
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true
        }
    })
}

export const updateAuthor = async (author: Omit<Author, 'id'>, id: number): Promise<Author> => {
    const { firstName, lastName } = author
    return db.author.update({
        where: {
          id
        },
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            updatedAt: true
        }
      })
}

export const deleteById = async (id: number): Promise<Author | null> => {
    return db.author.delete({
        where: {
            id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    })
}
