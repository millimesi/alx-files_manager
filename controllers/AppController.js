import dbClient from '../utils/db';
import redisClient from '../utils/redis';

// Create class AppController that have
// two static methods getStatus and get getstats
export default class AppController {
  /**
     * its function for app GET /status route
     * @param {} req
     * @param {} res
     */
  static getStatus(req, res) {
    console.log('status is reached');
    // Synchronous check for Redis
    const redisStatus = redisClient.isAlive();

    // Asynchronous check for the database
    dbClient.isAlive()
      .then((dbStatus) => {
        // Send the response with both Redis and database status
        res.status(200).json({
          redis: redisStatus,
          db: dbStatus,
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the database status check
        console.error('Error checking database status:', error);
        res.status(500).json({ error: 'Failed to check database status' });
      });
  }

  /**
     * getStats is a callback function for the app Get /stats
     * @param {} req - request from the server not used
     * @param {} res - response to the server
     */
  static getStats(req, res) {
    console.log('stats is reached');
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
