const express = require('express')
var cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const mainRouter = require('./src/routes')

const app = express()
const port = 4000

app.use(cors({
  origin: "*",
  method:"*"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/",mainRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })