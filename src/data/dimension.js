/**
 * Define the class to deal with data dimensions
 * @type {Function}
 */

netseer.DataDimension = DataDimension;

function DataDimension(dim, type) {
    this.dim = dim;
    this.type = type;
};

DataDimension.NUMERIC_DIMENSION = "numeric_dimension";
DataDimension.BOOLEAN_DIMENSION = "boolean_dimension";
DataDimension.STRING_DIMENSION = "string_dimension";
DataDimension.DATE_DIMENSION = "date_dimension";
DataDimension.CONSTANT_DIMENSION = "constant_dimension";
DataDimension.OBJECT_DIMENSION = "object_dimension";

DataDimension.prototype.getValue = function (d) {
    if (this.type === DataDimension.CONSTANT_DIMENSION){
        return this.dim;
    }
    else if (this.type === DataDimension.BOOLEAN_DIMENSION) {
        var value =  d[this.dim];
        if(value){
            return 1;
        }
        else{
            return 0;
        }
    }
    else if (this.dim in d) {
        return d[this.dim];
    }
    else{
        return null;
    }
};