import Fastify from "fastify";
import { MongoClientInstance } from "./mongo.js";
const PORT = 3000;

const fastify = Fastify();

const start = async () => {
  await MongoClientInstance.start();
  const db = MongoClientInstance.db;
  let leaderboardCollection = db.collection("leaderboard");

  // Add custom error handler
  fastify.setErrorHandler((error, request, reply) => {
    console.error(error);

    const statusCode = error.statusCode || 500;
    reply.status(statusCode).send({
      success: false,
      error: error.message || "Internal Server Error",
    });
  });

  fastify.get("/", (request, reply) => {
    reply.send({ hello: "moshi moshi" });
  });

  fastify.get("/leaderboard/:name", async (request, reply) => {
    const { name } = request.params;
    const player = await leaderboardCollection.findOne({ name: name });

    if (!player) {
      return reply
        .status(404)
        .send({ success: false, error: "Player not found" });
    }

    reply.send({ success: true, player });
  });

  fastify.post("/leaderboard", async (request, reply) => {
    const { name, score } = request.body;
    if (!name || !score) {
      return reply
        .status(400)
        .send({ success: false, error: "Name and score are required" });
    }

    const player = await leaderboardCollection.findOne({ name: name });
    if (player) {
      return reply
        .status(400)
        .send({ success: false, error: "Player name already exists :c" });
    }

    const result = await leaderboardCollection.insertOne({ name, score });
    if (!result.acknowledged) {
      return reply
        .status(500)
        .send({ success: false, error: "Failed to insert" });
    }
    const leaderboard = await leaderboardCollection
      .find({}, { projection: { _id: 0 } })
      .toArray();

    reply.send({ success: true, leaderboard: leaderboard });
  });

  fastify.get("/leaderboard", async (request, reply) => {
    const leaderboard = await leaderboardCollection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    reply.send({ success: true, leaderboard });
  });

  fastify.listen({ port: PORT }, (err, address) => {
    if (err) throw err;
    console.log(`Server is running on: ${address}`);
  });
};

start();
