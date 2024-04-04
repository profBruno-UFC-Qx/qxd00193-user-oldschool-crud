import { Router } from "express";
import UserService from "../services/userService";
import { 
  getUsers, 
  addUserForm, 
  addUser,
  getUser,
  updateUser,
  deleteUser 
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.get("/add", addUserForm)
userRouter.post("/", addUser)
userRouter.get("/:id", getUser)
userRouter.post("/:id", );
userRouter.get("/remove/:id", deleteUser);

export default userRouter;
