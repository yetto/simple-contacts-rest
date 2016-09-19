// API END POINTS

var
  uid = '57d866317160689f6be9cd5a',
  cid = '57d869a17160689f6be9cdbe',
  urlArr = [
    // get/post
    'http://nnm.box/REST/users/',
    // get/put/delete
    'http://nnm.box/REST/users/'+uid+'/',
    // get/post
    'http://nnm.box/REST/users/'+uid+'/contacts',
    // get/put/delete
    'http://nnm.box/REST/users/'+uid+'/contacts/'+cid+'/',
    // get/put
    'http://nnm.box/REST/user/',
    // get/post
    'http://nnm.box/REST/user/contacts/',
    // get/put/delete
    'http://nnm.box/REST/user/contacts/'+uid+'/',
    // get
    // 'http://nnm.box/REST/user/frequent/',
    // get
    // 'http://nnm.box/REST/user/group/',
    // post
    // 'http://nnm.box/REST/user/import/',
    // get
    // 'http://nnm.box/REST/user/export/'
];



for (var i = 0; i < urlArr.length; i++) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", urlArr[i]);
  oReq.send();
}

function reqListener(data) {

  let
    url = data.currentTarget.responseURL,
    status = data.currentTarget.status,
    aa = '### '+ url + '\nStatus: ' + status +'\nLength: ' + this.responseText.length
  ;

  aa += '\n\n';

  let
    cont = document.getElementById('content'),
    content = cont.innerHTML;
  ;

  // append to page
  cont.innerHTML = content + aa;
  if(status === 404){
    console.log( '-----------',url,'\n',JSON.parse(this.responseText));
  }

}










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
contacts: [ ]
}

*/