/**
 * This is a simple demo to test the functionality of netseer package over D3
 * @type {number}
 */

// specify vjit size
var vjitWidth = 1400, vjitHeight = 500;
var vjit = new netseer.GraphVjit();
/**
 * The main function to initialize vjit object and do rendering
 * Invoked as the callback function after loading the data
 *
 * @param json  data loaded as the visualization input, in JSON format
 */
function initVjit(json) {
    // sanity check to repair the graph data
    checkGraph(json);

    // create a new GraphVjit object
    

    // create a svg context on the playground of the html, setting the width, height of the context
    vjit.createGraphicsContext(d3, "#chart", vjitWidth, vjitHeight);

    // link data to vjit
    vjit.setData(json);

    // init mappings between data and visualization
    initDataMapping(vjit);

    // set renderer on graph, nodes and edges
    setRender(vjit);

    // do rendering: insert the basic svg shapes to the context
    vjit.render();

    // init layout method
    setLayout(vjit);

    // add interactions
    setInteraction(vjit);
};

/**
 * init the data mapping between the visual channel and the data dimensions
 * @param vjit GraphVjit object in use
 */
function initDataMapping(vjit){

    var DataDimension = netseer.DataDimension;
    var GraphDescriptor = netseer.GraphDescriptor;

    // set the mapping
    vjit.addDataMapping(GraphDescriptor.SLOT_NODE_LABEL, new DataDimension("id", DataDimension.STRING_DIMENSION));
    vjit.addDataMapping(GraphDescriptor.SLOT_NODE_FILL_COLOR, new DataDimension("gender", DataDimension.STRING_DIMENSION));
    vjit.addDataMapping(GraphDescriptor.SLOT_NODE_WEIGHT, new DataDimension(5, DataDimension.CONSTANT_DIMENSION));
    vjit.addDataMapping(GraphDescriptor.SLOT_EDGE_WEIGHT, new DataDimension("count", DataDimension.NUMERIC_DIMENSION));
    vjit.addDataMapping(GraphDescriptor.SLOT_EDGE_LABEL, new DataDimension("count", DataDimension.STRING_DIMENSION));

}

/**
 * Set renderer on graph, nodes and edges
 * @param vjit GraphVjit object in use
 */
function setRender(vjit){
    vjit.setGraphRender(new netseer.StaticGraphRender(vjit));
    vjit.setNodeRender(new netseer.BasicShapeNodeRender(vjit, "circle"));
    vjit.setEdgeRender(new netseer.BasicShapeEdgeRender(vjit, "line"));
}

/**
 * Register the layout object and and execute the layout algorithm
 * @param vjit
 */
function setLayout(vjit){

    // register layout object
    vjit.registerLayout(d3.layout.force().charge(-10).linkDistance(50).size(
        [ vjitWidth, vjitHeight ]));

    // compute layout
    vjit.computeLayout();
}

/**
 * Add interactions to vjit
 * The general inputs for each interaction are the renderer and the interaction function
 * @param vjit
 */
function setInteraction(vjit){
    var graphInteraction = new netseer.GraphInteraction(vjit);
    // vjit.addCallInteraction(vjit.getNodeRender().getNodes(), graphInteraction.nodeDrag());
    vjit.addOnInteraction(vjit.getNodeRender().getNodes(),"mouseover",graphInteraction.nodeMouseOver);
    vjit.addOnInteraction(vjit.getNodeRender().getNodes(),"mouseleave",graphInteraction.nodeMouseLeave);
//     vjit.addOnInteraction(vjit.getPathRender().getPath(),"mouseover",graphInteraction.topicMouseOver);
//     vjit.addOnInteraction(vjit.getPathRender().getPath(),"mouseleave",graphInteraction.topicMouseLeave);

    vjit.addInteraction(vjit.getNodeRender().getNodes(), vjit.getLayout().drag);
}

/**
 * Repair the graph data to use graph.links and graph.edges interchangeably
 * @param graph
 */
function checkGraph(graph){
    if(graph.links && !graph.edges){
        graph.edges = graph.links;
    }
    else if(graph.edges && !graph.links){
        graph.links = graph.edges;
    }
}

// define data URL

//var data = "../data/miserables.json";
var json = "data/email500.json";
// load data and callback vjit initialization function
d3.json(json, initVjit);

