
/* #######################################
        Simple import script
####################################### */

const
    MongoClient     = require('mongodb').MongoClient,
    users           = require('users.json'),
    contacts        = require('contacts.json'),
    db              = 'contactsApp',
    mdbUrl          = 'mongodb://127.0.0.1:27017/' + db
;

function connect(onConnect) {
    MongoClient.connect(mdbUrl, function(err, db) {
        if (err) {
            throw err;
        } else {
            console.log("Connected to MongoDB");
            if (typeof onConnect === 'function') onConnect(db);
        };
    });
}

function populateUsers(users) {
    console.log("Populating Users...");
    db.collection('users', function(err, collection) {
        collection.insert(users, {
            safe: true
        }, function(err, result) {
            console.log("Done Populating Users", result);
        });
    });
};

function populateContacts(contacts) {
    console.log("Populating Contacts...");
    db.collection('contacs', function(err, collection) {
        collection.insert(contacts, {
            safe: true
        }, function(err, result) {
            console.log("Done Populating Contacts", result);
        });
    });
};

connect(function(db) {
    populateUsers(users);
    populateContacts(contacts);
});


/* DROP COL EXAMPLE
# http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html#dropCollection

// A simple example creating, dropping a collection and then verifying that the collection is gone.

var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  test.equal(null, err);

  // Execute ping against the server
  db.command({ping:1}, function(err, result) {
    test.equal(null, err);

    // Create a capped collection with a maximum of 1000 documents
    db.createCollection("a_simple_create_drop_collection", {capped:true, size:10000, max:1000, w:1}, function(err, collection) {
      test.equal(null, err);

      // Insert a document in the capped collection
      collection.insertOne({a:1}, {w:1}, function(err, result) {
        test.equal(null, err);

        // Drop the collection from this world
        db.dropCollection("a_simple_create_drop_collection", function(err, result) {
          test.equal(null, err);

          // Verify that the collection is gone
          db.listCollections({name:"a_simple_create_drop_collection"}).toArray(function(err, names) {
            test.equal(0, names.length);

            db.close();
          });
        });
      });
    });
  });
});

*/