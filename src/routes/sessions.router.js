import { Router } from 'express';
import { passportCall } from '../utils/utils.js';
import cookieParser from 'cookie-parser';
import sessionController from '../controllers/sessions.controller.js';
import EnumErrors from '../utils/errorHandler/enum.js';
import CustomError from '../utils/errorHandler/customError.js';
import { validateResetPasswordToken } from '../config/middlewares.config.js';
import { authorization } from '../utils/utils.js';

const router = Router();

router.use(cookieParser(process.env.AUTH_SECRET));

router.post('/register', passportCall('register'), sessionController.register);

router.post('/login', passportCall('login', { session: false }), sessionController.login);

router.post('/resetpasswordrequest', sessionController.resetpasswordrequest);

router.get('/resetpasswordvalidation/:token', validateResetPasswordToken(true), (req, res) => {
    res.redirect(`/resetpassword/${req.params.token}`);
});

router.put('/resetpassword/:token', validateResetPasswordToken(true), passportCall('resetPassword'), sessionController.resetPassword);

router.post('/logout', sessionController.logout);

router.get('/github', passportCall('github', { scope: ['user:email'] }), sessionController.github);

router.get('/githubcallback', passportCall('github'), sessionController.githubCallback);

router.get('/currentuser', passportCall('jwt', { session: false }), sessionController.currentUser);

router.put('/premium/:email', authorization('admin'), sessionController.togglePremiumFeature);

//handler for invalid routes
router.all('*', (req, res) => {
    CustomError.createError({
        name: 'Routing Error',
        message: 'Invalid route',
        type: EnumErrors.ROUTING_ERROR.type,
        recievedParams: { route: req.originalUrl },
        statusCode: EnumErrors.ROUTING_ERROR.statusCode
    });    
});

export default router;