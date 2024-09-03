import express from "express";
import userController from "../controllers/userController";
const router = express.Router();

router.post("/", userController.createUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.getUser);

export default router;
