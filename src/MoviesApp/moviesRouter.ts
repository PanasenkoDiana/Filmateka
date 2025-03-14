import { Router } from 'express'
import moviesController from './moviesController'

const router = Router()

router.get('/', moviesController.getAllMovies)
router.get('/:id', moviesController.getMovieById)

router.get('/recently-viewed', moviesController.getAllRecentlyViewedMovie)

router.post('/create', moviesController.createMovie)
router.post('/delete', moviesController.deleteMovieById)

export default router