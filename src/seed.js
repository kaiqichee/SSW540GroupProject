const tables = require('./data/tables');
const connection = require('./config/mongoConnection');
let { ObjectId } = require('mongodb');

async function main() {
    const db = await connection();

    try{
        for (i in range(10)) {
            await tables.create(1+i, 1)
        }
        for (i in range(5)) {
            await tables.create(11+i, 2)
        }
        for (i in range(2)) {
            await tables.create(16+i, 5)
        }

    }
    catch(e){
        console.log(e);
    }
}

try {
    main();
}
catch(e){
    console.log(e);
}