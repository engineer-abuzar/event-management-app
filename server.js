import express from 'express'
const app = express()
const port = 3000
import connection from './db.js'
import {eventRouter,userRouter} from './routes/index.js'

//setting the middlewares
app.use(express.urlencoded({extended:true}))

//setting routers path
app.use('/api/event',eventRouter)
app.use('/api/user',userRouter)

//setting home route
app.get('/',(req,res)=>{
  res.send("Home Page")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
