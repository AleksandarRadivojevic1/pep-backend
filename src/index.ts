import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express ()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))



const port = 4000

app.listen(port, ()=>{
    console.log("App started and listening on " + port)
})


app.get('/', (req , res) => {
    res.json({
        message: "Hello world from ExpressJs and Typescript!"
    })
})

app.get('*', (req , res) => {
    res.status(404).json({
        message: "Not found!"
    })
})