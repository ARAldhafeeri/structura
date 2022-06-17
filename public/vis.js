var width = 50000,
height = 50000; 

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		.force('charge', d3.forceManyBody()
      .strength(-400)
      .distanceMax(1000)
      .distanceMin(100)
    )
    .force('collide', d3.forceCollide())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("./data/networkGraph3d.json",function(graph){ 
  var color = d3.scaleOrdinal(d3.schemeTableau10);
  function run(graph) {
  
    var link = svg.append("g")
                  .style("stroke", "#aaa")
                  .selectAll("line")
                  .data(graph.edges)
                  .enter().append("line")
                  .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
  
    var node = svg.append("g")
              .attr("class", "nodes")
    .selectAll("circle")
              .data(graph.nodes)
    .enter().append("circle")
            .attr("r", 5)
            .attr("fill", function(d) { return color(d.group); })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));


    var label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
          .attr("class", "label")
          .text(function(d) { return d.title; });
    
        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);
    
        simulation.force("link")
            .links(graph.edges);
    
        function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    
        node
            .attr("r", 16)
            .style("stroke", "#424242")
            .style("stroke-width", "1px")
            .attr("cx", function (d) { return d.x+5; })
            .attr("cy", function(d) { return d.y-3; });
        
        label
                .attr("x", function(d) { return d.x; })
                .attr("y", function (d) { return d.y; })
                .style("font-size", "10px").style("fill", "#333");
        }
    }
    
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
    //  simulation.fix(d);
    }
    
    function dragged(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
    //  simulation.fix(d, d3.event.x, d3.event.y);
    }
    
    function dragended(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
        if (!d3.event.active) simulation.alphaTarget(0);
        //simulation.unfix(d);
    }
        
    run(graph)
    alert(`no. of nodes ${graph.nodes.length} |-| no. of edges ${graph.edges.length}`)
  
})