// import { jsonToObj } from "./utils/utils.js";
import fs  from "fs";
import express from "express";

const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/ng', async (req, res) => {
    const savedDataFilePath = "./public/data/networkGraphVisjs.json"
    // slow 
    // const data = await jsonToObj(savedDataFilePath)
    // res.json(data)
    const fileStream = fs.createReadStream(savedDataFilePath, 'utf8');
    fileStream.on('open', () => {
        // read, write data in chuncks !
        fileStream.pipe(res) // push from read stream into write stream
    })

    fileStream.on('error', (err)=> {
        res.end(err)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
