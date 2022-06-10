import {getDirectoryTree, objToJSON, jsonToObj,  genNGjSON } from "../utils/utils";
import assert from 'node:assert/strict';
import {stat} from "fs";


const dir = 'C:/Projects/delivery_app/'
const savedDataFilePath = "./public/data/networkGraph.json"

test("takes folder link and output json in specific format", async () => {
    const tree = await getDirectoryTree(dir);
    const data = await genNGjSON(tree);
    const outputFile = await objToJSON(data, savedDataFilePath)
    console.log(outputFile)
    stat(outputFile, (err, stats) => {
        assert.deepEqual(stats.isFile(), true)
    })
       
})

test("check network graph follow specific format for vis.js", async () => {
    const data = await jsonToObj(savedDataFilePath)
    const [nodes, edges] = data
    assert.deepEqual(typeof nodes, 'object' )
    assert.deepEqual(typeof edges, 'object' )
    assert.deepEqual(Object.keys(edges[0]), ['from', 'to'])
    assert.deepEqual(Object.keys(nodes[0]), ['label', 'id'])

       
})
