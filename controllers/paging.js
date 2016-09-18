/* #####################
    Example
    https://www.npmjs.com/package/restify-mongoose#queries
##################### */

const
  url = require('url');

let
  per_page = process.env.PER_PAGE,
  page = 1,
  limit = per_page;

function pagimate(docs) {



} // END pagimate

function init_paging(req, res) {

  let page = parseInt(req.query.page),
    per_size = parseInt(req.query.per_size),
    limit = page > 0 ? ((page - 1) * size) : 0;

} // END pagimate

/* ### SETTERS ### */
function set_per_page() {



}

function set_page() {



}


module.exports = {
  init_paging: init_paging,
  pagimate: pagimate,
  set_per_page: set_per_page,
  set_page: set_page,
  limit: limit,
  page: page
}


/*
Default page size : 100

search client side with fuzzy search
advance search = server side, param based

sort param = name, date created, phone

4 * 3 - 12

pop - 12
limit - 16

= 4

?p=1
?p=2
?p=3
*/