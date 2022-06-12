import {getDirectoryTree, objToJSON, jsonToObj, genNGjSON3d, genNGjSONVisJS } from "../utils/utils";
import assert from 'node:assert/strict';
import {stat} from "fs";


const dir = 'C:/Projects/saudi-eye-poc/'
const savedDataFilePath3D = "./public/data/networkGraph3d.json"
const savedDataFilePathVisjs = "./public/data/networkGraphVisjs.json"

test("takes folder link and output json in specific format for 3dJS", async () => {
    const tree = await getDirectoryTree(dir);
    const data = await genNGjSON3d(tree);
    const outputFile = await objToJSON(data, savedDataFilePath3D)
    console.log(outputFile)
    stat(outputFile, (err, stats) => {
        assert.deepEqual(stats.isFile(), true)
    })
       
})


test("takes folder link and output json in specific format for visJS", async () => {
    const tree = await getDirectoryTree(dir);
    const data = await genNGjSONVisJS(tree);
    const outputFile = await objToJSON(data, savedDataFilePathVisjs)
    console.log(outputFile)
    stat(outputFile, (err, stats) => {
        assert.deepEqual(stats.isFile(), true)
    })
       
})

test("check network graph follow specific format for vis.js", async () => {
    const data = await genNGjSONVisJS(savedDataFilePathVisjs)
    const [nodes, edges] = data
    assert.deepEqual(typeof nodes, 'object' )
    assert.deepEqual(typeof edges, 'object' )
    assert.deepEqual(Object.keys(edges[0]), ['from', 'to'])
    assert.deepEqual(Object.keys(nodes[0]), ['label', 'id', 'group'])

       
})

test("check network graph follow specific format for 3dJS", async () => {
    const data = await genNGjSON3d(savedDataFilePath3D)
    const {nodes, links} = data
    assert.deepEqual(typeof nodes, 'object' )
    assert.deepEqual(typeof links, 'object' )
    assert.deepEqual(Object.keys(links[0]), ['source', 'target'])
    assert.deepEqual(Object.keys(nodes[0]), ['title', 'id', 'group'])

       
})
