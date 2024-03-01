const express = require('express')
const path = require('path')

const app = express()
// setup static and middleware
app.use(express.static('./public')) // this will serve all the files in the public folder

// app.get('/',(req,res)=>{
//     res.status(200).sendFile(path.resolve(__dirname,'./navbar-app/index.html'))
// })

app.all('*',(req,res)=>{    
    res.status(404).send('Resource not found')
})

app.listen(5000,()=>{
    console.log('server listening on port 5000')
});