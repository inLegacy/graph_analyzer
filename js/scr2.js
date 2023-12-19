const graph1 = {

	'vertices':['A','B','C','D','E'],
	'edges':[
		
		{'u':'A','v':'B','w':6},
		{'u':'A','v':'D','w':1},
		{'u':'B','v':'A','w':6},
		{'u':'B','v':'C','w':5},
		{'u':'B','v':'D','w':2},
		{'u':'B','v':'E','w':2},
		{'u':'C','v':'B','w':5},
		{'u':'C','v':'E','w':5},
		{'u':'D','v':'A','w':1},
		{'u':'D','v':'B','w':2},
		{'u':'D','v':'E','w':1},
		{'u':'E','v':'B','w':2},
		{'u':'E','v':'C','w':5},
		{'u':'E','v':'D','w':1}
	]
}

const graph2 = {

	'vertices':['X','Y','T','S'],
	'edges':[
		
		{'u':'Y','v':'X','w':5},
		{'u':'X','v':'S','w':3},
		{'u':'S','v':'X','w':2},
		{'u':'Y','v':'S','w':1},
		{'u':'Y','v':'T','w':7},
		{'u':'T','v':'Y','w':6},
		{'u':'T','v':'S','w':8},
		{'u':'S','v':'T','w':4}
	]
}

const graph3 = {

	"vertices":["A", "B", "C", "D", "E"],
	"edges":[
		
		{"u":"A","v":"B","w":1},
		{"u":"B","v":"D","w":1},
		{"u":"C","v":"D","w":1},
		{"u":"D","v":"E","w":1}
	]
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//this graph model is for shortest path section

class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    changeWeight(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    dijkstra(source) {
        let distances = {},
            parents = {},
            visited = new Set();
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === source) {
                distances[source] = 0;
            } else {
                distances[this.vertices[i]] = Infinity;
            }
            parents[this.vertices[i]] = null;
        }
        
        let currVertex = this.vertexWithMinDistance(distances, visited);

        while (currVertex !== null) {
            let distance = distances[currVertex],
                neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                if (distances[neighbor] > newDistance) {
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currVertex;
                }
            }
            visited.add(currVertex);
            currVertex = this.vertexWithMinDistance(distances, visited);
        }

        const results = {
        
            "vertex":source,
            "parents":parents,
            "distances":distances
        }
        
        return results;
    }

    vertexWithMinDistance(distances, visited) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited.has(vertex)) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


//this graph model is for topological sort section

class Graph2 {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
    }
}





//This helper function will assign topological number to a given vertex.

function dfsTopSortHelper(v, n, visited, topNums, function_graph) {

    visited[v] = true;
    let neighbors = null;
    
    neighbors = function_graph.adjacencyList[v];
    
    for (const neighbor of neighbors) {
        if (!visited[neighbor]) {
            n = dfsTopSortHelper(neighbor, n, visited, topNums, function_graph);
        }
    }
    topNums[v] = n;
    return n - 1;
}




//Finally, a driver function to trigger topological sorting.

function dfsTopSort(function_graph) {
    
    const vertices = Object.keys(function_graph.adjacencyList);
    const visited = {};
    const topNums = {};
    let n = vertices.length - 1;
    for (const v of vertices) {
        if (!visited[v]) {
            n = dfsTopSortHelper(v, n, visited, topNums, function_graph)
        }
    }
    return topNums;
}



const initial_function_graph = function() {
    const g3 = new Graph2();   
    ["A", "B", "C", "D", "E"].forEach((v) => g3.addVertex(v));
    g3.addEdge("A", "B");
    g3.addEdge("A", "C");
    g3.addEdge("B", "D");
    g3.addEdge("C", "D");
    g3.addEdge("D", "E");
    return g3;
}();


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



