import { mongoClient } from 'mongodb';

class DBClient {
    /**
     * Create host, port and database from enviroment variable
     * or takes a default value
     */
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const dburl = `mongodb://${host}:${port}/${database}`;

        // create mongo client and connect 
        this.client = new mongoClient(dburl, { useUnifiedTopology: true });
        this.client.connect();
    }

    /**
     * isAlive checks if the client is connected with the database server
     * @returns: boolean if connected true else false
     */
    isAlive() {
        this.client.isConnected();
    }
}
