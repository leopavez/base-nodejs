import userService from '../../../infraestructure/mysql/services/user/user.service.js';
let ListUserInteractor = {}


ListUserInteractor.execute = async (req) => {
    try {
      
      let response = await userService.getUserList();
      
      return { code: 200, message: 'User list obtained succesful', data: response.data}
    } catch (err) {
        return {
          code: 500,
          message: 'Error to list user',
          error: err
        }
    }
}

export default ListUserInteractor;
