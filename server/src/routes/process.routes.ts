import { Router } from 'express';
import * as processosController from '../controllers/process.controller';

const router: Router = Router();

router.post('/processos', processosController.createProcess);
router.get('/processos/:id', processosController.findProcessById);
router.get('/processos', processosController.listAllProcess);

export default router