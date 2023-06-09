var select = require("xml-crypto").xpath,
  SignedXml = require("xml-crypto").SignedXml,
  fs = require("fs");
  require("dotenv").config();

function MyKeyInfo(path) {
  this.getKeyInfo = function (key, prefix) {
    prefix = prefix || "";
    prefix = prefix ? prefix + ":" : prefix;
    const certificate = fs.readFileSync(path);
    return (
      "<" +
      prefix +
      `X509Data><X509Certificate>${certificate}</X509Certificate/></` +
      prefix +
      "X509Data>"
    );
  };
  this.getKey = function (keyInfo) {
    //you can use the keyInfo parameter to extract the key in any way you want
    return fs.readFileSync("./certificates/certificado.pem");
  };
}

function signXml(xml, xpath, key, dest) {
  var sig = new SignedXml();
  sig.addReference(xpath);
  sig.signingKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSRxgi3UrncnYS' + 
  'avBw+2iApniZliG0x+OxF1is37jWzV0dNfjcsof1LIPAt+VZ07o5wy5sV7HPDYZi' +
  'iXnUBhopWXQkmWCcEavG9Fi158OPSeEjIEdZ6fWoRZJv0jqjdYZwo+tUaZTiKSe3' +
  'a0zBvojxVLEqIX5+yzoAJJTXF6p5EjuujbVfJY9zG8zSvNYAwrgTwDRGro+JZhxw' +
  'XwiygGEhQ5ZHkGebdulZbMYi5wLQCbh+xC9k/BWO398bGskhGftbk3a3TifkHpCy' +
  '3sKJGiOmIZFORzyutS8PnSyK6ihflUpdvkapnjnVZY9Sk2YHpiHnQkjjbyglXjV6' +
  'IjhBcCGdAgMBAAECggEBAJiUIb1amXlroqUml6VDp8aCBMxdFcQZruvXJu75vyOO' +
  'DFyfxx5NJT4PuOJkDbWqXlx/dfYDg+/bvoFNg+sHKoCKei38ZQ+Z+uz4bE5CB7K3' +
  'Rve3+k4R58DcCq+8+fOV2aFuL9omanPYrQr4fs+us6t5arxJZYIXcNSdtqqEb5w8' +
  '/5kzQbmvNRsUwQWIcINGkfvC2RslS1AFhjmw1Fw4HkOO3AA0P0UZIZs2Y8qrRpvC' +
  'IVlaHmstCa6YJUwmOeJiaU9H1PeFd36snzMhx9PRySCqk61avogMBv25DTIDfo21' +
  'gCZoU5vp3TAI8Q5v6kpvKvoiJ7Mwm/I7pv7cfBrOJDkCgYEA86Fq/OhzCML8x34j' +
  'oDjUjm4sQIFKd0oDjgjP3wPxfBDevOyBnut9cK4Rbkf5BNLx9UWsnb/DAJw33k86' +
  'kfcBb1eqs3nrADmg14sz1rSUd+vKF/RPr+1ySAm+w1yuieW18NxJXhNOnQZEH6D1' +
  'JOKK4dLDACbvgH9yW8fluOj5yHcCgYEA3PQsfeNAyEm4Q0fSQHlOVbwTbOWERiDT' +
  'FqwVaaFmEJh34w/BClXl54sGP50XOMTwwnYcH93b2SmOf1M8yZafaZA/QtQpdiIL' +
  'Q1jSuzh7evwNcLeHBE3fHGqXUvlSUq7Hnt2FLUyKVAbWPFnJ9qBuZNznELh95M8r' +
  's3uATQwdP4sCgYEAoUciA/n87Lfnjkg6XT5Bt2fHc4wjN4SPhd7ffMqneXHRgU8v' +
  'H3zUtVsFvvN2LXNXKP7Onj7rX+QKN+hK5YWWNZbbMaRrpOKBTy6fSmqQPjKgverF' +
  'NbkCBh4tYjZgdHjUUHYDO3ucduZHAokSvzAYsBVNcTRVJ8M2ePuDXz0a3VECgYAw' +
  'c26qMEINaXT5c+9b6f3OeQ59a5rk0d/X8eZEIntCGlz3soWvIYTnkCnPmz/zV+Q/' +
  'kCy8pCbIaP9xVixXPCs6t8HXgrSQzghQPVMAcPNK1aiQ1f3KaNUK4yjJrhhqPx9Q' +
  '69x/QXB32oPx+fJ6nVV30qTsmrgoi3FWyzcoLgbf3wKBgERINL4Q28zn1qcicXFv' +
  '4bnFP9j5vLoqA9AwF0AJt0YI40FDnLRfZ6vinvAwjdRKtEMoEZ47ygQztkXQD+6b' +
  'zYQg+8lE0XnXr4Wq2I+8yrW1CKfhmLyR/gLvBxDC4nddSaIritV7/a5abtYEFdlc'
  '9Dzlp0BBg8QSrdRpPzt5Yq0z'
  sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
  sig.canonicalizationAlgorithm =
    "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
  sig.references[0].transforms[0] =
    "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
  sig.references[0].digestAlgorithm = "http://www.w3.org/2001/04/xmlenc#sha256";
  sig.keyInfoProvider = new MyKeyInfo("./certificates/certificado.pem");
  sig.computeSignature(xml);
  return sig.getSignedXm();
}

const HandleSign = async (req, res) => {
  try {
    var xml = req.body;
    const sign = await signXml(
      xml,
      "//*[local-name(.)='ECF']",
      "./privateKey.pem",
      "result.xml"
    );
    res.json(sign);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { HandleSign };
