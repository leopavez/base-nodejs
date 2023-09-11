import userService from '../../../infraestructure/mysql/services/user/user.service.js';
import helpers from '../../../middleware/helpers.js';
let CreateUserInteractor = {}


CreateUserInteractor.execute = async (req) => {
    try {
        let { email, password, name, lastName, role } = req;

        let hashPasword = await helpers.encryptPassword(password);

        let response = await userService.createUser({
            email,
            password: hashPasword,
            name,
            lastName,
            role
        });

      return { code: 200, message: response.message }
    } catch (err) {
        return {
          code: 500,
          message: 'Error creating user',
          error: err
        }
    }
}

export default CreateUserInteractor;
