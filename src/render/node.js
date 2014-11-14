/**
 * Define a basic node render using the svg tag <this._shape> to display the nodes
 * @type {Function}
 */

netseer.BasicShapeNodeRender = BasicShapeNodeRender;

function BasicShapeNodeRender(vjit, shape){
    this._vjit = vjit;
    this._shape = shape;
};

BasicShapeNodeRender.prototype.render = function(){

    var context = this._vjit.getContext();
    var data = this._vjit.getData();

    this._nodes = context.selectAll(this._shape + "." + GraphDescriptor.DATA_NODE_CLASS).data(data[GraphDescriptor.DATA_NODE_LIST]).enter().append(this._shape);

    this.updateNodeRender();
}

BasicShapeNodeRender.prototype.updateNodeRender = function(){

    this.setNodeAttribute("class", GraphDescriptor.DATA_NODE_CLASS);
    var mappingDim = this._vjit.getDataMapping(GraphDescriptor.SLOT_NODE_WEIGHT);

    if (mappingDim) {
        this.setNodeAttribute("r", function (d) {
            return mappingDim.getValue(d)+ 0.2*d.count;
        });
    }
    this.setNodeStyle("fill", "blue");

    mappingDim = this._vjit.getDataMapping(GraphDescriptor.SLOT_NODE_BORDER_COLOR);

    if(mappingDim){
        this.setNodeStyle("stroke", function (d) {
            return StaticGraphRender.colorarray[mappingDim.getValue(d)];
        });
    }

    var mappingDim = this._vjit.getDataMapping(GraphDescriptor.SLOT_NODE_LABEL);

    if(mappingDim){
        this.appendNodeAttribute("title", function(d) {
            return "node name: "+mappingDim.getValue(d);
        });
    }

}

BasicShapeNodeRender.prototype.setNodeStyle = function(style, d){
    return this._nodes.style(style, d);
}

BasicShapeNodeRender.prototype.setNodeAttribute = function(attribute, d){
    return this._nodes.attr(attribute, d);
}

BasicShapeNodeRender.prototype.appendNodeAttribute = function(attribute, d){
    this._nodes.append(attribute).text(d);
}

BasicShapeNodeRender.prototype.getNodes = function (){
    return this._nodes;
}


