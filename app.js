import { jsonToObj } from "./utils/utils.js";
import express from "express";
import path from "path"

const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/ng', async (req, res) => {
    const savedDataFilePath = "./public/data/networkGraph.json"
    const data = await jsonToObj(savedDataFilePath)
    res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
