//Kyle experimenting with mongo
/*const { MongoClient } = require("mongodb");
async function mong() {
  const uri =
    "mongodb+srv://Kyle:fexxad-zodry9-Fixcoh@cluster0.rnh2igw.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
mong().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  databasesList.databases.forEach((db) => {
    console.log("-${db.name}");
  });
}
*/
const nodemailer = require("nodemailer");
var fs = require("fs");
var path = require("path");
var express = require("express");
var exphbs = require("express-handlebars");
var tagData = require("./tagData.json");
var activeUser = require("./activeUser.json");
var peopleData = require("./peopleData.json");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3000;

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function (req, res, next) {
  console.log(tagData);

  res.status(200).render("index", {
    tags: tagData,
  });
});
app.get("/people", function (req, res) {
  res.status(200).render("people", {
    persons: peopleData,
  });
});
app.get("/profile", function (req, res) {
  console.log(activeUser);
  res.status(200).render("profile", {
    activeUsers: activeUser,
  });
});
app.get("*", function (req, res) {
  res.status(404).render("404");
});
app.post("/index/addTags", (req, res) => {
  var tag;

  if (req.body && req.body.Title) {
    tag = req.body.Title;

    fs.readFile("tagData.json", "utf8", function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        var json = JSON.parse(data); //turn json to obj
        json.push(req.body); //push new deck to decks
        var tagJSON = JSON.stringify(json, null, 4); //convert to json
        // write to decks.json
        fs.writeFile("tagData.json", tagJSON, "utf8", function callback() {
          console.log("== tag saved to tagData.json");
        });
        tagData.push(req.body); //push deck to cached json
      }
    });

    res.status(200).render("index", {
      singleTag: req.body,
    });
  }
});
app.post("/index/peopleData", (req, res) => {
  res.status(200).json(peopleData);
});
app.post("/index/setActiveUser", (req, res) => {
  if (req.body) {
    fs.readFile(
      "activeUser.json",
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          var json = JSON.parse(data); //turn json to obj
          json.push(req.body); //push new deck to decks
          var activeJSON = JSON.stringify(json, null, 4); //convert to json
          // write to decks.json
          fs.writeFile(
            "activeUser.json",
            activeJSON,
            "utf8",
            function callback() {
              console.log("Active User set");
            }
          );
          activeUser.push(req.body); //push deck to cached json
        }
        res.status(200);
      }
    );
  }
});
app.post("/index/activeUser", (req, res) => {
  res.status(200).json(activeUser);
});
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
