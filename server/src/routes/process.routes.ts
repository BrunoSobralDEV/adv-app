import { Router } from 'express';
import * as processosController from '../controllers/process.controller';

const router: Router = Router();

router.get('/processos', processosController.listAllProcess);
router.get('/processos/:number', processosController.findProcessByNumber);
router.post('/processos', processosController.createProcess);
router.put('/processos/:id', processosController.updateProcessById);
router.delete('/processos/:id', processosController.deleteProcessById);

export default router