var select = require("xml-crypto").xpath,
  SignedXml = require("xml-crypto").SignedXml,
  fs = require("fs");
require("dotenv").config();

const path = require("path");

const privateKeyPath = path.join(__dirname, "./certificates/privateKey.pem");
const certificatePath = path.join(__dirname, "./certificates/certificado.pem");

function MyKeyInfo() {
  this.getKeyInfo = function (key, prefix) {
    prefix = prefix || "";
    prefix = prefix ? prefix + ":" : prefix;
    const certificate = fs.readFileSync(certificatePath, "utf8");
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
    return fs.readFileSync(certificatePath);
  };
}

function signXml(xml, xpath) {
  var sig = new SignedXml();
  sig.addReference(xpath);
  sig.signingKey = fs.readFileSync(privateKeyPath, "utf8");
  sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
  sig.canonicalizationAlgorithm =
    "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
  sig.references[0].transforms[0] =
    "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
  sig.references[0].digestAlgorithm = "http://www.w3.org/2001/04/xmlenc#sha256";
  sig.keyInfoProvider = new MyKeyInfo();
  sig.computeSignature(xml);
  return sig.getSignedXml();
}

const HandleSign = async (req, res) => {
  try {
    const xml = req.body;
    const sign = await signXml(xml, "//*[local-name(.)='ECF']");
    res.json(sign);
  } catch (error) {
    res.json("Invalid xml");
  }
};

module.exports = { HandleSign };
