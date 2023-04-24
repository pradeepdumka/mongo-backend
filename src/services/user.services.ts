import { User } from '../interfaces/user';
import Users from '../models/user.model';

 

const signUp = async (user: User) =>  {
    return new Promise(async (resolve, reject) => {
        try {
            const newUser:User = new Users(user);
            await newUser.save();
            resolve(newUser);
        } catch (err) {
            reject(err);
        }
    });
};

 
const getUserByEmailID = async (emailId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Users.findOne({ email: emailId}).exec();
            resolve(user);
        } catch (err) {
            reject(`Error fetching user by Email ID: ${err}`);
        }
    });
};



const userService = {
     signUp: signUp,
     getUserByEmailId:getUserByEmailID
}

export default userService;