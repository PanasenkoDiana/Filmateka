import { Router } from 'express'
import moviesController from './moviesController'

const router = Router()

router.get('/movies', moviesController.getAllMovies)
router.get('/movies/:id', moviesController.getMovieById)
router.post('/movies/:id', moviesController.createMovie)
router.delete('/movies/delete/:id', moviesController.deleteMovie)
router.put('/movies/edit/:id', moviesController.updateMovie)
router.get('/resent-viewed-movies', moviesController.getAllRecentlyViewedMovie)

export default router