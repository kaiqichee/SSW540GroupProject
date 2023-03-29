import { Router } from 'express';
const router = Router();
import resData from '../data/reservations.js';

router
    .route('/')
    .get(async (req, res) => {
        try {
            let allRes = await resData.getAll();
            res.json(allRes);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);
        }
    })
    .post(async (req, res) => {
        let resInfo = req.body;
        try {
            let createRes = await resData.create(resInfo.name, resInfo.email, resInfo.cwid, resInfo.startTime, resInfo.endTime,resInfo.tableNum);
            res.json(createRes);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);
        }
    })

router
    .route('/:id/confirm')
    .post(async (req, res) => {
        let resId = req.params.id;
        try {
            let createRes = await resData.confirmRes(resId);
            res.json(createRes);
        } catch (e) {
            res.sendStatus(500);
        }
    })
router
    .route('/:id/delete')
    .delete(async (req, res) => {
        let resId = req.params.id;
        try {
            let deleteRes = await resData.removeById(resId);
            res.json(deleteRes);
        } catch (e) {
            res.sendStatus(500);
        }
    })
router
    .route('/:id/edit')
    .patch(async (req, res) => {
        let resId = req.params.id;
        let resInfo = req.body;
        try {
            let updateRes = await resData.update(resId, resInfo.name, resInfo.email, resInfo.cwid, resInfo.startTime, resInfo.endTime, resInfo.tableNum, resInfo.confirmed);
            res.json(updateRes);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);
        }
    })
router
    .route('/:id')
    .get(async (req, res) => {
        let cwid = req.params.id
        try {
            let getRes = await resData.getByCWID(cwid);
            res.json(getRes);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);
        }
    })
router
    .route('/res/:id')
    .get(async (req, res) => {
        let id = req.params.id
        try {
            let getRes = await resData.getById(id);
            res.json(getRes);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);
        }
    })

export default router;