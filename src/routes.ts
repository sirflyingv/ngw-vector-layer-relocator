import { Router } from 'express';
import transferVectorLayer from './controllers/transfer';

const router = Router();

router.post('/transfer', transferVectorLayer);

export default router;
