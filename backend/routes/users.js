import { Router } from 'express';
const router = Router();
import userData from '../data/users.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let allUsers = await userData.getAll();
      return res.json(allUsers);
    } catch (e) {
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo) {
      return res.status(400).json({error: 'Invalid data for creating user'});
    }

    try {
      const newUser = await userData.addUser(userInfo.name, userInfo.email, userInfo.password, userInfo.cwid);
      return res.json(newUser);
    } catch (e) {
      console.log(e)
      return res.status(500).json({error: e});
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
      console.log(checkedUser)
      return res.json(checkedUser);
    } catch (e) {
      console.log(e)
      console.log("=========")
      return res.status(500).json({error: e});
    }
  });


export default router;