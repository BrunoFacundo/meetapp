import { Router } from 'express';
import multer from 'multer';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SessionController from './app/controllers/SessionController';
import SubscriptionController from './app/controllers/SubscriptionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import validateFileStore from './app/validators/FileStore';
import validateMeetupDelete from './app/validators/MeetupDelete';
import validateMeetupIndex from './app/validators/MeetupIndex';
import validateMeetupStore from './app/validators/MeetupStore';
import validateMeetupUpdate from './app/validators/MeetupUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateSubscriptionDelete from './app/validators/SubscriptionDelete';
import validateSubscriptionStore from './app/validators/SubscriptionStore';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.send('Meetapp - Api'));

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), validateFileStore, FileController.store);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/meetups', validateMeetupIndex, MeetupController.index);
routes.post('/meetups', validateMeetupStore, MeetupController.store);
routes.put('/meetups/:id', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:id', validateMeetupDelete, MeetupController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/meetups/:meetupId/subscriptions', validateSubscriptionStore, SubscriptionController.store);
routes.delete('/meetups/:meetupId/unsubscriptions', validateSubscriptionDelete, SubscriptionController.delete);

routes.get('/organizing', OrganizingController.index);

export default routes;
