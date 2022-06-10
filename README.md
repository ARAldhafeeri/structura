# structura
A tool which generate network graph given a directory path to help Software Engineers to perform analysis on large codebases. The visulization is decently fast. 

# quick demo " visulizing a side project " :
 

# motivation :
As software getting more larger and more complex, the challenge of debugging code and perform analysis on it becomes harder. This tool currently only visulize the **folder tree** in the near future, I have plans to visulize the following piority is visulizing imports first:
     - suport extra large codebases, and enhance performance
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
 - tip for larger codebases:
   - disable physics:
     ```HTML
      var options = {
              layout: {
                hierarchical: {
                  direction: "UD",
                  sortMethod: "directed",
                },
              },
              interaction: { dragNodes: false },
              physics: {
                enabled: false,
              },
              configure: {
                filter: function (option, path) {
                  if (path.indexOf("hierarchical") !== -1) {
                    return true;
                  }
                  return false;
                },
                showButton: false,
              },
            };
            var network = new vis.Network(container, data, options);
     ```
