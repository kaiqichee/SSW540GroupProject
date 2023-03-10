const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb');

function valid_id(id){
    try {
    let parsedId = ObjectId(id);
    return true;
    }
    catch (e){
        return false;
    }
}

function spaces(x){
    let b=true;
    for (const n in x){
        b = b && x[n]===" ";
    }
    return b;
}

function allStrings(x){
    let b=true;
    for (const n in x){
        b = b&&(typeof x[n]==='string');
    }
    return b;
}

async function create(number, seats){
    const tableCollection = await tables();
    let newTable ={
        number,
        seats,
        occupied: false
    }
    const insertTable = await tableCollection.insertOne(newTable);
    if (insertTable === 0){
        throw 'Error: Could not add table';
    }
    const newId = insertTable.insertedId;
    const table=await this.get(newId.toString());
    table._id=table._id.toString();
    return movie;
}

async function getAll(){
    const tableCollection = await tables();
    const allTables = await tableCollection.find({}).toArray();
    allTables.map(x=>x._id=x._id.toString());
    return allTables;
}

async function get(id){
    if (id === undefined) throw 'Error: Id is undefined';
    else if (typeof id !== 'string') throw 'Error: Id must be a string';
    else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
    id=ObjectId(id);
    const tableCollection = await tables();
    const table = await tableCollection.findOne({_id:id});
    if (table===null) {
        throw 'Error: No movie with given Id';
    }
    table._id=table._id.toString();
    return table;
}

async function remove(id){
    if (id === undefined) throw 'Error: Id is undefined';
    else if (typeof id !== 'string') throw 'Error: Id must be a string';
    else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
    const tableCollection = await tables();
    id = ObjectId(id);
    const tableRemove=await get(id.toString());
    const number = tableRemove.number;
    const deleteTable = await tableCollection.deleteOne({_id:id});
    if (deleteTable === 0){
        throw 'Error: Movie cannot be deleted';
    }
    return `Table ${number} has been successfully deleted`;
}

async function updateOccupancy(id){
    if (id === undefined) throw 'Error: Id is undefined';
    else if (typeof id !== 'string') throw 'Error: Id must be a string';
    else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
    const tableCollection = await tables();
    id=ObjectId(id);
    const specificTable = await tableCollection.findOne({_id:id});
    if (specificTable === null){
        throw 'Error: No table with given Id';
    }
    let updateTable = {
        number: specificTable.number,
        seats: specificTable.seats,
        occupied: !specificTable.occupied
    }
    const updatedTable = await movieCollection.updateOne({_id:id}, {$set:updateTable});
    if (updatedTable === 0){
        throw 'Error: Table occupancy could not be updated';
    }
    upTable=await get(id.toString());
    upTable._id=upTable._id.toString();
    return upTable;
}

module.exports ={
    create,
    getAll,
    get,
    remove,
    updateOccupancy,
}