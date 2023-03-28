import {reservations} from '../mongoDB/mongoCollections.js';
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

const exportedMethods = {
    async create(name, email, cwid, startTime, endTime, tableNum){
        const  resCollection = await reservations();
        let newRes ={
            name,
            email,
            cwid,
            startTime,
            endTime,
            tableNum,
            confirmed: false, //field to see if they confirm that they have shown up
        }
        const insertRes = await  resCollection.insertOne(newRes);
        if (!insertRes.acknowledged || !insertRes.insertedId){
            throw 'Error: Could not create reservation';
        }
        const newId = insertRes.insertedId;
        const res=await this.getById(newId.toString());
        res._id=res._id.toString();
        return res;
    },

    async getAll(){
        const  resCollection = await reservations();
        const allRes = await  resCollection.find({}).toArray();
        allRes.map(x=>x._id=x._id.toString());
        return allRes;
    },

    async getById(id){
        if (id === undefined) throw 'Error: Id is undefined';
        else if (typeof id !== 'string') throw 'Error: Id must be a string';
        else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
        id=new ObjectId(id);
        const  resCollection = await reservations();
        const res = await  resCollection.findOne({_id:id});
        if (res===null) {
            throw 'Error: No table with given Id';
        }
        res._id=res._id.toString();
        return res;
    },

    async getByTableNum(number){
        const  resCollection = await reservations();
        const res = await  resCollection.findOne({tableNum:number});
        if (res===null) {
            throw 'Error: No table with given Id';
        }
        res._id=res._id.toString();
        return res;
    },

    async removeByTableNum(number){
        const  resCollection = await reservations();
        const deleteRes = await  resCollection.deleteOne({tableNum: number});
        if (deleteRes === 0){
            throw 'Error: Movie cannot be deleted';
        }
        return `Table ${number} has been successfully deleted`;
    },

    async  confirmRes(id){
        const  resCollection = await reservations();
        id = new ObjectId(id);
        const specificRes = await resCollection.findOne({_id:id});
        if (specificRes === null){
            throw 'Error: No reservation with given id';
        }
        let updateRes = {
            firstName: specificRes.firstName,
            lastName: specificRes.lastName,
            email: specificRes.email,
            cwid: specificRes.cwid,
            startTime: specificRes.startTime,
            endTime: specificRes.endTime,
            tableNum: specificRes.tableNum,
            confirmed: true
        }
        const updatedRes = await resCollection.updateOne({_id:id}, {$set:updateRes});
        if (updatedRes === 0){
            throw 'Error: Table occupancy could not be updated';
        }
        let upRes = await this.getById(id.toString());
        upRes._id=upRes._id.toString();
        return upRes;
    }
};

export default exportedMethods;