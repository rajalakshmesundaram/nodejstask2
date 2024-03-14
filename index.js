import express from 'express'
import useRout from './Router/userget.js'
import cors from 'cors'
const app=express()
const port=4803;
app.use(cors())
app.use(express.json())
app.use("/userapi", useRout);


app.get('/',(req,res)=>{
    res.status(200).send("API is working")
    })
    

app.listen(port,()=>{
    console.log("app is runnning on the port",port);
})
