import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Get the format right fam, i need an email').isEmail(),
    body('password', 'min 5 characters here').isLength({ min: 5 }),
]


export const registerValidation = [
    body('email', 'Get the format right fam, i need an email').isEmail(),
    body('password', 'min 5 characters here').isLength({ min: 5 }),
    body('fullName', 'Enter a name, if it is shorter than 3 chars, too bad :(').isLength({ min: 3 }),
    body('avatarUrl', 'Link is incorrect').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Enter a title for the post. (3 chars)').isLength({ min: 3 }).isString(),
    body('text', 'Enter post body. (min 10 chars)').isLength({ min: 10 }).isString(),
    body('tags', 'Incorrect tag format, (need an str).').optional().isString(),
    body('imageUrl', 'Image URL is incorrect.').optional().isString(),
]