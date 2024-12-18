
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
}

module.exports = new UserRepository();