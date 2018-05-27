var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoClient = require("mongodb").MongoClient;

var app = express();

var dbUrl = "mongodb://localhost:27017/";

mongoClient.connect(dbUrl, function(err, client){
    if (err) { return console.log(err) }
    client.db("AdvertItems");
    client.close();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src'));

// app.route is promise
app.route('/addItem')
  .post(
    function(req, res) {
      mongoClient.connect(dbUrl, function(err, client){
      
        var db = client.db("AdvertItems");
        var collection = db.collection('Adverts');
        var data = req.body;
        collection.insertOne(data, function(err, result){
             
            if (err) { return console.log(err); }
            client.close();
            res.status(200).send('everything is ok');
        });
      });
    }
  );

app.route('/getAllItems')
  .get(
    function(req, res) {
      mongoClient.connect(dbUrl, function(err, client){
      
        var db = client.db("AdvertItems");
        var collection = db.collection("Adverts");
     
        if (err) return console.log(err);
          
        collection.find().toArray(function(err, results){
                     
            res.json(results);
            client.close();
        });
    });
    }
  )

app.route('/adverts/:id')
  .get(
    function(req, res) {

      var id = req.url.substring(9);

      mongoClient.connect(dbUrl, function(err, client){
      
        var db = client.db("AdvertItems");
        var collection = db.collection("Adverts");
     
        if (err) return console.log(err);
          
        collection.find({_id:  new mongo.ObjectID(id)}).toArray(function(err, results){
                     
            res.json(results);
            client.close();
        });
    });
    }
  )

  app.route('/updateItem')
    .post(
      function(req, res) {
        mongoClient.connect(dbUrl, function(err, client){
     
          if (err) return console.log(err);
      
          var db = client.db("AdvertItems");
          var collection = db.collection("Adverts");
            collection.findOneAndUpdate(
                {_id: new mongo.ObjectID(req.body.id)}, 
                { $set: {
                  title: req.body.title, 
                  description: req.body.description, 
                  phoneNumber: req.body.phoneNumber
                }},
                { returnOriginal: false }, 
                function(err, result){

                  if (err) return console.log(err);

                    res.status(200).send('ok');
                    client.close();
                }
            );
        });
      }
    )

  app.route('/delete')
    .post(
      function(req, res) {
        mongoClient.connect(dbUrl, function(err, client){
          if (err) return console.log(err);
      
          var db = client.db("AdvertItems");
          db.collection("Adverts").deleteOne({_id: new mongo.ObjectID(req.body.id)}, function(err, result){
            
            if (err) return console.log(err);
            console.log(result);
            res.status(200).send('everything is ok');
            client.close();
          });
        });
      }
    )

app.route('*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'))
  })

app.listen(3000, function() {
  console.log('server running on port 3000')
})