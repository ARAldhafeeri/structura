# structura
A tool which generate graph represnetation of the codebase given a directory path to help Software Engineers to perform analysis on large codebases. The visulization algorithm is fastest for the use case. 

# quick demo " visulizing a side project " :
https://www.linkedin.com/feed/update/urn:li:activity:6946278434406834176/

# motivation :
As software getting more larger and more complex, the challenge of debugging code and perform analysis on it becomes harder. This tool currently only visulize the **folder tree** in the near future, I have plans to visulize the following piority is visulizing imports first:
     - You can visulize very large number of nodes, edges, trees depth.

# run locally 
- install nodeJS
    https://nodejs.dev/
- install dependencies in root directory of the project
  -   ```Bash
          npm install
      ```
# visulize your source code:
  - delete networkGraph.json
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
      - go to localhost:3000/tree.html
      - Enjoy :)
 
