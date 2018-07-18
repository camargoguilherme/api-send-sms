const fs = require('fs');
const parser = require('xml2json');
    
exports.Json = async (teste) => {
  let json;
  fs.readFile('././material-para-ajuda/modelo.xml', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    json = parser.toJson(data);
    fs.writeFile('././material-para-ajuda/modelo-1.json', json);
    
  });
  console.log(json);
  console.log(teste + ' json'); 
  return json;
}
    
exports.Xml = async (teste) => {
  let xml;
  fs.readFile('././material-para-ajuda/modelo.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      //console.log(data);
      xml = parser.toXml(data);
     
    //fs.writeFile('././material-para-ajuda/modelo-2.xml', xml);
  
  });
  return xml + ' teste';
}



