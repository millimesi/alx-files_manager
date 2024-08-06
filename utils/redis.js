import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnected = true;

    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
    });
    this.client.on('connect', () => {
      this.isConnected = true;
    });

    this.setasync = promisify(this.client.set).bind(this.client);
    this.getasync = promisify(this.client.get).bind(this.client);
    this.delasync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.isConnected;
    // return this.client.connected;
  }

  async get(key) {
    try {
      const value = await this.getasync(key);
      return value;
    } catch (err) {
      console.log(`Error in getting ${key}: ${err}`);
      throw err;
    }
  }

  async set(key, value, duration) {
    try {
      await this.setasync(key, value, 'EX', duration);
    } catch (err) {
      console.log(`Error in setting ${key} : ${value}: ${err}`);
      throw err;
    }
  }

  async del(key) {
    try {
      const reply = await this.delasync(key);
      return reply;
    } catch (err) {
      console.log(`Error in deleting ${key}: ${err}`);
      throw err;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
