var fs = require('fs');
var prefGraph = require('graph-data-structure');


//File loading
var preference = fs.readFileSync('./course4Pref.json').toString();
var groupObj = JSON.parse(preference);

console.log(groupObj[10]);

var roasterList = groupObj['data']['Course']['Enrollments'];

var result = roasterList.filter(member => (member['role'] == 'Student'));
result = JSON.stringify(result);
fs.writeFileSync('./course4PrefFilteredd.json', result);

//console.log(groupObj);
//console.log(roasterList[0]);

//console.log(groupObj);
//console.log(groupObj.data.Course);
//var group = new Map();

//
// "490",
//     "606",
//     "321",
//     "398",
//     "567",
//     "405",
//     "310",
//     "526",
//     "602"
// 319