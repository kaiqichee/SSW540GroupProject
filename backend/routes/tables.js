import { Router } from 'express';
const router = Router();
import tableData from '../data/tables.js';

router
    .route('/')
    .get(async (req, res) => {
        try {
            let allTables = await tableData.getAll();
            res.json(allTables);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);
        }
    })


export default router;
