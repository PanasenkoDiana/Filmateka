import { Router } from 'express'
import moviesController from './moviesController'

const router = Router()

router.get('/movies', moviesController.getAllMovies)
router.get('/movie/:id', moviesController.getMovieById)
router.get('/resent-viewed-movies', moviesController.getAllRecentlyViewedMovie)

export default router