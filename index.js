import { Client } from "@elastic/elasticsearch";
import fs from "fs";
import "dotenv/config";

const API_KEY = process.env.API_KEY;
const CLOUD_ID = process.env.CLOUD_ID;

const client = new Client({
	cloud: {
		id: CLOUD_ID,
	},
	auth: {
		apiKey: API_KEY,
	},
});

const indexSettings = JSON.parse(fs.readFileSync("index-setting.json", "utf-8"));
//console.log(indexSettings.mappings);

async function run() {
	const result = await client.indices.create({
		index: "tweets-2",
		mappings: indexSettings.mappings,
	});

	console.log(result);
}

run().catch(console.log);
