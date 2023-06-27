import { Router } from 'express';
import transferVectorLayer from './controllers/transfer';
import { wrapRoute } from './utils';

const router = Router();

router.post('/transfer', transferVectorLayer);

export default router;
