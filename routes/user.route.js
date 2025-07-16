import { Router } from "express"
import { cancelRegistration, registerEvent } from "../controller/controllerCenter.js";

const userRouter=Router()
userRouter.post('/registerEvent',registerEvent)
userRouter.delete('/cancelRegistration',cancelRegistration)
export default userRouter;