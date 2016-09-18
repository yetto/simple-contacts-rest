const
  fs = require('fs'),
  supertest = require("supertest"),
  should = require("should"),
  dom = 'http://localhost:8080',
  server = supertest.agent(dom),
  password = require('../controllers/passwords.js');


/*
  TEST Contact
  http://nnm.box/REST/contacts/57d869a17160689f6be9cdbe
*/
let testC = {
  "name": "Denise Bradley",
  "nickname": "dbradley0",
  "company": "Trudeo",
  "job_title": "Recruiter",
  "address": "2 Onsgard Street",
  "birthday": "2/1/1985",
  "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
  "email": [
    "dbradley0@etsy.com"
  ]
}

let testC2 = {}

/*
  TEST User
  http://nnm.box/REST/users/57d866317160689f6be9cd5a
*/
let testU = {
  name: "Wylie Wade",
  username: "Rosanne2",
  email: "rosanne2@gmail.com",
  password: "EUZ78MMR7GR",
  admin: false,
  location: "22.48643, 114.92551",
}

/*
  CONF
  http://nnm.box/REST/users/57d866317160689f6be9cd5a
*/
let
  userID = null,
  contactID = null,
  token = null,
  userTest = true,
  adminTest = true,
  responseCollection = [];


/*
        __   __                           __   ___  __     ___  ___  __  ___
  |\ | /  \ |__)  |\/|  /\  |       |  | /__` |__  |__)     |  |__  /__`  |
  | \| \__/ |  \  |  | /~~\ |___    \__/ .__/ |___ |  \     |  |___ .__/  |

  1.- should POST a NEW users
  2.- should POST credentials and login in successfully
  3.- should GET a token verified
  4.- should PUT updated user info
  5.- should POST a NEW contact
  6.- should GET AUTH USER data
  7.- should GET all AUTH USER contacts
  8.- should GET an AUTH USER contact information
  9.- should DELETE user contact
  // 10.- should DELETE himself

*/

