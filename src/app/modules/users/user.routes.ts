import { express } from 'express';
const router = express.Router()
router.post('/create-student',userControllers.createStudent)
export const UserRoutes = router;