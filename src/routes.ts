import { Router } from 'express';
import transferVectorLayer from './controllers/transfer';
import previewLayer from './controllers/preview';

const router = Router();

router.post('/transfer', transferVectorLayer);
router.post('/preview', previewLayer);

export default router;
