import { Router } from 'express';
import genresController from './genresController';

const router = Router();

router.get('/genres', genresController.getAllGenres);
router.delete('/genres/:id', genresController.deleteGenre);
router.post('/genres', genresController.createGenre);
router.put('/genres/:id', genresController.updateGenre);

export default router;