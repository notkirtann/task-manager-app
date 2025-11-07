import express from 'express'
import * as controllers from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router()

router.post("/signup", controllers.createUser);

router.post("/login", controllers.loginUser)

router.get("/admin", auth, controllers.getMyUsers);

router.get("/:id", auth, controllers.getUserById);

router.patch("/:id", auth, controllers.updateUserById);

router.delete("/:id", auth, controllers.deleteUser);

export default router;