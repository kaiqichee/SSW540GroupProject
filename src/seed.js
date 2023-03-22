import tables from './data/tables.js';
import reservations from './data/reservations.js';
import users from './data/users.js';
import {connection, closeConnection} from './mongoDB/mongoConnection.js';

async function main() {
    const db = await connection();
    db.dropDatabase();
    //create all tables in db, all are unoccupied
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

    //create reservations
    try{
        let startTime = new Date();
        for (let i=0; i<=10; i++) {
            startTime.setDate(startTime.getDate()+i);
            let endTime = startTime;
            endTime.setHours(endTime.getHours()+1);
            await reservations.create("person"+String(i), "person"+String(i)+"@test.com", "0000000"+String(i), startTime, endTime, i+1)
        }
    }
    catch(e){
        console.log(e);
    }
    // test reservation confirmation
    // try{
    //    await reservations.confirmRes("640e3d87d2659b4e13aaefae")
    // }
    // catch(e){
    //     console.log(e);
    // }

    // try{
    //    let res = await reservations.getByTableNum(4)
    //    console.log(res)
        
    // }
    // catch(e){
    //     console.log(e);
    // }
    // create users
    try{
        for (let i=1; i<=5; i++) {
            await users.create("student"+String(i), "student"+String(i)+"@test.com", "password"+String(i), "0000000"+String(i));
        }
    }
    catch(e){
        console.log(e);
    }
    //test verifyUser function
    // try{
    //     let test = await users.verifyUser("student2@test.com", "password0");
    //     console.log(test);

    //     let test1 = await users.verifyUser("student1@test.com", "password1");
    //     console.log(test1)
    
    // }
    // catch(e){
    //     console.log(e);
    // }


    await closeConnection();
}

try {
    main();
}
catch(e){
    console.log(e);
}