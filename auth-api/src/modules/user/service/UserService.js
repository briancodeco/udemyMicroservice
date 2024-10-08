import userRepository from "../repository/userRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserException from "../exception/UserException.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; // Importa o módulo CommonJS como um objeto
const { Jwt } = jwt; 
import * as secrets from "../../../config/constants/secrets.js";
class UserService {
  
    async findByEmail(req){
        try {
            const { email } = req.params;
            const { authUser } = req;
            this.validarDadosRequisicao(email);
          let user = await  userRepository.findByEmail(email); 
          console.log(user);
          this.validateUserNotFound(user);
          this.validateAuthenticatedUser(user,authUser);
          return {
            status: httpStatus.SUCCESS,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
          }
        } catch (error) {
            return {
                status: error.status? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,

            }
        }
        
    }

    validarDadosRequisicao(email){
        if (!email){
            throw new UserException(httpStatus.BAD_REQUEST,"User email was not informed.");
        }
    }

    validateUserNotFound(user){
        if(!user){
            throw new UserException(httpStatus.BAD_REQUEST,"User  was not found.");
        }
    }

    validateAuthenticatedUser(user, authUser){
        if(!authUser || user.id !== authUser.id ){
            throw new UserException(
                httpStatus.FORBIDDEN,
                "You cannot see this user data."
            )
        }
    }
    async getAccessToken(req){
        try {
            const {email,password} = req.body;
            console.log(email);
            this.validateAccessTokenData(email,password);
            let user = await userRepository.findByEmail(email);
            this.validateUserNotFound(user);
            await this.validatePassword(password,user.password);
            const  authUser = {id: user.id, name: user.name, email: user.email}
            const accesToken = jwt.sign({authUser},secrets.API_SECRET ,{expiresIn: '1d'});
            return {
                status: httpStatus.SUCCESS,
                accesToken
            }
        } catch (error) {
            return {
                status: error.status? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,

            }
        }
       
    }

    validateAccessTokenData(email,password){
        if(!email || !password){
            throw new UserException(httpStatus.UNAUTHORIZED, "Email and passwor must be informed.")
        }
    }

 async   validatePassword(password,hashpassword){
        if(!await bcrypt.compare(password,hashpassword)){           
                throw new UserException(httpStatus.UNAUTHORIZED, "Password doesn't match.")            
        }
    }
}

 export default new UserService();