import { Router } from 'express';
import { authorization } from '../utils/utils.js';
import { MBeautyLogger } from '../utils/logger.js';

const router = Router();

router.get('/loggerTest', authorization(['admin']), (req, res) => {
    MBeautyLogger('debug', 'Debug test log');
    MBeautyLogger('http', 'Http test log');
    MBeautyLogger('info', 'Info test log');
    MBeautyLogger('warning', 'Warning test log');
    MBeautyLogger('error', 'Error test log');
    MBeautyLogger('fatal', 'Fatal test log');
    res.send('MarcelaBeautys logger test');
});

export default router;