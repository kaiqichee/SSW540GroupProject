import { Router } from 'express';
const router = Router();
import userData from '../data/users.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let allUsers = await userData.getAll();
      res.json(allUsers);
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo) {
      return res.status(400).json({error: 'Invalid data for creating user'});
    }

    try {
      const newUser = await userData.addUser(userInfo.name, userInfo.email, userInfo.password, userInfo.cwid);
      res.json(newUser);
    } catch (e) {
      res.sendStatus(500);
    }
  });

router
  .route('/login')
  .post(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo) {
      return res.status(400).json({error: 'Invalid data for logging user in'});
    }

    try {
      const checkedUser = await userData.verifyUser(userInfo.email, userInfo.password);
      res.json(checkedUser);
    } catch (e) {
      res.sendStatus(500);
    }
  });


export default router;