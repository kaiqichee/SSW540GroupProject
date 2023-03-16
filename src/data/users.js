import { users } from '../mongoDB/mongoCollections.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const saltRounds = 16;

const exportedMethods = {
    async create(email, password, cwid){
        const usersCollection = await users();
        password = await bcrypt.hash(password, saltRounds);
        let newUser = {
            email,
            password,
            cwid
        }
        const insertUser = await usersCollection.insertOne(newUser);
        if (!insertUser.acknowledged || !insertUser.insertedId){
            throw 'Error: Could not add user';
        }
        const newId = insertUser.insertedId;
        const user=await this.getById(newId.toString());
        user._id=user._id.toString();
        return user;
    },

    async getAll(){
        const usersCollection = await users();
        const allUsers = await usersCollection.find({}).toArray();
        allUsers.map(x=>x._id=x._id.toString());
        return allUsers;
    },

    async getById(id){
        // if (id === undefined) throw 'Error: Id is undefined';
        // else if (typeof id !== 'string') throw 'Error: Id must be a string';
        // else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
        id=new ObjectId(id);
        const usersCollection = await users();
        const user = await usersCollection.findOne({_id:id});
        if (user===null) {
            throw 'Error: No user with given Id';
        }
        user._id=user._id.toString();
        return user;
    },

    async getByCWID(cwid){
        const usersCollection = await users();
        const user = await usersCollection.findOne({cwid:cwid});
        if (user===null) {
            throw 'Error: No user with given Id';
        }
        user._id=user._id.toString();
        return user;
    },

    async getByEmail(email){
        const usersCollection = await users();
        const user = await usersCollection.findOne({email:email});
        if (user===null) {
            throw 'Error: No user with given Id';
        }
        user._id=user._id.toString();
        return user;
    },

    async removeByCWID(cwid){
        const usersCollection = await users();
        const deleteUser = await usersCollection.deleteOne({cwid:cwid});
        if (deleteUser === 0){
            throw 'Error: Movie cannot be deleted';
        }
        return `User ${cwid} has been successfully deleted`;
    },

    async verifyUser(email, password){
        const user = await this.getByEmail(email);
        let pw = await bcrypt.compare(password, user.password);
        if (pw) {
            return true;
        }
        else {
            return false;
        }
    },

};

export default exportedMethods;