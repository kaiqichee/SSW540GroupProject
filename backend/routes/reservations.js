import { Router } from 'express';
const router = Router();
import resData from '../data/reservations.js';

router
    .route('/')
    .post(async (req, res) => {
        let resInfo = req.body;
        try {
            let createRes = await resData.create(resInfo.name, resInfo.email, resInfo.startTime, resInfo.endTime,
                resInfo.tableNum);
            res.json(createRes);
        } catch (e) {
            res.sendStatus(500);
        }
    })

router
    .route('/confirm')
    .post(async (req, res) => {
        let resInfo = req.body;
        try {
            let createRes = await resData.confirmRes(resInfo.id);
            res.json(createRes);
        } catch (e) {
            res.sendStatus(500);
        }
    })

export default router;