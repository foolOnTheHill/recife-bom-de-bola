;(function(exports) {

// Useful functions to make SQL queries to de data API.

var tableNames = {
  'equipes': '3838af9e-2c53-4cad-9716-e6ca76f1908f',
  'campos': 'adbc9234-b5cc-4616-9372-86858a6f3d13',
  'jogadores': 'd1121f92-bae2-4702-ae71-d844ae2a0120'
}

var compoundQuery = function(table, attributes, whereClause, distinct) {
  var dist = distinct ? 'DISTINCT ' : ' ';

  var columns = '';
  var sc = false;

  for (var i = 0; i < attributes.length; i++) {
    var colon = sc ? ', ' : '';
    columns += colon + attributes[i];
    sc = true;
  }

  if (columns === '') {
    columns = '*';
  }

  var constraints = '';
  sc = false;

  for (attribute in whereClause) {
    var colon = sc ? ', ' : '';
    constraints += [colon, attribute, '=', whereClause[attribute]].join('');
    sc = true;
  }

  var query;
  if (constraints === '') {
    query = ['SELECT ', dist, columns, ' from "', table, '"'].join('');
  } else {
    query = ['SELECT ', dist, columns, ' from "', table, '" WHERE ', constraints].join('');
  }

  return query;
}

var createQueryURL = function(table, attributes, whereClause, distinct) {
  var urlBase = 'http://dados.recife.pe.gov.br/api/action/datastore_search_sql?sql=';
  var query = compoundQuery(table, attributes, whereClause, distinct);
  var url = urlBase + query;
  return url;
}

var createQuery = function(table, attributes, whereClause, distinct) {
  var tableId = tableNames[table];
  var query = createQueryURL(tableId, attributes, whereClause, distinct);
  return query;
}

var get = function(request) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', request, false);
  xhr.send();

  var data = [], response = null, success = false;
  if (xhr.status === 200) {
    response = JSON.parse(xhr.response);
    data = response['result']['records'];
    success = true;
  }
  var r = {success: success, data: data};

  return r;
}

exports.createQuery = createQuery;
exports.get = get;

})(typeof exports === 'undefined' ? this : exports);
