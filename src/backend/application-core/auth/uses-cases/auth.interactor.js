import authService from '../../../infraestructure/mysql/services/auth/auth.service.js';
import helpers from '../../../middleware/helpers.js';
import jwt from 'jsonwebtoken';

let AuthInteractor = {}


AuthInteractor.execute = async (data) => {
    try {
      console.log(`[AuthInteractor] Executing interactor`);

      let { email, password } = data;
     
      console.log(`[AuthInteractor] Validating user`);
      let resp_login = await authService.getUserByEmail(email, password);
     
      let user = resp_login.length > 0 ? resp_login[0]:[]
     
      let validPassword = await helpers.matchPassword(password, user.password)


      if(validPassword){
          if(resp_login.length > 0){
            console.log(`[AuthInteractor] User validating successfull`);
            const token = jwt.sign({user}, process.env.TOKEN_SECRET, {expiresIn: '8h'})
            return {
              code: 200,
              message: 'Login Successful',
              status: true,
              data: {
                user,
                token
              }
            }
          }
      }else{
        return { code: 500, message: 'User or password invalid', status: false }
      }
    } catch (err) {
        return {
          code: 500,
          message: 'Error in login',
          error: err
        }
    }
}

export default AuthInteractor;
