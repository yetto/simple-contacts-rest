
const
  supertest = require("supertest"),
  should = require("should"),
  //dom = 'http://localhost:8080',
  dom = 'https://simple-contacts-rest.herokuapp.com',
  server = supertest.agent(dom),
  users = require("./users.json"),
  contacts = require("./contacts_100.json");

/*
  CONF
  http://nnm.box/REST/users/57d866317160689f6be9cd5a
*/
let
  userID = null,
  contactID = null,
  responseCollection = [],
  testU = {},
  testC = {},
  token = null,
  iU = 1,
  iC = 1,
  waitFor = 5000;

/*
 * Load test
 * 100,200 records benchmark
 */
for (var user of users) {
  // create user
  user.name += Date.now();
  user.email = user.name.replace(/\s+/g, '') + "_" + Math.random().toString(36).substring(20) + "@dateDotNow.com";
  newUser(user, contacts);
}

/*
        __        __     ___  ___  __  ___
  |    /  \  /\  |  \     |  |__  /__`  |
  |___ \__/ /~~\ |__/     |  |___ .__/  |

  100,200 records
  1000 contacts * 100 users

  1.- should POST a NEW user
  1a.- should POST credentials and login in successfully
  2.- should POST 1000 new contacts

  # Repeat 100 times

*/

function newUser(user, contacts) {

  /*
   *  1.- should POST a NEW user
   */
  it("1.- (newUser) NEW user: " + user.name, function(done) {
    console.log("U# " + iU + "C# " + iC);
    server
      .post("/REST/users/")
      .send(user)
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        console.log("   - ", res.status);
        userID = res.body._id;
        done();
      });
  }).timeout(waitFor);

  /*
   *  1a.- should POST credentials and login in successfully
   */
  it("1a.- (newUser) POST login in credentials successfully", function(done) {
    console.log("U# " + iU + "C# " + iC);
    iU++;
    server
      .post("/app/authenticate")
      .send({
        email: user.email,
        password: user.password,
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function(err, res) {
        console.log("   - ", res.status);
        token = null;
        token = res.body.token;
        done();
      });
  }).timeout(waitFor);

  for (var contact of contacts) {

      /*
       *  2.- should POST 1000 new contacts
       */
      it("2.- (insertContact) POST NEW contact " + contact.name, function(done) {
        if (token === undefined || token === null) {
          console.log("Skip "+contact.name);
          done();
        }
        iC++;
        console.log("U# " + iU + "C# " + iC);
        server
          .post("/REST/user/contacts/")
          .set({
            "x-access-token": token
          })
          .send(contact)
          .expect(404)
          .end(function(err, res) {
            console.log("   - ", res.status);
            contactID = res.body._id || null;
            done();
          });
      }).timeout(waitFor);

  } // END newUser

}
