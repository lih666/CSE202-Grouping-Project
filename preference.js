var fs = require('fs');
var Graph = require('graph-data-structure');
var Util = require('./prefUtil');


//File loading
var preference = fs.readFileSync('./course4PrefFiltered.json').toString();
var groupObj = JSON.parse(preference);


//Graph init and util package init
var initial_graph = Graph();
var util = Util();

//Load the group into the graph. Edge A -> B exist when A pref B
util.graphInit(initial_graph, groupObj);

//Reverse the graph for k coloring
var rev_graph = Graph();
util.reverse_graph(rev_graph, initial_graph);


/* ------------ End of Initialization ------------*/

var colored_list = [];
var color_id = 0;
var curr_color_size = 0;


var nodeList = rev_graph.nodes();

var compute = 0;

var pure_floating = 0;
var floating = 0;

nodeList.forEach(function (t) {
    if(rev_graph.outdegree(t) == 379){
        compute++;
    }

    //Compute the student with no in and out edge, pure floating
    if(initial_graph.outdegree(t) == 0 &&  initial_graph.indegree(t) == 0 ){
        //console.log(t);
        p_floating++;
    }

    if(initial_graph.outdegree(t) == 0){
        //console.log(t);
        floating++;
    }
});

//console.log(compute);

//Add the student that exist inside a stable group to this array.
var stable = [];

//Total size of the class
var size = 389

//Initial target size of group
var targetGroup = 10;

console.log(nodeList.length);

nodeList

//Try different size of group util it is less than 1
while(targetGroup > 1) {

    //On the rest part of the student graph
    nodeList.forEach(function (t) {

        //An edge case we need to prune. Student should has
        //up 9 preference. The dataset is not cleaned up.
        if (initial_graph.outdegree(t) == 10){
            return;
        }

        //When the targeting student has out degree 
        if (initial_graph.outdegree(t) >= targetGroup-1) {

            var res = util.stableGroupF(initial_graph, t, size, stable, targetGroup);
            if (res) {
                console.log('Decrement' + t);
                size -= targetGroup;
            }
            else{
                res = util.stableGroupF_ambigious(initial_graph, t, size, stable, targetGroup);
               if (res) {
                   console.log('Decrement' + t);
                   size -= targetGroup;
                }
            }

        }

    });

    targetGroup--;
}



//console.log(rev_graph.nodes().length);
console.log("Stable group has size as "+stable.length);
console.log("Pure Floating group has size as "+p_floating);
console.log("Floating group has size as "+floating);