/*
servi  method:

see Servi_API.txt
*/

// adapted from https://github.com/robynitp/networkedmedia


// every servi application must have these 2 lines
var servi = require("servi");
var app = new servi(true);

// set the port (defaults to 3000 if you leave out this line)
port(8081);
console.log(" simpleDB server running , type http://localhost:8081");

// set up a database
// looks for a file called "people.db" or creates one if it doesn't exist
var namesDB = useDatabase("people");

// add some people to the db
namesDB.add({name:"Alejandro", age:19, description:"I like cats and kittens.",score:80});
namesDB.add({name:"Mimi", age:20, description:"I live in Alberta and like to code.",score:90});
namesDB.add({name:"Gregor", age:85, description:"Craft beer and pickles and kale!",score:80});
namesDB.add({name:"Ramie", age:9, description:"I like to color.",score:60});



// set up the routes
route('/', showAll);
route('/profile/:person',showProfile);


// show all the names
function showAll(request){
  namesDB.getAll(gotNames);
  function gotNames(names){
    var namestext = "";
    for (i =0; i < names.length; i++) {
        namestext += "<a href='profile/"+names[i].name + "'>"+names[i].name+"</a><br/>";
    }
    request.respond( namestext );
  }
}

function showProfile(request) {
  var personName = request.params.person;
  namesDB.search("name", personName, gotIt);

  function gotIt(data) {

    var description = data[0].description;
    var age = data[0].age;
    var score = data[0].score;
    var content = "<h1>" + personName + "</h1>";
    content += "<p>" + description + "</p>";
    content += "<p>" + age + "</p>";
    content += "<p>" + score + "</p>";

    // respond with the content
    request.respond(content);
  }
}

start();
