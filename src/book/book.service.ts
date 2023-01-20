import type { Author } from '../author/author.service'
import { db } from '../utils/db.utils'

export type Book = {
    id: number
    title: string
    isFiction: boolean
    datePublished: Date
    author: Author
}

type BookCreate = {
    title: string
    isFiction: boolean
    datePublished: Date
    authorId: number
}

export const listBooks = async (): Promise<Book[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
}

export const getBookById = async (id: number): Promise<Book | null> => {
    return db.book.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        },
    });
};

export const createBook = async (book: BookCreate): Promise<Book> => {
    const { title, isFiction, datePublished, authorId } = book;
    const parseDate: Date = new Date(datePublished);
    return db.book.create({
        data: {
            title,
            isFiction,
            datePublished: parseDate,
            authorId
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        },
    })
}

export const updateBook = async (book: Omit<BookCreate, 'id'>, id: number): Promise<Book> => {
    const { title, isFiction, datePublished, authorId } = book
    const parseDate: Date = new Date(datePublished);
    return db.book.update({
        where: {
            id
        },
        data: {
            title,
            isFiction,
            datePublished: parseDate,
            authorId
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })
}

export const deleteBook = async (id: number): Promise<Book | null> => {
    return db.book.delete({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })
}