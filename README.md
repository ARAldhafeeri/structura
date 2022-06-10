# structura
A tool which generate network graph given a directory path to help Software Engineers to perform analysis on large codebases. The visulization is decently fast. 

# quick demo " visulizing a side project " :
  

# motivation :
As software getting more larger and more complex, the challenge of debugging code and perform analysis on it becomes harder. This tool currently only visulize the **folder tree** in the near future, I have plans to visulize the following piority is visulizing imports first:
     - support to visulize very very large codebase " currently, getting the network graph is very fast, but currently, can not visulize large codebase "
     - tip delete all node_modules
     - imports
     - classes, function invoke
     - do not know yet what else ... :)

# run locally 
- install nodeJS
    https://nodejs.dev/
- install dependencies in root directory of the project
  -   ```Bash
          npm install
      ```
# visulize your source code:
  - in /tests/network.graph.test , change the following
    -  ```JavaScript
          // ... imports
            const dir = "path-to-directory-you-want-to-visulize"
            const savedDataFilePath = "do-not-change"
          // .. tests
       ```
  - run tests " will run test and generate networkGraph.json, which is your directory network graph data ":
    - npm test 
  - start server and view visulization: 
      - npm start
      - go to localhost:3000/index.html
      - Enjoy :)

important note: **this tool does not support very very very large codebase yet, so run at your own responsiblity**
