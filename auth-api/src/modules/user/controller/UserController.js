import userService from "../service/userService.js";

class UserController {
    async getAcessToken(req,res){
        let accesToken = await userService.getAccessToken(req);
        return res.status(accesToken.status).json(accesToken);  
    }

    async findByEmail(req,res) {
        let user = await userService.findByEmail(req);
        return res.status(user.status).json(user);
    }

}

export default new UserController();