## The follwing project uses vis to output graph in simple html pages.
   -   https://visjs.org/ 
   - below format of data for each graph 

- labeled nodes network graph visjs

      ```JSON
            [
                [
                    {
                      "name": "node 1",
                      "id": "unique_id_1",
                    },
                    {
                      "name": "node 2",
                      # ...
                    }
              ],
              [
                    {
                      "from": "unique_id_1",
                      "to": "unique_id_2"
                    },
                    {
                      # ...
                    }
              ]
            ]
      ```

- labeled nodes network graph 3d

      ```JSON
            {
                "nodes": [
                    {
                      "title": "node 1",
                      "id": "unique_id_1",
                    },
                    {
                      "title": "node 2",
                      # ...
                    }
              ],
              "links": [
                    {
                      "source": "unique_id_1",
                      "target": "unique_id_2"
                    },
                    {
                      # ...
                    }
              ]
            }
      ```

- labeled nodes network graph 3d

      ```JSON
            {
                "name": "Top Level",
                "id": "uuid.v4()"
                "children": [
                  { 
                    "name": "Level 2: A",
                    "id": "uuid.v4()",
                    "children": [
                      { "name": "Son of A" },
                      { "name": "Daughter of A" }
                    ]
                  },
                  { 
                    "name": "Level 2: B", 
                    "id": "uuid.v4()",
                  }
                ]
              };
      ```