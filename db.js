import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const connection=new Pool({
    user:process.env.db_user,
    password:process.env.db_password,
    host:process.env.db_host,
    database:process.env.db_name
})
connection.connect()
.then(()=>{
    console.log("db connected")
    
}).catch(err=>console.log(err))
export default connection;