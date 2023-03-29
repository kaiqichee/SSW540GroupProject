import {tables} from '../mongoDB/mongoCollections.js';
import { ObjectId } from 'mongodb';

function valid_id(id){
    try {
    let parsedId = new ObjectId(id);
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
const exportedMethods = {
    async create(number, seats){
        const tableCollection = await tables();
        let newTable ={
            number,
            seats,
        }
        const insertTable = await tableCollection.insertOne(newTable);
        if (!insertTable.acknowledged || !insertTable.insertedId){
            throw 'Error: Could not add table';
        }
        const newId = insertTable.insertedId;
        const table=await this.getById(newId.toString());
        table._id=table._id.toString();
        return table;
    },

    async getAll(){
        const tableCollection = await tables();
        const allTables = await tableCollection.find({}).toArray();
        allTables.map(x=>x._id=x._id.toString());
        return allTables;
    },

    async getById(id){
        if (id === undefined) throw 'Error: Id is undefined';
        else if (typeof id !== 'string') throw 'Error: Id must be a string';
        else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
        id=new ObjectId(id);
        const tableCollection = await tables();
        const table = await tableCollection.findOne({_id:id});
        if (table===null) {
            throw 'Error: No table with given Id';
        }
        table._id=table._id.toString();
        return table;
    },

    async getByNumber(number){
        const tableCollection = await tables();
        const table = await tableCollection.findOne({number:number});
        if (table===null) {
            throw 'Error: No table with given Id';
        }
        table._id=table._id.toString();
        return table;
    },

    async removeByNumber(number){
        const tableCollection = await tables();
        const deleteTable = await tableCollection.deleteOne({number: number});
        if (deleteTable === 0){
            throw 'Error: Movie cannot be deleted';
        }
        return `Table ${number} has been successfully deleted`;
    },

    // async  updateOccupancy(number, value){
    //     const tableCollection = await tables();
    //     const specificTable = await tableCollection.findOne({number:number});
    //     if (specificTable === null){
    //         throw 'Error: No table with given number';
    //     }
    //     let updateTable = {
    //         number: specificTable.number,
    //         seats: specificTable.seats,
    //         occupied: value
    //     }
    //     const updatedTable = await tableCollection.updateOne({number:number}, {$set:updateTable});
    //     if (updatedTable === 0){
    //         throw 'Error: Table occupancy could not be updated';
    //     }
    //     let upTable=await this.getByNumber(number);
    //     upTable._id=upTable._id.toString();
    //     return upTable;
    // }
};

export default exportedMethods;