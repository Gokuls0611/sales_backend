import {Router} from "express";
import authRoutes from "./auth/routes"
import productRoutes from "./products/routes"

const router: Router = Router();

router.use("/auth", authRoutes)
router.use("/products",productRoutes)


export default router;

