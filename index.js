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

async function run() {
	await client.indices.create({
		index: "tweets",
		mappings: {
			properties: {
				id: { type: "integer" },
				text: { type: "text" },
				user: { type: "keyword" },
				time: { type: "date" },
			},
		},
	});
}

// run().catch(console.log);
