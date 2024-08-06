import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const dburl = `mongodb://${host}:${port}`;

class DBClient {
  /**
     * Create host, port and database from enviroment variable
     * or takes a default value
     */
  constructor() {
    // create mongo client and connect
    this.client = MongoClient(dburl, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        // this.isConnected = true;
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        // this.isConnected = false;
      });
  }

  /**
     * isAlive checks if the client is connected with the database server
     * @returns: boolean if connected true else false
     */
  isAlive() {
    // this.isConnected;
    try {
      // You can use a ping command or a simple query to check connection
      return this.db.command({ ping: 1 }).then(() => true).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
     * nbUsers gives the numer of documents in the collection users
     * @returns:  (Promise<int>) number of users
     */
  async nbUsers() {
    const userCollection = this.db.collection('users');
    const numberOfUsers = await userCollection.countDocuments();
    return numberOfUsers;
  }

  /**
     * nbFiles gives number of files in the files users
     * @returns: (Promise<int>) number of files
     */

  async nbFiles() {
    const filesCollection = this.db.collection('files');
    const numberOfFiles = await filesCollection.countDocuments();
    return numberOfFiles;
  }
}

const dbClient = new DBClient();
export default dbClient;
