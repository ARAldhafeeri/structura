import { opendir, writeFile, readFile } from 'fs/promises';
import path from "path";
import {v1} from "uuid";
import { throws } from 'assert';


export async function jsonToObj(path){
    /*
        recieve json file, return obj data
    */
    let data;
    try {
        data = await readFile(path)
    } catch (err){
        throws(
            () => {
                throw err;
            }
        )
    }
    return JSON.parse(data)
}


export async function objToJSON(data, path){
    /*
        recieve data, path as graphName.json and trasform data into JSON format
        in public/data directory
    */
    try {
        await writeFile(path, JSON.stringify(data))
    } catch (err){
        throws(
            () => {
                throw err;
            }
        )
    }
    return path
}



export async function genNGjSON(tree, visType){
    /*
        convert directory map into network JSON format
        for more info check network-graph-json-format.md
    */
    const visted = new Set();
    const uniqueNodeID = new Map();
    const nodes = [];
    const edges = [];
    const nodeName = visType === "visJS" ? "label" : "title";
    const edgeLinkOne =  visType === "visJS" ? "from" : "source";
    const edgeLinkTwo =  visType === "visJS" ? "to" : "target";
    for (const [k, v] of tree){
        if (!visted.has(v)){
            const pID = v1()
            uniqueNodeID.set(v, pID)
            nodes.push({
                [nodeName]: v,
                id: pID,
                group: "directory"
            })
            visted.add(v)
        } 
    
        if (!visted.has(k)){
            const cID = v1()
            uniqueNodeID.set(k,cID)
            nodes.push({
                [nodeName]: k,
                id: cID,
                group: "file"
            })
            visted.add(k)
        }
        edges.push(
            {
                [edgeLinkOne]: uniqueNodeID.get(v) ,
                [edgeLinkTwo]: uniqueNodeID.get(k)
            }
        )
    }

    return await {nodes: nodes, edges: edges}
}

export async function getDirectoryTree(dir){
    /*
        Walk through a directory recursively, assign D: to directory, F: to file, recieve file, empty map
    */
    const tree = new Map();

    async function walkDir(dir){
        for await (const dirent of await opendir(dir)){
            if ( dirent.isDirectory()  ){

                let walk = path.join(dir, dirent.name)
                await walkDir(walk)
                tree.set(dirent.name, path.parse(dir).base)
            } else if (dirent.isFile()) {

                // console.log(path.parse(dir))
                tree.set(dirent.name, path.parse(dir).base)

            }
    
        }
           
    }
    await walkDir(dir)
    return tree
}
