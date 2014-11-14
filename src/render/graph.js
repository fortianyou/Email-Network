netseer.StaticGraphRender = StaticGraphRender;

function StaticGraphRender(vjit) {
    this._vjit = vjit;
};

StaticGraphRender.colorarray = d3.scale.category20();

StaticGraphRender.prototype.render = function () {
    if (this._vjit._edgeRender) {
        this._vjit._edgeRender.render();
    }

    if (this._vjit._nodeRender) {
        this._vjit._nodeRender.render();
    }
};

/**
 * get one svg object
 * @param name
 * @returns {*}
 */
StaticGraphRender.prototype.getSvgObject = function(name){
    return d3.select(name);
};

StaticGraphRender.prototype.filterNodes = function (f) {
    var context = this._vjit.getContext();
    var node = context.selectAll("."+GraphDescriptor.DATA_NODE_CLASS);
    return node.filter(f);
};

StaticGraphRender.prototype.filterEdges = function (f) {
    var context = this._vjit.getContext();
    var edge = context.selectAll("."+GraphDescriptor.DATA_EDGE_CLASS);
    return edge.filter(f);
};

StaticGraphRender.prototype.filterClass = function (context,f) {
    return context.filter(f);
};
/**
 * set the append context style
 * @param context
 * @param style
 * @param d
 */
StaticGraphRender.prototype.setAppendContextStyle = function(context,style, d){
    context.style(style, d);
};

/**
 * remove the svg class
 * @param name
 */
StaticGraphRender.prototype.removeClass = function(name){
    var context = this._vjit.getContext();
    context.selectAll("."+name).remove();
};
