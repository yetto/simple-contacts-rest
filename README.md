
**Simple-contacts-rest**
----
  <_Simple REST api demo._>

```
/*-------------------------------------------------------------------
### End-points for app management : ADMIN ONLY ######################
---------------------------------------------------------------------
get     users/                      Get all users
post                                Create new user
---------------------------------------------------------------------
get     users/:id                   Get user info
put                                 Update user info
delete                              Terminate user
---------------------------------------------------------------------
get     users/:id/contacts          Get contact info
post                                Create new contact for user
---------------------------------------------------------------------
get     users/:uid/contacts/:cid    Get info from user contact
put                                 Update contact info from user
delete                              Delete contact from user
---------------------------------------------------------------------
### End-points for authenticated users : USER/ADMIN #################
---------------------------------------------------------------------
get     user/                       User info
put                                 Update user info
---------------------------------------------------------------------
get     user/contacts/              List of all user contacts
post                                Creates new contact
---------------------------------------------------------------------
get     user/contacts/:id/          Get contact details
put                                 Update contact
delete                              Delete contact
---------------------------------------------------------------------
### API Params ######################################################
---------------------------------------------------------------------
```

* **POST /REST/users/**

  <_To create a user, post to users, The path will return the user created_>

```
 {
        "__v": 0,
        "updatedAt": "2016-09-19T18:51:23.439Z",
        "createdAt": "2016-09-19T18:51:23.439Z",
        "name": "Wylie Wade",
        "username": "Rosanne2_jacq5mi",
        "email": "wade_ofxbt9@datedotnow.com",
        "location": "22.48643, 114.92551",
        "_id": "57e033ab6e2a870df8762734",
        "_contacts": []
    }

```

* **POST /app/authenticate**

  <_To autenticate, post email and password. You will get in return your JWT token_>


```
 {
        "message": "Token is valid for 24h",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1N2UwMzNhYjZlMmE4NzBkZjg3NjI3MzQiLCJwZXJtcyI6WyJ1c2VyOnJlYWQiLCJ1c2VyOndyaXRlIl0sImxvY2F0aW9uIjoiMjIuNDg2NDMsIDExNC45MjU1MSIsImlhdCI6MTQ3NDMxMTA4MywiZXhwIjoxNDc0Mzk3NDgzfQ.z0El82TledM9658H8q79ZY-1c5VLnSkFOGP6orgdL88"
    }

```

* **GET /app/verify**

  <_As a test you can Verify your token here_>

```

 {
        "message": "Token is valid"
    }


```


**End-points for authenticated users : USER/ADMIN**
----
  <_Routes for the user, it will return information from his account._>


* **PUT /REST/user/**

  <_Update User info_>

```

 {
        "_id": "57e033ab6e2a870df8762734",
        "updatedAt": "2016-09-19T18:51:23.706Z",
        "createdAt": "2016-09-19T18:51:23.439Z",
        "name": "Wylie Wadeuwzy3nmi",
        "username": "Rosanne27c5qxgvi",
        "email": "wade_ofxbt9@datedotnow.com",
        "location": "22.0000, 114.0000",
        "__v": 0,
        "_contacts": []
    }


```

* **POST /REST/user/contacts/**

  <_User contacts_>

```

 {
        "__v": 0,
        "updatedAt": "2016-09-19T18:51:23.884Z",
        "createdAt": "2016-09-19T18:51:23.884Z",
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "_id": "57e033ab6e2a870df8762735",
        "email": ["dbradley0@etsy.com"]
    }


```

* **GET /REST/user/**

  <_User info_>

```

 {
        "_id": "57e033ab6e2a870df8762734",
        "updatedAt": "2016-09-19T18:51:23.706Z",
        "createdAt": "2016-09-19T18:51:23.439Z",
        "name": "Wylie Wadeuwzy3nmi",
        "username": "Rosanne27c5qxgvi",
        "email": "wade_ofxbt9@datedotnow.com",
        "location": "22.0000, 114.0000",
        "__v": 0,
        "_contacts": []
    }


```

* **GET /REST/user/contacts/**

  <_Get all user contacts_>

```

 [{
        "_id": "57e033ab6e2a870df8762735",
        "updatedAt": "2016-09-19T18:51:23.884Z",
        "createdAt": "2016-09-19T18:51:23.884Z",
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradley0@etsy.com"]
    }]


```

* **GET /REST/user/contacts/57e033ab6e2a870df8762735/**

  <_Get all info from a user contact_>

```
 {
        "_id": "57e033ab6e2a870df8762735",
        "updatedAt": "2016-09-19T18:51:23.884Z",
        "createdAt": "2016-09-19T18:51:23.884Z",
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradley0@etsy.com"]
    }


```

* **DELETE /REST/user/contacts/57e033ab6e2a870df8762735/**

  <_Delete a contact_>
```

 {}


```

* **GET /app/admin**

<Route for testing pourpuses only, it is condition against process.env.NODE_ENV = development, this route will make a user admin, this helps us for testing with mocha>

```

 {
        "_id": "57e033ab6e2a870df8762734",
        "updatedAt": "2016-09-19T18:51:24.573Z",
        "createdAt": "2016-09-19T18:51:23.439Z",
        "name": "Wylie Wadeuwzy3nmi",
        "username": "Rosanne27c5qxgvi",
        "email": "wade_ofxbt9@datedotnow.com",
        "password": "$2a$10$wN/8NiyFUayDgyb4MG87LeXqY5NWLNMsAryiGa35utkwN9.Oq6nti",
        "location": "22.0000, 114.0000",
        "__v": 1,
        "_contacts": [],
        "perms": ["admin:read", "admin:write", "user:read", "user:write"]
    }

```

* **POST /app/authenticate**

  <_We should autenticate again after requesting admin rights to get new token_>
```

 {
        "message": "Token is valid for 12h",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1N2UwMzNhYjZlMmE4NzBkZjg3NjI3MzQiLCJwZXJtcyI6WyJhZG1pbjpyZWFkIiwiYWRtaW46d3JpdGUiLCJ1c2VyOnJlYWQiLCJ1c2VyOndyaXRlIl0sImxvY2F0aW9uIjoiMjIuMDAwMCwgMTE0LjAwMDAiLCJpYXQiOjE0NzQzMTEwODQsImV4cCI6MTQ3NDM1NDI4NH0.BtC7KfepObVpgiHqmB1pEmnqaCER_UsIuKhfH7PiOe0"
    }

```

* **GET /app/verify**


 {
        "message": "Token is valid"
    }


````



**End-points for app management : ADMIN ONLY**
----
  <_Routes for the managing any user and its contacts._>


* **POST /REST/users/57e033ab6e2a870df8762734/contacts/**

 {
        "__v": 0,
        "updatedAt": "2016-09-19T18:51:24.818Z",
        "createdAt": "2016-09-19T18:51:24.818Z",
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "_id": "57e033ac6e2a870df8762736",
        "email": ["dbradley0@etsy.com"]
    }



```

* **GET /REST/users/**


```
{
        "_id": "57e033a16e2a870df87626d3",
        "updatedAt": "2016-09-19T18:51:13.356Z",
        "createdAt": "2016-09-19T18:51:13.356Z",
        "name": "Dustin Mitchell1474310985473",
        "username": "Arlene",
        "email": "DustinMitchell1474310985473_auac3di@dateDotNow.com",
        "location": "-61.20666, 169.73891",
        "__v": 0,
        "_contacts": []
     {
        "_id": "57e033996e2a870df876266f",
        "updatedAt": "2016-09-19T18:51:05.494Z",
        "createdAt": "2016-09-19T18:51:05.494Z",
        "name": "Kieran Levine1474310985471",
        "username": "Lisa",
        "email": "KieranLevine1474310985471_0fi529@dateDotNow.com",
        "location": "72.10581, -112.45895",
        "__v": 0,
        "_contacts": []
     {
        "_id": "57e033916e2a870df876260b",
        "updatedAt": "2016-09-19T18:50:57.591Z",
        "createdAt": "2016-09-19T18:50:57.591Z",
        "name": "Ross Wolf1474310985470",
        "username": "Gusty",
        "email": "RossWolf1474310985470_c37syvi@dateDotNow.com",
        "location": "66.63485, -39.121",
        "__v": 0,
        "_contacts": []


```

* **GET /REST/users/57e033ab6e2a870df8762734/**


```

{
    "_id": "57e033ab6e2a870df8762734",
    "updatedAt": "2016-09-19T18:51:24.898Z",
    "createdAt": "2016-09-19T18:51:23.439Z",
    "name": "Wylie Wadeuwzy3nmi",
    "username": "Rosanne27c5qxgvi",
    "email": "wade_ofxbt9@datedotnow.com",
    "location": "22.0000, 114.0000",
    "__v": 1,
    "_contacts": [{
        "contact_id": "57e033ac6e2a870df8762736",
        "name": "Denise Bradley",
        "_id": "57e033ac6e2a870df8762737"
}


```

* **GET /REST/users/57e033ab6e2a870df8762734/contacts/**


```
{
        "_id": "57e033ac6e2a870df8762736",
        "updatedAt": "2016-09-19T18:51:24.818Z",
        "createdAt": "2016-09-19T18:51:24.818Z",
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradley0@etsy.com"]
    }

```

* **POST /REST/users/57e033ab6e2a870df8762734/contacts/**


```
{
        "__v": 0,
        "updatedAt": "2016-09-19T18:51:25.264Z",
        "createdAt": "2016-09-19T18:51:25.264Z",
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "_id": "57e033ad6e2a870df8762738",
        "email": ["dbradley0@etsy.com"]
    }

```

* **PUT /REST/users/57e033ab6e2a870df8762734/contacts/57e033ad6e2a870df8762738/**


```
{
        "_id": "57e033ad6e2a870df8762738",
        "updatedAt": "2016-09-19T18:51:25.419Z",
        "createdAt": "2016-09-19T18:51:25.264Z",
        "name": "Denise Bradley UPDATE",
        "nickname": "dbradleyUPDATE",
        "company": "TrudeoUPDATE",
        "job_title": "RecruiterUPDATE",
        "address": "2 Onsgard Street UPDATE",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis UPDATE.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradleyUPDATE@etsy.com"]
    }


```

* **GET /REST/users/57e033ab6e2a870df8762734/contacts/57e033ad6e2a870df8762738/**


```
 {
        "_id": "57e033ad6e2a870df8762738",
        "updatedAt": "2016-09-19T18:51:25.419Z",
        "createdAt": "2016-09-19T18:51:25.264Z",
        "name": "Denise Bradley UPDATE",
        "nickname": "dbradleyUPDATE",
        "company": "TrudeoUPDATE",
        "job_title": "RecruiterUPDATE",
        "address": "2 Onsgard Street UPDATE",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis UPDATE.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradleyUPDATE@etsy.com"]
    }

```

* **GET /REST/contacts/**


```
[{
        "_id": "57e033ad6e2a870df8762738",
        "updatedAt": "2016-09-19T18:51:25.419Z",
        "createdAt": "2016-09-19T18:51:25.264Z",
        "name": "Denise Bradley UPDATE",
        "nickname": "dbradleyUPDATE",
        "company": "TrudeoUPDATE",
        "job_title": "RecruiterUPDATE",
        "address": "2 Onsgard Street UPDATE",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis UPDATE.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradleyUPDATE@etsy.com"]
     {
        "_id": "57e033ac6e2a870df8762736",
        "updatedAt": "2016-09-19T18:51:24.818Z",
        "createdAt": "2016-09-19T18:51:24.818Z",
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradley0@etsy.com"]
     {
        "_id": "57e033a86e2a870df8762733",
        "updatedAt": "2016-09-19T18:51:20.849Z",
        "createdAt": "2016-09-19T18:51:20.849Z",
        "name": "Sean Washington",
        "nickname": "swashington2q",
        "company": "Skinix",
        "job_title": "Computer Systems Analyst III",
        "home": "86-(781)410-2661",
        "mobile": "51-(289)463-3100",
        "address": "01 Harper Circle",
        "birthday": "2/20/1999",
        "notes": "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
        "_belongsTo": "57e033a16e2a870df87626d3",
        "__v": 0,
        "email": ["swashington2q@over-blog.com"]

```

* **PUT /REST/contacts/57e033ad6e2a870df8762738/**


```
{
        "_id": "57e033ad6e2a870df8762738",
        "updatedAt": "2016-09-19T18:51:25.784Z",
        "createdAt": "2016-09-19T18:51:25.264Z",
        "name": "Denise Bradley UPDATE 2",
        "nickname": "dbradleyUPDATE2",
        "company": "TrudeoUPDATE 2",
        "job_title": "RecruiterUPDATE 2",
        "address": "2 Onsgard Street UPDATE 2",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis UPDATE 2.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradleyUPDATE2@etsy.com"]
    }

```

* **POST /REST/contacts/57e033ad6e2a870df8762738/**


```
{
        "__v": 0,
        "updatedAt": "2016-09-19T18:51:25.865Z",
        "createdAt": "2016-09-19T18:51:25.865Z",
        "name": "Denise Bradley",
        "nickname": "dbradley0",
        "company": "Trudeo",
        "job_title": "Recruiter",
        "address": "2 Onsgard Street",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
        "_id": "57e033ad6e2a870df876273a",
        "email": ["dbradley0@etsy.com"]
    }

```

* **GET /REST/contacts/57e033ad6e2a870df8762738**


```
{
        "_id": "57e033ad6e2a870df8762738",
        "updatedAt": "2016-09-19T18:51:25.784Z",
        "createdAt": "2016-09-19T18:51:25.264Z",
        "name": "Denise Bradley UPDATE 2",
        "nickname": "dbradleyUPDATE2",
        "company": "TrudeoUPDATE 2",
        "job_title": "RecruiterUPDATE 2",
        "address": "2 Onsgard Street UPDATE 2",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis UPDATE 2.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradleyUPDATE2@etsy.com"]
    }

```

* **DELETE /REST/contacts/57e033ad6e2a870df876273a**


```

    "res": {}

```

* **DELETE /REST/users/57e033ab6e2a870df8762734/contacts/57e033ad6e2a870df8762738/**


```
{
        "_id": "57e033ad6e2a870df8762738",
        "updatedAt": "2016-09-19T18:51:26.118Z",
        "createdAt": "2016-09-19T18:51:25.264Z",
        "name": "Denise Bradley UPDATE 2",
        "nickname": "dbradleyUPDATE2",
        "company": "TrudeoUPDATE 2",
        "job_title": "RecruiterUPDATE 2",
        "address": "2 Onsgard Street UPDATE 2",
        "birthday": "2/1/1985",
        "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis UPDATE 2.",
        "_belongsTo": "57e033ab6e2a870df8762734",
        "__v": 0,
        "email": ["dbradleyUPDATE2@etsy.com"]
    }

```

* **DELETE /REST/user/**


```
 {}
```