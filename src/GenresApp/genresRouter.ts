import { Router } from 'express'
import genresController from './genresController'

const router = Router()

router.get('/', genresController.getAllGenres)
router.get('/:id', genresController.getGenreById)

router.post('/create', genresController.createGenre)
router.post('/delete', genresController.deleteGenreById)

export default router