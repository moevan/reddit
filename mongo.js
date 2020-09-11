const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://van:nhaidepxop@cluster0.z2fgd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  await client.connect();
  console.log("Connected successfully to server");
}
async function updateSavedToken(newToken) {
  try {
    const db = client.db("reddit");
    const collection = db.collection("accessToken");
    collection.updateOne({ _id: "token" }, { $set: { token: newToken } });
  } finally {
    // await client.close();
  }
}
async function insertNewObject(id, post) {
  const db = client.db("reddit");

  const collection = db.collection("posts");
  collection.updateOne({ _id: id }, { $set: post }, { upsert: true });
}
function clearDatabase() {
  const db = client.db("reddit");
  db.collection("posts").drop();
}
async function getCurrentToken() {
  try {
    const res = await client
      .db("reddit")
      .collection("accessToken")
      .findOne({ _id: "token" });

    return res["token"];
  } finally {
    // await client.close();
  }
}

async function getObj(id) {
  
  const res = await client.db("reddit").collection("posts").find({});
  
  return res.toArray();
}

module.exports = {
  updateSavedToken,
  getCurrentToken,
  connectToMongoDB,
  insertNewObject,
  getObj,
  clearDatabase,
};
