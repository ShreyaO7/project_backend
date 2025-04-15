const express = require('express')
const app = express()
const isLoggedin = require('./Middleware/isLoggedin.js');

const Authrouter = require('./router/authRouter.js');
const Productrouter = require('./router/productRouter.js');
require('./lib/dbConnect.js')
require('dotenv').config()
const port = process.env.PORT||3000
var cors = require('cors')
app.use(express.json())

app.use(cors())
app.use("/auth",Authrouter)
app.use("/product",isLoggedin,Productrouter)


app.get('/',isLoggedin,(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})