import { opendir, writeFile, readFile } from 'fs/promises';
import path from "path";
import {v1} from "uuid";
import { throws } from 'assert';


/** 
  *    readDataFromJsonFile
  *    @params data -> obj, path -> where to save
  *    @return  savedPath
  */

export async function jsonToObj(path){
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

/** 
  *    write obj data to json file  
  *    @params data -> obj, path -> where to save
  *    @return  savedPath
  */

export async function objToJSON(data, path){
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


/** 
  * convert directory map  child -> prent into directed graph data in JSON format
  *    for more info check network-graph-json-format.md
  *    @params <map> child : parent
  *    @return  {nodes: nodes, edges: edges} 
  */

export async function genNGjSON(tree, visType){
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
                group: 1
            })
            visted.add(v)
        }
    
        if (!visted.has(k)){
            const cID = v1()
            uniqueNodeID.set(k,cID)
            nodes.push({
                [nodeName]: k,
                id: cID,
                group: 2
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

/** 
  * insert node into proper level at deeply nested tree
  *    @params  uniqueNodeID, nestedTree map<k,v>, parentID, childID
  *    @return  nestedTree with child inserted in parent level
  */

function cleanName(nodeName){
    return nodeName.includes("F:") ? nodeName.replace("F:", "") : nodeName.replace("D:", "")
}

function getIcon(nodeName){
    return nodeName.includes("D:") ? "./data/folder.png" : "./data/file.png";
}

async function insertNodeDeepNestedTree(nestedTree, parentID, childID, parentName, childName){

    if (nestedTree.id == undefined){
        nestedTree = {
            name: cleanName(parentName),
            id: parentID,
            icon: getIcon(parentName),
            childreen: [
                {name: cleanName(childName), id: childID}
            ]
        }
        return nestedTree
    } 
    
    else if (nestedTree.id === parentID){
        nestedTree.childreen.push(
            {name: cleanName(childName), id: childID, icon: getIcon(childName)}
        )
    } 

    const walkObject = function (childreen){
        for (let i = 0;  i < childreen.length; i++){
            let ancestor = childreen[i];
            if (ancestor.id === parentID) {
                if (ancestor.childreen == undefined){
                    ancestor.childreen = []
                }
                ancestor.childreen.push(
                        {name: cleanName(childName), id:childID, icon: getIcon(childName)}
                    )
                    return nestedTree
    
            } 
            if(ancestor.childreen != undefined){
                walkObject(ancestor.childreen)
            } else {
                continue;
            }
    
        }
    }

    let childreen = nestedTree.childreen;
    walkObject(childreen);


    return await nestedTree
    
}

/** 
* convert directory map  child -> prent into tree graph data in JSON format
*    for more info check network-graph-json-format.md
*    @params <map> child : parent
*    @return  {parent: {name : text, children: [ {name : text, children : [ ... ] } ]  }}
*/

export async function genTreeGraph(tree){
    const visted = new Set();
    const uniqueNodeID = new Map();
    let nestedTree = {}
    let output = {};
    for (const [c, p] of tree){ 

        if (!visted.has(p)){ 
            const pID = v1()
            uniqueNodeID.set(p, pID)
            visted.add(p)
        } 
    
        if (!visted.has(c)){
            const cID = v1()
            uniqueNodeID.set(c,cID)
            visted.add(c)
        }

        let nestCall = await insertNodeDeepNestedTree(
            
            nestedTree, 
            uniqueNodeID.get(p),
            uniqueNodeID.get(c),
            p, 
            c
        );
        output = await Object.assign(nestedTree, nestCall)

    }

    return output;
}

/** 
*   Walk through a directory recursively, assign D: to directory, F: to file, recieve file, empty map
*    @params /dir/path/ in unix/linx
*    @return map child -> parent
*/

export async function getDirectoryTree(dir){

    const tree = new Map();

    async function walkDir(dir){

        for await (const dirent of await opendir(dir)){

            if ( dirent.isDirectory() ){

                let walk = path.join(dir, dirent.name)
                tree.set(`D:${dirent.name}`, `D:${path.parse(dir).base}`)
                await walkDir(walk)
            } else if (dirent.isFile()) {

                tree.set(`F:${dirent.name}`, `D:${path.parse(dir).base}`)

            }
    
        }
           
    }

    await walkDir(dir)
    return tree
}
