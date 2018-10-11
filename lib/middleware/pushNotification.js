var admin = require("firebase-admin");

var serviceAccount = require("../../solow.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://soloq-122b3.firebaseio.com"
});