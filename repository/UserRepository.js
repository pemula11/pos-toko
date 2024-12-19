
const {User} = require('../models');

class UserRepository {
    async findAll(){
        return await User.findAll();
    }

    async findOne(id){
        return await User.findOne({
            where: {
                id: id
            }
        }).catch((error) => {
            console.error("Failed fetch data from database. Error: ", error);
            throw new Error("Failed fetch data from database");
            
        })
    }

    async findByEmail(email){
        return await User.scope('withPassword').findOne({
            where: {
                email: email
            }
         }
        ).catch((error) => {
            console.error("Failed fetch data from database. Error: ", error);
            throw new Error("Failed fetch data from database");
        })
    }

    async create(user){
        try {
            return await User.create(user);
        }
        catch (error){
            console.error("Failed to create user. Error: ", error);
            throw new Error("Failed to create user");
        }
    }
}

module.exports = new UserRepository();