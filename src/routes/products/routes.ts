import {authenticate} from "../../middleware";
import * as c from "./controller";
import {Router} from "express";

const router: Router = Router()

router.post('/create',authenticate, c.createProduct);
router.delete('/:id', authenticate, c.deleteProduct);
router.get('/', c.getAllProducts);
router.get('/dashboard',authenticate,c.getAllProductsData)
router.get('/dashboard/:date',authenticate,c.getProductsSalesInDate)
router.put('/update/:id',authenticate, c.updateProduct)
//router.get('/add',c.BulkProduct)

export default router
