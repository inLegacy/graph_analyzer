//globals

const map1img = document.getElementById("map1img");
const map2img = document.getElementById("map2img");
const upload_sect = document.getElementById("upload_sect");

const graph_name = document.querySelectorAll(".graph_name");

const out_div1 = document.getElementById("out_div1");
const out_div2 = document.getElementById("out_div2");

function start(){
              
        change_selected(1);
}

function generate(opt){

    let results = [];
    const g = new Graph();

    if(opt === 1){
    
        // add the vertices
        graph1.vertices.forEach(
	        (v) => g.addVertex(v)
        );

        // add the edges
        graph1.edges.forEach(
	        (e) => g.addEdge(e.u,e.v,e.w)
        );
        
        // run dijkstra's algorithm, with A as the source vertex.
        graph1.vertices.forEach(   
            (v) => results[v] = g.dijkstra(v)
        );  
    }else if(opt === 2){
    
        // add the vertices
        graph2.vertices.forEach(
	        (v) => g.addVertex(v)
        );

        // add the edges
        graph2.edges.forEach(
	        (e) => g.addEdge(e.u,e.v,e.w)
        );
        
        // run dijkstra's algorithm, with A as the source vertex.
        graph2.vertices.forEach(   
            (v) => results[v] = g.dijkstra(v)
        ); 
    }
    
    return results;
}

function render(results){

    console.log(results);

    const keyz = Object.keys(results);
    const keyz3 = Object.keys(results);
    
    const row = document.createElement("tr");
    
    const out = document.createElement("table");
    out.style.border = "1px solid";
    
    const out2 = document.createElement("table");
    out2.style.border = "1px solid";
    
    const h = document.createElement("th");
    h.style.padding = "20px";
    h.innerText = "";
                
    row.appendChild(h);
    
    
    
    const row2 = document.createElement("tr");
    
    const h2 = document.createElement("th");
    h2.style.padding = "20px";
    h2.innerText = "";
                
    row2.appendChild(h2);
    
    keyz.forEach(
        
        (k) => {
        
                const h = document.createElement("th");
                h.style.padding = "20px";
                h.style.borderBottom = "1px solid";
                h.style.borderRight = "1px solid";
                h.innerText = k;
                
                row.appendChild(h);
                
                const h2 = document.createElement("th");
                h2.style.padding = "20px";
                h2.style.borderBottom = "1px solid";
                h2.style.borderRight = "1px solid";
                h2.innerText = k;
                
                row2.appendChild(h2);
                
        }
    );
    
    out.appendChild(row);
    out2.appendChild(row2);
    
    keyz.forEach(
        
        (k) => {
        
                const row = document.createElement("tr");
                const row2 = document.createElement("tr");
                const keyz2 = Object.keys(results[k].distances);
                    
                const th = document.createElement("th");
                th.style.padding = "20px";
                th.style.borderBottom = "1px solid";
                th.style.borderRight = "1px solid";
                th.innerText = k ;
                row.appendChild(th);
                
                const th2 = document.createElement("th");
                th2.style.padding = "20px";
                th2.style.borderBottom = "1px solid";
                th2.style.borderRight = "1px solid";
                th2.innerText = k ;
                row2.appendChild(th2);
                
                keyz2.forEach(
                    (k2) => {
                        
                        const td = document.createElement("td");
                        td.style.padding = "20px";
                        td.style.borderBottom = "1px solid";
                        td.style.borderRight = "1px solid";
                        td.innerText = results[k].distances[k2];
                        row.appendChild(td);
                        
                        const td2 = document.createElement("td");
                        td2.style.padding = "20px";
                        td2.style.borderBottom = "1px solid";
                        td2.style.borderRight = "1px solid";
                        
                        td2.innerText = results[k].parents[k2];
                        
                        row2.appendChild(td2);
                                        
                    }
                );
                
                out.appendChild(row);
                
                out_div1.appendChild(out);
                
                out2.appendChild(row2);
                
                out_div2.appendChild(out2);
        }
    );
}

function change_selected(opt){
        
    out_div1.innerHTML = "";
    out_div2.innerHTML = "";

    if(opt === 1){
    
        graph_name[0].innerText = "graph1";
        graph_name[1].innerText = "graph1";
    
        map1img.setAttribute("style", "border:5px solid Gold;height:200px;width:300px;cursor:pointer;"); 
        map2img.setAttribute("style", "border:none;height:200px;width:400px;cursor:pointer;");
        upload_sect.setAttribute("style", "border:none;height:200px;width:400px;cursor:pointer;");
              
        render(generate(1));
    }else if(opt === 2){
    
        graph_name[0].innerText = "graph2";
        graph_name[1].innerText = "graph2";
    
        map2img.setAttribute("style", "border:5px solid Gold;height:200px;width:400px;cursor:pointer;") ; 
        map1img.setAttribute("style", "border:none;height:200px;width:300px;cursor:pointer;");
        upload_sect.setAttribute("style", "border:none;height:200px;width:400px;cursor:pointer;");
              
        render(generate(2));
    }
}

async function readText(event) {

  map1img.setAttribute("style", "border:none;height:200px;width:400px;cursor:pointer;"); 
  map2img.setAttribute("style", "border:none;height:200px;width:400px;cursor:pointer;");
  upload_sect.setAttribute("style", "border:5px solid Gold;height:200px;width:300px;cursor:pointer;");

  const file = event.target.files.item(0);
  const text = await file.text();
  let custom_graph = null;
  
    try {
    
        custom_graph = JSON.parse(text);
        
        if(Array.isArray(custom_graph.vertices) && Array.isArray(custom_graph.edges)){
  
            document.getElementById("output").innerText = "your custom graph has been uploaded";
    
            out_div1.innerHTML = "";
            out_div2.innerHTML = "";
    
            graph_name[0].innerText = "custom graph";
            graph_name[1].innerText = "custom graph";
            
            let custom_results = [];
            const custom_g = new Graph();
    
            // add the vertices
            custom_graph.vertices.forEach(
	            (v) => custom_g.addVertex(v)
            );

            // add the edges
            custom_graph.edges.forEach(
	            (e) => custom_g.addEdge(e.u,e.v,e.w)
            );
        
            // run dijkstra's algorithm, with A as the source vertex.
            custom_graph.vertices.forEach(   
                (v) => custom_results[v] = custom_g.dijkstra(v)
            );  
    
            render(custom_results);
        }else{
  
            document.getElementById("output").innerText = "the custom graph format is wrong, try again";
        }
        
    }catch (e) {
        
        document.getElementById("output").innerText = "the file is not a JSON, try again";
    }
}

start();
