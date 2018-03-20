
module.exports = function Util(){

    var util = {
        addStudent : addStudent,
        addPrefEdges : addPrefEdges,
        graphInit : graphInit,
        reverse_graph : reverse_graph,
        stableGroupF : stableGroupF,
        stableGroupF_ambigious : stableGroupF_ambigious,
        stableGroupR : stableGroupR
    };

    function addStudent (graph, roaster) {
        var count = 0
        roaster.forEach( function (t) {
            graph.addNode(t['User']['id']);
            count++;
        } );
    }

    function addPrefEdges(graph, roaster) {
        roaster.forEach( function (t) {
            if(t == null){
                return;
            }
            //console.log(t['id']);
            var pref = t['Preference'];
            if(pref == null) {
                return;
            }
            var teammate = pref['teammates'];
            if(teammate == null) {
                return;
            }

            teammate.forEach(
                function (t2) {

                    if(!graph.nodes().includes(t2)){
                        return;
                    }

                    graph.addEdge(t['User']['id'],t2);
                }
            );

        });
    }

   function graphInit(graph, roaster) {
        addStudent(graph, roaster);
        addPrefEdges(graph, roaster);
   }

    function reverse_graph(rev_graph, init_graph) {

        var count = 0;

        //Copy the nodes to the graph
        var nodes = init_graph.nodes();
        nodes.forEach(function (t) {
            rev_graph.addNode(t);
        });

        //Reverse the graph.
        nodes.forEach(function (t) {
            nodes.forEach(function (t2) {
                if(t == t2){
                    return;
                }
                if(!(init_graph.adjacent(t).includes(t2)) && !(init_graph.adjacent(t2).includes(t))){
                    rev_graph.addEdge(t,t2);
                }

            })
        });
    }


    function stableGroupR(rev_graph, t, size, stable, targetGroup) {
        var targetList = rev_graph.adjacent(t);

        var nodeList = rev_graph.nodes();

        var possibleIdx = 0;
        var possibleGroup = [];

        nodeList.forEach(function (t2) {
            if(!targetList.includes(t2)){
                possibleGroup[possibleIdx] = t2;
                possibleIdx++;
            }
        });

        var bigMatch = 0;

        possibleGroup.forEach(function (t2) {

            var currentTarget = t2;
            var currentAdj = rev_graph.adjacent(t2);

            var matchHit = 0;
            currentAdj.forEach(function (t3) {
                if(!possibleGroup.includes(t3)){
                    matchHit++;
                }
            })

            //console.log(matchHit);

            if(matchHit == (size-targetGroup)){
                bigMatch++;
            }
        });

        //console.log(bigMatch);
        if(bigMatch == targetGroup){
            console.log(possibleGroup);
            possibleGroup.forEach(function (t2) {
                rev_graph.removeNode(t2);
                if(stable.includes(t2)){
                    console.log('You fucked up');
                }
                stable.push(t2);
            });
            return true;
        }

        return false;
    }

    function stableGroupF(graph, t, size, stable, targetGroup) {
        var targetList = graph.adjacent(t);

        var nodeList = graph.nodes();

        var possibleIdx = 0;

        //Copy the target array
        var possibleGroup = JSON.parse(JSON.stringify(targetList));
        possibleGroup.push(t);

        possibleGroup.sort();

        var bigMatch = 0;

       // console.log(possibleGroup);

        possibleGroup.forEach(function (t2) {

            var currentTarget = t2;
            var currentAdj = graph.adjacent(t2);

            var matchHit = 0;
            currentAdj.forEach(function (t3) {

                if(possibleGroup.includes(t3)){
                  //  console.log('matcht hit for '+t2+' is '+ matchHit);
                    matchHit++;
                }
            })

            //console.log(matchHit);

            if(matchHit == targetGroup-1){
                bigMatch++;
            }
        });

        //console.log(bigMatch);
        if(bigMatch == targetGroup){
            console.log(possibleGroup);
            possibleGroup.forEach(function (t2) {
                graph.removeNode(t2);
                if(stable.includes(t2)){
                    console.log('You fucked up');
                }
                stable.push(t2);
            });
            return true;
        }

        return false;
    }


    function stableGroupF_ambigious(graph, t, size, stable, targetGroup) {
        var targetList = graph.adjacent(t);

        var nodeList = graph.nodes();

        var possibleIdx = 0;

        //Copy the target array
        var possibleGroup = JSON.parse(JSON.stringify(targetList));
        possibleGroup.push(t);

        possibleGroup.sort();

        var bigMatch = 0;
        // console.log(possibleGroup);
        possibleGroup.forEach(function (t2) {
            var currentTarget = t2;
            var currentAdj = graph.adjacent(t2);

            if(currentAdj.length + 1 > possibleGroup.length && currentAdj.length < 10){
                possibleGroup = JSON.parse(JSON.stringify(currentAdj));
                possibleGroup.push(t2);
                return;
            }

        });

        possibleGroup.sort();

        possibleGroup.forEach(function (t2) {

            var currentTarget = t2;
            var currentAdj = graph.adjacent(t2);

            var matchHit = 0;
            currentAdj.forEach(function (t3) {

                if(possibleGroup.includes(t3)){
                    //  console.log('matcht hit for '+t2+' is '+ matchHit);
                    matchHit++;
                }
            })

            //console.log(matchHit);

            if(matchHit >= targetGroup-3){
                bigMatch++;
            }
        });

        //console.log(bigMatch);
        if(bigMatch == targetGroup){
            console.log(possibleGroup);
            possibleGroup.forEach(function (t2) {
                graph.removeNode(t2);
                if(stable.includes(t2)){
                    console.log('You fucked up');
                }
                stable.push(t2);
            });
            return true;
        }

        return false;
    }

   return util;

}

function stableGroup(graph, t) {
    var targetList = rev_graph.adjacent(t);
    targetList[9] = t;
    var stargetList = rev_graph.adjacent(t);
    console.log(stargetList.length);

}


//export addStudent;


//console.log(rev_graph.topologicalSort());
//console.log(rev_graph.adjacent('4'));


//graph.addNode();

//console.log(groupObj[10]);

//var roasterList = groupObj['data']['Course']['Enrollments'];

// var result = roasterList.filter(member => (member['role'] != 'Instructor'));
// result = JSON.stringify(result);
// fs.writeFileSync('./course4PrefFiltered.json', result);

//console.log(groupObj);
//console.log(roasterList[0]);

//console.log(groupObj);
//console.log(groupObj.data.Course);
//var group = new Map();


