import {authenticate} from "../../middleware";
import * as c from "./controller";
import {Router} from "express";

const router: Router = Router()

router.post('/create',authenticate, c.createUser);
router.get('/', authenticate, c.getAllUsers);
router.post('/login', c.login)
router.put('/update/:id', authenticate, c.updateUser);
router.delete('/:id', authenticate, c.deleteUser);


export default router
