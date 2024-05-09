import { MongoClient } from 'mongodb';
import Constants from './constants.js';

class Database {
  _instance = null;

  // config has all DB settings
  // TODO: Add connection pool
  init = async (config) => {
    const client = new MongoClient(config.url, {
      minPoolSize: config.minPoolSize,
      maxPoolSize: config.maxPoolSize,
    });
    try {
    await client.connect();
    console.log('you are now connected to MongoDB');
    } catch (err) {
      console.error(`Failed to connect to MongoDB. Error: ${err}`);
    }
    // eslint-disable-next-line no-underscore-dangle
    this._instance = client.db(config.database);
  };

  getDb = () => this._instance;

  dbWidgets = () => this._instance.collection(Constants.TODO_COLLECTION);
}

export const db = new Database();