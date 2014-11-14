/**
 * Define a basic edge render using the svg tag <this._shape> to display the edges
 * @type {Function}
 */

netseer.BasicShapeEdgeRender = BasicShapeEdgeRender;

function BasicShapeEdgeRender(vjit, shape) {
    this._vjit = vjit;
    this._shape = shape;
};

BasicShapeEdgeRender.prototype.render = function () {

    var context = this._vjit.getContext();
    var data = this._vjit.getData();

    this._edges = context.selectAll(this._shape + "." + GraphDescriptor.DATA_EDGE_CLASS).data(data[GraphDescriptor.DATA_EDGE_LIST]).enter().append(this._shape);

    this.updateEdgeRender();
};

BasicShapeEdgeRender.prototype.updateEdgeRender = function () {

    this.setEdgeAttribute("class", GraphDescriptor.DATA_EDGE_CLASS);

    var mappingDim = this._vjit.getDataMapping(GraphDescriptor.SLOT_EDGE_WEIGHT);

    if (mappingDim) {
        this.setEdgeStyle("stroke-width", function (d) {
            return mappingDim.getValue(d);
        });
    }

    mappingDim = this._vjit.getDataMapping(GraphDescriptor.SLOT_EDGE_COLOR);

    if (mappingDim) {
        this.setEdgeStyle("fill", function (d) {
            return StaticGraphRender.colorarray[mappingDim.getValue(d)];
        });
    }

    mappingDim = this._vjit.getDataMapping(GraphDescriptor.SLOT_EDGE_LABEL);

    if(mappingDim){
        this.appendEdgeAttribute("title", function(d) {
            return mappingDim.getValue(d);
        });
    }

};

BasicShapeEdgeRender.prototype.setEdgeStyle = function(style, d){
    this._edges.style(style, d);
}

BasicShapeEdgeRender.prototype.setEdgeAttribute = function(attribute, d){
    this._edges.attr(attribute, d);
}

BasicShapeEdgeRender.prototype.appendEdgeAttribute = function(attribute, d){
    this._edges.append(attribute).text(d);
}
