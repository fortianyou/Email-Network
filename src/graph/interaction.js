netseer.GraphInteraction = GraphInteraction;

function GraphInteraction(vjit){
    
    this._vjit = vjit;
    GraphInteraction.that = this;
}

/**
 * node mouse over event
 * @param g
 */
GraphInteraction.prototype.nodeMouseOver = function(g){
	var graph = GraphInteraction.that._vjit.getGraphRender();
    var thisObject = graph.getSvgObject(this);
    graph.setAppendContextStyle(thisObject,"cursor","pointer");
    var line = graph.filterEdges(function(l){
        
        
    	if(l.source == g || l.target == g ){
            var node = graph.filterNodes(function(n){
            if( l.source == n || l.target == n )return this;
            else return null; 
            });
            graph.setAppendContextStyle(node,"fill","green");
    		return this;
    	}
    	else
    		return null;

    });
    graph.setAppendContextStyle(line,"stroke",function(d){
        if(d.source == g ) return "yellow";
        if(d.target == g ) return "red";
    });
    graph.setAppendContextStyle(line,"stroke-width",2);
}

GraphInteraction.prototype.nodeMouseLeave = function(g){
    var graph = GraphInteraction.that._vjit.getGraphRender();
    var thisObject = graph.getSvgObject(this);
    graph.setAppendContextStyle(thisObject,"cursor","pointer");
    var line = graph.filterEdges(function(l){
        if(l.source == g || l.target == g ){
            var node = graph.filterNodes(function(n){
            if( l.source == n || l.target == n )return this;
            else return null; 
            });
            graph.setAppendContextStyle(node,"fill","blue");
            return this;
        }
        else
            return null;

    });
    graph.setAppendContextStyle(line,"stroke","#999");
    graph.setAppendContextStyle(line,"stroke-width",0.5);
    
}
