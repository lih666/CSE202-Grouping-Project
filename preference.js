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

    if(initial_graph.outdegree(t) == 0 &&  initial_graph.indegree(t) == 0 ){
        //console.log(t);
        floating++;
    }

    if(initial_graph.outdegree(t) == 0){
        //console.log(t);
        pure_floating++;
    }



});

console.log(compute);

var stable = [];

var bigC = 0;
var smallC = 0;
var size = 389
var targetGroup = 10;

while(targetGroup > 1) {
    nodeList.forEach(function (t) {

        if (initial_graph.outdegree(t) == 10){
            return;
        }

        //console.log('Ite '+targetGroup+' '+initial_graph.outdegree(t));

        if (initial_graph.outdegree(t) >= targetGroup-1) {
          //  console.log(t);
            //smallC++;
            // if(t == '251'){
            //     console.log(' 251 : '+initial_graph.outdegree(t));
            // }

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

// while(targetGroup > 1) {
//     nodeList.forEach(function (t) {
//
//         if (rev_graph.outdegree(t) >= (size - targetGroup)) {
//             //console.log(t);
//             smallC++;
//
//             var res = util.stableGroup(rev_graph, t, size, stable, targetGroup);
//             if (res) {
//                 console.log('Decrement' + t);
//                 size -= targetGroup;
//             }
//         }
//
//     });
//
//     targetGroup--;
// }
// console.log(bigC);
// console.log(smallC);



console.log(rev_graph.nodes().length);
console.log("Stable group has size as "+stable.length);
console.log("Pure Floating group has size as "+pure_floating);
console.log("Floating group has size as "+floating);
//
// nodeList.forEach(function (t) {
//     if(initial_graph.outdegree(t) == 9){
//         if(!stable.includes(t)){
//             //console.log(t);
//         }
//     }
// });