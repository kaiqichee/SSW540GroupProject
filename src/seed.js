import tables from './data/tables.js';
import reservations from './data/reservations.js';
import {connection, closeConnection} from './mongoDB/mongoConnection.js';

async function main() {
    const db = await connection();
    db.dropDatabase();
    // create all tables in db, all are unoccupied
    try{
        for (let i=1; i<=10; i++) {
            await tables.create(i, 1)
        }
        for (let i=11; i<=15; i++) {
            await tables.create(i, 2)
        }
        for (let i=16; i<=17; i++) {
            await tables.create(i, 5)
        }
    }
    catch(e){
        console.log(e);
    }

    //change tables 2-7, 14, and 16 to occupied
    try{
        for (let i=2; i<=7; i++) {
            await tables.updateOccupancy(i, 1)
        }
        await tables.updateOccupancy(14, 1)
        await tables.updateOccupancy(16, 3)
    }
    catch(e){
        console.log(e);
    }

    //delete table 17
    try{
        await tables.removeByNumber(17)
    }
    catch(e){
        console.log(e);
    }

    try{
        let startTime = new Date();
        for (let i=0; i<=10; i++) {
            startTime.setDate(startTime.getDate()+i);
            let endTime = startTime;
            endTime.setHours(endTime.getHours()+1);
            await reservations.create("person", String(i), "0000000"+String(i), startTime, endTime, i+1)
        }
    }
    catch(e){
        console.log(e);
    }

    await closeConnection();
}

try {
    main();
}
catch(e){
    console.log(e);
}