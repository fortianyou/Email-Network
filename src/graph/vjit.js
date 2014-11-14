/**
 * Define the main netseer visualization object
 * This object will hold most relevant objects, such as drawing context, layout, graph/node/edge renderer, etc
 * @type {Function}
 */

netseer.GraphVjit = GraphVjit;

function GraphVjit() {
    this._data_mappings = {};
};

GraphVjit.prototype.createSVGContext = function (upperContext, containerId, width, height) {
    this._context = upperContext.select(containerId).append("svg").attr("width", width).attr("height",
        height);
    return this._context;
}

GraphVjit.prototype.createGraphicsContext = GraphVjit.prototype.createSVGContext;

GraphVjit.prototype.render = function () {
    if (this._graphRender) {
        this._graphRender.render();
    }
}

GraphVjit.prototype.getContext = function () {
    return this._context;
};

GraphVjit.prototype.addDataMapping = function (vis_channel, data_dimension) {
    this._data_mappings[vis_channel] = data_dimension;
};

GraphVjit.prototype.getDataMapping = function (vis_channel) {
    return this._data_mappings[vis_channel];
};

GraphVjit.prototype.setData = function (data) {
    this._data = data;
};

GraphVjit.prototype.getData = function () {
    return this._data;
};

GraphVjit.prototype.setNodeRender = function (render) {
    this._nodeRender = render;
};

GraphVjit.prototype.setEdgeRender = function (render) {
    this._edgeRender = render;
};

GraphVjit.prototype.setGraphRender = function (render) {
    this._graphRender = render;
};

GraphVjit.prototype.registerLayout = function (layout) {
    this._layout = layout;
}

GraphVjit.prototype.getLayout = function () {
    return this._layout;
}

GraphVjit.prototype.computeLayout = function () {

    // compute layout
    var data = this.getData();
    this._layout.nodes(data[GraphDescriptor.DATA_NODE_LIST]).links(data[GraphDescriptor.DATA_EDGE_LIST]).start();

    var nodeRender = this._nodeRender;
    var edgeRender = this._edgeRender;
    // init animation/transition
    this._layout.on("tick", function() {
        edgeRender.setEdgeAttribute("x1", function(d) {
            return d.source.x;
        });
        edgeRender.setEdgeAttribute("y1", function(d) {
                return d.source.y;
            });
        edgeRender.setEdgeAttribute("x2", function(d) {
                return d.target.x;
            });
        edgeRender.setEdgeAttribute("y2", function(d) {
                return d.target.y;
            });

        nodeRender.setNodeAttribute("cx", function(d) {
            return d.x;
        });
        nodeRender.setNodeAttribute("cy", function(d) {
            return d.y;
        });
    });
}

GraphVjit.prototype.addInteraction = function(render, interaction){
    render.call(interaction);
}

GraphVjit.prototype.addCallInteraction = function(render, interaction){
    render.call(interaction);
}

GraphVjit.prototype.addOnInteraction = function(render, event, interaction){
    render.on(event,interaction);
}

GraphVjit.prototype.getGraphRender = function () {
    return this._graphRender;
}

GraphVjit.prototype.getNodeRender = function () {
    return this._nodeRender;
}

GraphVjit.prototype.getEdgeRender = function () {
    return this._edgeRender;
}