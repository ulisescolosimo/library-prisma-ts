import express, { response } from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as BookService from './book.service'

export const bookRouter = express.Router()

//GET AUTHORS

bookRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books = await BookService.listBooks()
        return res.status(200).json(books)
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})

bookRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const book = await BookService.getBookById(id)
        if(book) {
            res.status(200).json(book)
        } else {
            return res.status(500).json('Book not found. Please try again.')
        }
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})

bookRouter.post('/', async (req: Request, res: Response) => {
    const { title, isFiction, datePublished, authorId } = req.body
    try {
        const book = await BookService.createBook({
            title,
            isFiction,
            datePublished,
            authorId
        })
        if(book) {
            res.status(200).json(book)
        } else {
            return res.status(500).json('Book cannot be created. Please try again.')
        }
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})

bookRouter.put('/:id', async (req: Request, res: Response) => {
    const { title, isFiction, datePublished, authorId } = req.body
    const id: number = parseInt(req.params.id, 10)
    try {
        const book = await BookService.updateBook({
            title,
            isFiction,
            datePublished,
            authorId
        }, id)
        if(book) {
            res.status(200).json(book)
        } else {
            return res.status(500).json('Book cannot be updated. Please try again.')
        }
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})

bookRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const book = await BookService.deleteBook(id)
        if(book) {
            res.status(200).json(book)
        } else {
            return res.status(500).json('Book cannot be deleted. Please try again.')
        }
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})