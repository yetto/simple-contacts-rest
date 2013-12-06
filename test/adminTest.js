const
    supertest = require("supertest"),
    should = require("should"),
    dom = 'http://localhost:8080',
    server = supertest.agent(dom),
    password = require('../controllers/passwords.js');

/*

Admin user test

1.- should POST a NEW users
1a.- shoudl GET admin
2.- should POST credentials and login in successfully
3.- should GET a token verified
4.- should PUT updated user info
5.- should POST a NEW contact for a user
6.- should GET all users
7.- should GET a user info
8.- should GET all contacts for a user
9 .- should POST a contact for a user
10 .- should PUT diferent information for that contact
11 .- should GET information from a user contact
12 .- should GET all contacts
13 .- should PUT diferent information to a contact
14 .- should POST a contact not assingned to a user
15 .- should DELETE a contact not assingned to a user
16 .- should DELETE a contact from a user
17 .- should DELETE himself

*/

let
    userID = '',
    contactID = '',
    token;

// ON//OFF
if (false) {

    /*
     *   1.- should PUT updated user info
     */
    it("should PUT updated user info", function(done) {
        server
            .put('/REST/users/' + userID)
            .set({
                "x-access-token": token
            })
            .send({
                name: "new name",
                username: "new username",
                email: "rosanne2@gmail.com",
                password: "new password",
                admin: true,
                location: "22.0000, 114.0000"
            })
            .expect("Content-type", /json/)
            .expect(404)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.name.should.equal('new name');
                password.compare(res.body.password, 'new password', function(err, isPasswordMatch) {
                    isPasswordMatch.should.equal(true);
                });
                done();
            });
    });

    /*
     *   2.- should POST a NEW contact for a user
     */
    it("should POST a NEW contact for a user", function(done) {
        server
            .post('/REST/users/' + userID + '/contacts/')
            .set({
                "x-access-token": token
            })
            .send({
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
            })
            .expect(404)
            .end(function(err, res) {
                res.status.should.equal(201);
                res.body.name.should.equal('Denise Bradley');
                contactID = res.body._id;
                done();
            });
    });

    /*
     *   3.- should GET all users
     */
    it("should GET all users", function(done) {
        server
            .get('/REST/users/')
            .set({
                "x-access-token": token
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                done();
            });
    });

    /*
     *   4.- should GET user info
     */
    it("should GET user info", function(done) {
        server
            .get('/REST/users/' + uid + '/')
            .set({
                "x-access-token": token
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body._id.should.equal(uid);
                done();
            });
    });

    /*
     *   5.- should GET all contacts for a user
     */
    it("should GET all contacts for a user", function(done) {
        server
            .get('/REST/users/' + uid + '/contacts/')
            .set({
                "x-access-token": token
            })
            .expect(404)
            .end(function(err, res) {
                res.status.should.equal(200);
                done();
            });
    });

    /*
     *   6.- should GET information from a user contact
     */
    it("should GET information from a user contact", function(done) {
        server
            .get('/REST/users/' + uid + '/contacts/' + cid + '/')
            .set({
                "x-access-token": token
            })
            .expect(404)
            .end(function(err, res) {
                res.status.should.equal(200);
                done();
            });
    });

    /*
     *   7.- should DELETE that user contact
     */
    it("should DELETE that user contact", function(done) {
        server
            .delete('/REST/users/' + userID + '/contacts/' + contactID + '/')
            .set({
                "x-access-token": token
            })
            .expect(404)
            .end(function(err, res) {
                res.status.should.equal(204);
                done();
            });
    });


    /*
     *   8.- should DELETE user
     */
    it("should DELETE user", function(done) {
        server
            .delete('/REST/users/' + userID + '/')
            .set({
                "x-access-token": token
            })
            .expect("Content-type", /json/)
            .expect(404)
            .end(function(err, res) {
                res.status.should.equal(204);
                done();
            });
    });

} // END ON/OFF