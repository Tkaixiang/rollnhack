import MongoDB from "mongodb";

export class MongoClientInstance {
  static client = null;
  static db = null;

  static start = async () => {
    if (MongoClientInstance.client) {
      console.info("Mongo client already connected");
      return MongoClientInstance.client;
    }
    try {
      const clientResponse = await MongoDB.MongoClient.connect(
        "mongodb://localhost:27017",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      );
      console.info("Connected to MongoDB successfully");
      MongoClientInstance.client = clientResponse;
      MongoClientInstance.db = clientResponse.db("crash-out");
      return clientResponse;
    } catch (e) {
      logger.error(`Error occured while connecting to MongoDB: ${e}`);
    }
    return false;
  };
}
