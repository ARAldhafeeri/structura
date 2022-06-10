# structura
A tool which generate network graph given a directory path to help Software Engineers to perform analysis on large codebases.

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

