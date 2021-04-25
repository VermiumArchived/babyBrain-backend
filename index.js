let male = require("./maleNames.json");
let female = require("./femaleNames.json");
let names = { male, female };
var express = require("express");
var app = express();
var debug = false;
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.post("/get", function (req, res) {
  let { gender, startsWith } = req.body;
  var filteredNames = names;
  filteredNames = gender ? names[req.body.gender] : [...male, ...female]
  if (startsWith) {
    filteredNames = filteredNames.filter((name) =>
      name.startsWith(startsWith.toUpperCase())
    );
  }

  if(debug) {
    console.log(filteredNames);
    console.log("Specific gender?", req.body.gender ? true : false);
    console.log("Specific startsWith?", req.body.startsWith ? true : false);
}

  res.send(filteredNames);

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
