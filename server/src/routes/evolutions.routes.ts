import { Router } from 'express';
import * as evolutionsController from '../controllers/evolutions.controller';

const router: Router = Router();

router.get('/evolucao', evolutionsController.listAllEvolutions);
router.get('/evolucao/:id', evolutionsController.findEvolutionById);
router.post('/evolucao', evolutionsController.createEvolution);
router.put('/evolucao', evolutionsController.updateEvolutionById);
router.delete('/evolucao', evolutionsController.deleteEvolutionById);

export default router