// ON//OFF
if (userTest) {

  /*
   *  1.- should POST a NEW users
   */
  it("(user) should POST a NEW users", function(done) {
    server
      .post('/REST/users/')
      .set({
        "x-access-token": token
      })
      .send(testU)
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(201);
        res.body.name.should.equal('Wylie Wade');
        password.compare(res.body.password, 'EUZ78MMR7GR', function(err, isPasswordMatch) {
          isPasswordMatch.should.equal(true);
        });
        userID = res.body._id;
        done();
      });
  });

  /*
   *  2.- should POST credentials and login in successfully
   */
  it("(user) should POST login in credentials successfully", function(done) {
    server
      .post('/app/authenticate')
      .set({
        "x-access-token": token
      })
      .send({
        email: "rosanne2@gmail.com",
        password: "EUZ78MMR7GR",
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        res.body.message.should.equal('Token is valid for 24h');
        res.body.token.should.be.a.String();
        token = res.body.token;
        done();
      });
  });

  /*
   *  3.- should GET a token verified
   */
  it("(user) should GET a token verified", function(done) {
    server
      .get('/app/verify')
      .set({
        "x-access-token": token
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  4.- should PUT updated user info
   */
  it("(user) should PUT updated user info", function(done) {
    server
      .put('/REST/user/')
      .set({
        "x-access-token": token
      })
      .send({
        name: "Wylie Wade UPDATE",
        username: "Rosanne2UPDATE",
        email: "rosanne2@gmail.com",
        location: "22.0000, 114.0000"
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        res.body.name.should.equal('Wylie Wade UPDATE');
        res.body.username.should.equal('Rosanne2UPDATE');
        res.body.location.should.equal("22.0000, 114.0000");
        res.body._id.should.equal(userID);
        done();
      });
  });

  /*
   *  5.- should POST a NEW contact for a user
   */
  it("(user) should POST a NEW contact for a user", function(done) {
    server
      .post('/REST/user/contacts/')
      .set({
        "x-access-token": token
      })
      .send(testC)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(201);
        let b = res.body;
        b.name.should.equal(testC.name);
        b.nickname.should.equal(testC.nickname);
        b.company.should.equal(testC.company);
        b.job_title.should.equal(testC.job_title);
        b.address.should.equal(testC.address);
        b.birthday.should.equal(testC.birthday);
        b.notes.should.equal(testC.notes);
        b.email.should.be.an.Array();
        contactID = res.body._id;
        done();
      });
  });


  /*
   *  6.- should GET AUTH USER data
   */
  it("(user) should GET all AUTH USER data", function(done) {
    server
      .get('/REST/user/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  7.- should GET all AUTH USER contacts
   */
  it("(user) should GET all AUTH USER contacts", function(done) {
    server
      .get('/REST/user/contacts/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  8.- should GET an AUTH USER contact information
   */
  it("(user) should GET an AUTH USER contact information", function(done) {
    server
      .get('/REST/user/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  9.- should DELETE user contact
   */
  it("(user) should DELETE user contact", function(done) {
    server
      .delete('/REST/user/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(204);
        done();
      });
  });

  /*
   *  10.- should DELETE himself
   */
  if (!adminTest) {
    it("(user) should DELETE user", function(done) {
      server
        .delete('/REST/user/')
        .set({
          "x-access-token": token
        })
        .expect("Content-type", /json/)
        .expect(404)
        .end(function(err, res) {
          responseCollection.push(JSON.stringify({
            res: res.body,
            whole: res
          }));
          res.status.should.equal(204);
          writeLog(responseCollection);
          done();
        });
    });
  }

} // END userTest ON//OFF

/*
        __                        __   ___  __     ___  ___  __  ___
   /\  |  \  |\/| | |\ |    |  | /__` |__  |__)     |  |__  /__`  |
  /~~\ |__/  |  | | | \|    \__/ .__/ |___ |  \     |  |___ .__/  |

  1.- should GET (become) admin
    1a.- should GET (become) admin
    1b.- should POST credientials and log in as admin
    1b.- should GET request to make a user admin
  2.- should POST credentials and login in successfully ad admin
  3.- should GET a token verified
  4.- should POST a NEW contact for a user
  5.- should GET all users
  6.- should GET info from a user
  7.- should GET all contacts for a user
  8 .- should POST a contact for a user
  9 .- should PUT diferent information for that contact
  10 .- should GET information from a user contact
  11 .- should GET all contacts
  12 .- should PUT diferent information to a contact
  13 .- should POST a contact not assingned to a user
  14 .- should DELETE a contact not assingned to a user
  15 .- should DELETE a contact from a user
  16 .- should DELETE himself

*/

// ON//OFF
if (adminTest) {

  /*
   *   1.- should GET autorization to become admin
   */
  it("(still user) should GET autorization to become admin", function(done) {
    server
      .get('/app/admin')
      .set({
        "x-access-token": token
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *  2.- should POST credentials and login in successfully
   */
  it("(admin) should POST credentials and login in successfully", function(done) {
    server
      .post('/app/authenticate')
      .set({
        "x-access-token": token
      })
      .send({
        email: "rosanne2@gmail.com",
        password: "EUZ78MMR7GR",
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        res.body.message.should.equal('Token is valid for 12h');
        res.body.token.should.be.a.String();
        token = res.body.token;
        done();
      });
  });

  /*
   *  3.- should GET a token verified
   */
  it("(admin) should GET a token verified", function(done) {
    server
      .get('/app/verify')
      .set({
        "x-access-token": token
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *   4.- should POST a NEW contact for a user
   */
  it("(admin) should POST a NEW contact for a user", function(done) {
    server
      .post('/REST/users/' + userID + '/contacts/')
      .set({
        "x-access-token": token
      })
      .send(testC)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(201);
        let b = res.body;
        b.name.should.equal(testC.name);
        b.nickname.should.equal(testC.nickname);
        b.company.should.equal(testC.company);
        b.job_title.should.equal(testC.job_title);
        b.address.should.equal(testC.address);
        b.birthday.should.equal(testC.birthday);
        b.notes.should.equal(testC.notes);
        b.email.should.be.an.Array();
        contactID = res.body._id;
        done();
      });
  });

  /*
   *   5.- should GET all users
   */
  it("(admin) should GET all users", function(done) {
    server
      .get('/REST/users/')
      .set({
        "x-access-token": token
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        res.body.should.be.an.Array();
        done();
      });
  });

  /*
   *   6.- should GET a user info
   */
  it("(admin) should GET a user info", function(done) {
    server
      .get('/REST/users/' + userID + '/')
      .set({
        "x-access-token": token
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        res.body._id.should.equal(userID);
        done();
      });
  });

  /*
   *   7.- should GET all contacts for a user
   */
  it("(admin) should GET all contacts for a user", function(done) {
    server
      .get('/REST/users/' + userID + '/contacts/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *   8.- should POST a contact for a user
   */
  it("(admin) should POST a contact for a user", function(done) {
    server
      .post('/REST/users/' + userID + '/contacts/')
      .set({
        "x-access-token": token
      })
      .send(testC)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(201);
        let b = res.body;
        b.name.should.equal(testC.name);
        b.nickname.should.equal(testC.nickname);
        b.company.should.equal(testC.company);
        b.job_title.should.equal(testC.job_title);
        b.address.should.equal(testC.address);
        b.birthday.should.equal(testC.birthday);
        b.notes.should.equal(testC.notes);
        b.email.should.be.an.Array();
        contactID = res.body._id;
        done();
      });
  });

  /*
   *   9 .- should PUT diferent information for that contact
   */
  it("(admin) should PUT diferent information for that contact", function(done) {
    server
      .put('/REST/users/' + userID + '/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .send({
        "name": "Denise Bradley UPDATE",
        "nickname": "dbradleyUPDATE",
        "company": "TrudeoUPDATE",
        "job_title": "RecruiterUPDATE",
        "address": "2 Onsgard Street UPDATE",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis UPDATE.",
        "email": [
          "dbradleyUPDATE@etsy.com"
        ]
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *   10 .- should GET information from a user contact
   */
  it("(admin) should GET information from a user contact", function(done) {
    server
      .get('/REST/users/' + userID + '/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *   11 .- should GET all contacts
   */
  it("(admin) should GET all contacts", function(done) {
    server
      .get('/REST/contacts/')
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });


  /*
   *   12 .- should PUT diferent information to a contact
   */
  it("(admin) should PUT diferent information to a contact", function(done) {
    server
      .put('/REST/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .send({
        "name": "Denise Bradley UPDATE 2",
        "nickname": "dbradleyUPDATE2",
        "company": "TrudeoUPDATE 2",
        "job_title": "RecruiterUPDATE 2",
        "address": "2 Onsgard Street UPDATE 2",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis UPDATE 2.",
        "email": [
          "dbradleyUPDATE2@etsy.com"
        ]
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *   13 .- should POST a contact not assingned to a user
   */
  it("(admin) should POST a contact not assingned to a user", function(done) {
    server
      .post('/REST/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .send(testC)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        testC2._id = res.body._id;
        res.status.should.equal(201);
        done();
      });
  });

  /*
   *   14 .- should GET a contact not assingned to a user
   */
  it("(admin) should GET a contact not assingned to a user", function(done) {
    server
      .get('/REST/contacts/' + contactID)
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *   14 .- should DELETE a contact not assingned to a user
   */
  it("(admin) should DELETE a contact not assingned to a user", function(done) {
    server
      .delete('/REST/contacts/' + testC2._id)
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(204);
        done();
      });
  });

  /*
   *   15 .- should DELETE a contact from a user
   */
  it("(admin) should DELETE a contact from a user", function(done) {
    server
      .delete('/REST/users/' + userID + '/contacts/' + contactID + '/')
      .set({
        "x-access-token": token
      })
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(200);
        done();
      });
  });

  /*
   *   16 .- should DELETE himself
   */
  it("(admin) should DELETE himself", function(done) {
    server
      .delete('/REST/user/')
      .set({
        "x-access-token": token
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        responseCollection.push(JSON.stringify({
          res: res.body,
          whole: res
        }));
        res.status.should.equal(204);
        writeLog(responseCollection);
        done();
      });
  });

} // END adminTest ON/OFF

/*
  RES: Log File
  {res: JSON.stringify(res.body), resHeaders: JSON.stringify(res.header), resStatus: JSON.stringify(res.status), req: JSON.stringify(res.req)}
  {res: JSON.stringify(res.body), whole: JSON.stringify(res)}
  JSON.stringify({res: JSON.stringify(res.body), whole: JSON.stringify(res)})
  JSON.stringify({res: res.body, whole: res})
  JSON.stringify({res: res.body, whole: res.header})
  JSON.stringify(res)
*/
function writeLog(responseCollection) {

  var path = '/home/node/simple-contacts-rest/public/responseCollection_'+Date.now()+'.txt';

  fs.writeFile(path, responseCollection, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

} // END writeLog