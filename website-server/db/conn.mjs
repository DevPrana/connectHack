import { MongoClient } from "mongodb";

const connectionString = process.env.DB || "";

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
    console.log("connected to DB");
} catch(e) {
    console.log("Error encountered\n")
    console.error(e);
}

let db = conn.db("sample-training");

export default db;