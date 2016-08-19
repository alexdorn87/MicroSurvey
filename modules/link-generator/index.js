var uuid = require('node-uuid');
var url = require('url');

var PLACEHOLDER_UUID = "$UUID_LINK$";
var PLACEHOLDER_LINK = "$LINK_LINK$";
//var linkBase = "https://alex.io";
var linkBase = "http://localhost:3000/";
var _connector = "";
var _linkText = "Click here to join";
module.exports = generateLink;

function generateLink(connector, linkText){
  if(connector){
    _connector = connector;
  }

  if(linkText){
    _linkText = linkText;
  }
  console.log(linkBase, _connector);
  return create();
}

function create() {
  var rawLink = generate();
  var _uuid = uuid.v4();
  console.log(linkBase, _connector);
  var uuidUrl = url.resolve(linkBase, '/join' + _connector + _uuid);
  return compile(rawLink, {
    uuid: _uuid,
    uuidUrl: uuidUrl
  });
}

function generate() {
  return ["<a href='", PLACEHOLDER_LINK, "'>", _linkText, "</a>"].join("");
}

function compile(raw, params) {
  return {
    compiled: raw
      .replace(PLACEHOLDER_UUID, params.uuid)
      .replace(PLACEHOLDER_LINK, params.uuidUrl),
    params: params
  };
}
