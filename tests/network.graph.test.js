import {getDirectoryTree, objToJSON, genNGjSON } from "../utils/utils";
import assert from 'node:assert/strict';
import {stat} from "fs";


const dir = 'C:/Projects/'
const savedDataFilePath3D = "./public/data/networkGraph3d.json"
const savedDataFilePathVisjs = "./public/data/networkGraphVisjs.json"

test("takes folder link and output json in specific format for 3dJS", async () => {
    const tree = await getDirectoryTree(dir);
    const data = await genNGjSON(tree);
    const outputFile = await objToJSON(data, savedDataFilePath3D)
    stat(outputFile, (err, stats) => {
        assert.deepEqual(stats.isFile(), true)
    })
       
})


test("takes folder link and output json in specific format for visJS", async () => {
    const tree = await getDirectoryTree(dir);
    const data = await genNGjSON(tree);
    const outputFile = await objToJSON(data, savedDataFilePathVisjs)
    stat(outputFile, (err, stats) => {
        assert.deepEqual(stats.isFile(), true)
    })
       
})

test("check network graph follow specific format for vis.js", async () => {
    const data = await genNGjSON(savedDataFilePathVisjs, "visJS")
    const {nodes, edges} = data
    assert.deepEqual(typeof nodes, 'object' )
    assert.deepEqual(typeof edges, 'object' )
    assert.deepEqual(Object.keys(edges[0]), ['from', 'to'])
    assert.deepEqual(Object.keys(nodes[0]), ['label', 'id', 'group'])

       
})

test("check network graph follow specific format for 3dJS", async () => {
    const data = await genNGjSON(savedDataFilePath3D, "3d")
    const {nodes, edges} = data
    assert.deepEqual(typeof nodes, 'object' )
    assert.deepEqual(typeof edges, 'object' )
    assert.deepEqual(Object.keys(edges[0]), ['source', 'target'])
    assert.deepEqual(Object.keys(nodes[0]), ['title', 'id', 'group'])

       
})
