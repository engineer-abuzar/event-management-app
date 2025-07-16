import { Router } from "express"
import { createEvent,eventDetails,eventStats,upcomingEvents} from "../controller/controllerCenter.js"
//creating the router object
const eventRouter=Router()

//routes

eventRouter.get('/upcomingEvents',upcomingEvents)

eventRouter.get('/eventDetails',eventDetails)

eventRouter.post('/createEvent',createEvent)

eventRouter.post('/eventStats',eventStats)


export default eventRouter;