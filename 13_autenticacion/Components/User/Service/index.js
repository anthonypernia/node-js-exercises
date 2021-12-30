const path = require('path');
let mongoDB = require('../../../config/db/MongoDB');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'my_secret_key';
const bcrypt = require("bcrypt");
let default_session_expire = 10;


class UserService {

    database =  mongoDB

    async getUserFromDB(data) {
        let result = await this.database.getByField('users', 'email', data.email);
        return result;
    }

    async addUserToDB(data) {
        data.password = await bcrypt.hash(data.password, 10);
        let result = await this.database.insertAndValidateDuplicate('users', data, 'email');
        if (result) {
            return result.insertedId;
        }
        return null;
    }

    async updateUserFromDB(id, data) {
        let result = await this.database.update('users', id, data);
        return result;
    }
    async deleteUserFromDB(id) {
        let result = await this.database.delete('users', id);
        return result;
    }
    
    async  getUser(user) {
        console.log(user);
        let result = await this.database.getByField('users', 'email', user.email);
        return result;
    }

    async addUser(data) {
        let result = await this.addUserToDB(data);
        if (result) {
            return data;
        }
        return null;
    }

    async loginUser(user){
        let userResult = await this.getUser(user);
        if(userResult){
            let res = await bcrypt.compare(user.password, userResult.password);
            if(res){
                userResult.token = await this.generateToken(userResult);
                return userResult;
            }else{
                return null;
            }
        }
        return false;
    }

    async updateUser(id, data) {
        return await this.updateUserFromDB(id, data);
    }

    async deleteUser(id) {
        return await this.deleteUserFromDB(id);
    }

    async  generateToken(user){
        const token = await jwt.sign({
            user, 
            date: new Date()
            }, PRIVATE_KEY, {
                expiresIn: '30m'
                });
        return token;
    }

    async getUserFromToken(token){
        let user = await jwt.verify(token, PRIVATE_KEY);
        return user;
    }

    async verifyToken(token){
        let result = await jwt.verify(token, PRIVATE_KEY);

        return result;
    }

}

module.exports = new UserService();

