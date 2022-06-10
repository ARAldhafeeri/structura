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

/*
export async function genNGjSON(tree){
        let NODES = new Set();
        const visted = new Set();
        const uniqeParent = new Map();
        const childParentID = new Map();
        const UniqueNodes = [];
        const LINKS = [];
        for (const [k, v] of tree){
            let parentID = v1()
            if(!visted.has(v)){
                uniqeParent.set(v, parentID)
                UniqueNodes.push({
                    label: v,
                    id: parentID
                })
      
                childParentID.set(k, parentID)
            } else {
                childParentID.set(k, uniqeParent.get(v))
            }
            visted.add(v)
        }
    
        for (const [k, v] of tree){
            let childID = v1()
            UniqueNodes.push({
                label: k,
                id: childID
            })
            LINKS.push(
                {
                    from: childParentID.get(k),
                    to: childID
                }
            )
       }
       NODES = Array.from(NODES)
        return await [
            UniqueNodes, 
            LINKS
       ]
    }

*/
export async function genNGjSON(tree){
    /*
        convert directory map into network JSON format
        for more info check network-graph-json-format.md
    */


    const visted = new Set();
    const uniqueNodeID = new Map();
    const nodes = [];
    const edges = [];
    for (const [k, v] of tree){
        if (!visted.has(v)){
            const pID = v1()
            uniqueNodeID.set(v, pID)
            nodes.push({
                label: v,
                id: pID
            })
            visted.add(v)
        } 
    
        if (!visted.has(k)){
            const cID = v1()
            uniqueNodeID.set(k,cID)
            nodes.push({
                label: k,
                id: cID
            })
            visted.add(k)
        }
        edges.push(
            {
                from: uniqueNodeID.get(v) ,
                to: uniqueNodeID.get(k)
            }
        )
    }

    return await [nodes, edges]
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
                tree.set(`D:${dirent.name}`,`D:${path.parse(dir).base}`)
            } else if (dirent.isFile()) {

                // console.log(path.parse(dir))
                tree.set(`F:${dirent.name}`,`D:${path.parse(dir).base}`)

            }
    
        }
           
    }
    await walkDir(dir)
    return tree
}
