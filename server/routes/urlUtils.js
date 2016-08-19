var _ = require('lodash');
var request = require("superagent");

module.exports = {};

module.exports.contains = contains;
module.exports.nocontains = noContains;
module.exports.starts = startsWith;
module.exports.ends = endsWith;
module.exports.exact = exact;
module.exports.simple = simple;
module.exports.getCountry = getCountry;


function contains(haystack, needle) {
  return haystack.indexOf(needle) > -1;
}

function noContains(haystack, needle) {
  return haystack.indexOf(needle) < 0;
}

function startsWith(haystack, needle) {
  return _.startsWith(haystack, needle, 0);
}

function endsWith(haystack, needle) {
  return _.endsWith(haystack, needle);
}

function exact(haystack, needle) {
  return haystack.toLowerCase() === needle.toLowerCase();
}

function simple(haystack, needle) {
  var searchPos = haystack.lastIndexOf("?");
  if (searchPos > 0) {//if search query
    return haystack.substr(0, searchPos).toLowerCase() === needle.toLowerCase();
  } else {
    return exact(haystack, needle);
  }
}

function getCountry(ip, cb) {
  request.get('http://freegeoip.net/json/' + '190.237.183.144')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end(function(err, response) {
      if (err) return cb(err);
      cb(null, response.body);
    });
}
