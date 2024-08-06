import sha1 from 'sha1';
import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(req, res) {
    // console.log('post new is reached')
    // get the email and the password from request body
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    // if email doesnt exists abort with status 400
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }

    // if the password doen't exist abort wwith status 400
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }

    // try to get the user with the given email
    const userCollection = dbClient.db.collection('users');
    const user = await userCollection.findOne({ email });
    // console.log(user);

    // if the email exists in db respond with it already exists
    if (user) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }

    // hash the password
    const hashedPassword = sha1(password);
    // console.log(hashedPassword);

    // creare new user object
    const newUser = {
      email,
      password: hashedPassword,
    };

    // Add the user info to db
    const insertUser = await userCollection.insertOne(newUser);
    const userId = insertUser.insertedId.toString();

    res.status(200).json({ id: userId, email });
  }
}
