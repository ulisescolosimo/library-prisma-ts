import express, { response } from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as AuthorService from './author.service'

export const authorRouter = express.Router()

//GET AUTHORS

authorRouter.get('/', async (req: Request, res: Response) => {
    try {
        const authors = await AuthorService.listAuthors()
        return res.status(200).json(authors)
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})

authorRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const author = await AuthorService.getAuthorById(id)
        if (author) {
            res.status(200).json(author)
        } else {
            res.status(404).json({ message: "Author not found" })
        }
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})

authorRouter.post('/', async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body
    try {
        const author = await AuthorService.createAuthor({ firstName, lastName })
        if (author) {
            res.status(200).json(author)
        } else {
            res.status(404).json({ message: "Author not created" })
        }
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})

authorRouter.put('/:id', async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body
    const id: number = parseInt(req.params.id, 10)
    try {
        const author = await AuthorService.updateAuthor({ firstName, lastName }, id)
        if (author) {
            res.status(200).json(author)
        } else {
            res.status(404).json({ message: "Author not updated" })
        }
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})

authorRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const author = await AuthorService.deleteById(id)
        if (author) {
            res.status(200).json(author)
        } else {
            res.status(404).json({ message: "Author not deleted" })
        }
    } catch (err: any) {
        return res.status(500).json(err.message)
    }
})