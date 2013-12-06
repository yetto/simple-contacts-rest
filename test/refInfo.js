
/*-------------------------------------------------------------------
### End-points for app management ###################################
---------------------------------------------------------------------
get     users/                      Get all users
-post                                Create new user
---------------------------------------------------------------------
get     users/:id                   Get user info
-put                                 Update user info
-delete                              Terminate user
---------------------------------------------------------------------
get     users/:id/contacts          Get contact info
post                                Create new contact for user
---------------------------------------------------------------------
get     users/:userID/contacts/:contactID    Get info from user contact
put                                 Update contact info from user
delete                              Delete contact from user
---------------------------------------------------------------------
### End-points for authenticated users ##############################
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
get     user/frequent/              Get frequent contacts
get     user/group/                 Get contacts by group
post    user/import/                Accepts csv
get     user/export/                Offers csv download
---------------------------------------------------------------------
### API Params ######################################################
---------------------------------------------------------------------
?page=
?per-page=
?order-by=name|added
--------------------------------------------------------------------*/


/* POST EXAMPLE

/*
    TEST Contact
    http://nnm.box/REST/contacts/57d869a17160689f6be9cdbe

{
  "_id": "57d869a17160689f6be9cdbe",
  "name": "Denise Bradley",
  "nickname": "dbradley0",
  "company": "Trudeo",
  "job_title": "Recruiter",
  "address": "2 Onsgard Street",
  "birthday": "2/1/1985",
  "notes": "Suspendisse potenti. Nullam porttitor lacus at turpis.",
  "email": [
    "dbradley0@etsy.com"
  ],
  _users: [
    username : "Rosanne",
    user_id : "57d866317160689f6be9cd5a",
  ]
}


    TEST User
    http://nnm.box/REST/users/57d866317160689f6be9cd5a

{
  _id: "57d866317160689f6be9cd5a",
  name: "Wylie Wade",
  username: "Rosanne",
  password: "EUZ78MMR7GR",
  admin: false,
  location: "22.48643, 114.92551",
  _contacts: [
      {
        name : 'Denise Bradley',
        contact_id : "57d869a17160689f6be9cdbe".
      }
    ]
}
*/