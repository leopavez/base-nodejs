
import conexion from '../../config-sql.js';

let userService = {};


userService.createUser = async (data) => {
    try {

        let {email, name, lastName, password, role} = data;

        let existUser = await userService.getUserByEmail(email);

        if(existUser) return { code: 500, message: 'User already exist' }
        
        let query = `INSERT INTO users 
        (email, name, last_name, password, role) VALUES ('${email}','${name}', '${lastName}', '${password}', '${role}')`;

        return new Promise(function (resolve, reject) {
            conexion.query(query, function (err, result) {
                if(!err) {
                    resolve({message: 'User created successfully'}) ;
                    return true;
                } else {
                    reject(err);
                    throw err;
                } 
            });
        });
    } catch (error) {
        console.error(error.message)
        return error.message
    }
}

userService.updateUser = async (data) => {
    try {

        let {id, email, name, lastName, password, role} = data;

        let existUser = await userService.getUserByEmail(email);

        if(existUser) return { code: 500, message: 'User email already exist' }
        
        let query = `UPDATE users SET name = '${name}', last_name = '${lastName}', password = '${password}', role = '${role}', email = '${email}' WHERE id = '${id}'`;

        return new Promise(function (resolve, reject) {
            conexion.query(query, function (err, result) {
                if(!err) {
                    resolve({message: 'User updated successfully'}) ;
                    return true;
                } else {
                    reject(err);
                    throw err;
                } 
            });
        });
    } catch (error) {
        console.error(error.message)
        return error.message
    }
}

userService.getUserList = async (data) => {
    try {

        let query = `select u.name, 
                            u.last_name, 
                            u.email, 
                            r.name as role 
                            from users u
                            inner join roles r on u.role = r.id`;

    
        return new Promise(function (resolve, reject) {
            conexion.query(query, function (err, result) {
                if(!err) {
                    resolve({data: result}) ;
                    return true;
                } else {
                    reject(err);
                    throw err;
                } 
            });
        });
    } catch (error) {
        console.error(error.message)
        return error.message
    }
}

userService.getUserByEmail = async (email) => {
    try {

        let query = `select email from users where email = '${email}'`;

        return new Promise(function (resolve, reject) {
            conexion.query(query, function (err, result) {
                if(!err) {
                    if(result.length > 0){
                        resolve(true);
                        return true;
                    } else {
                        resolve(false);
                        return false;
                    }
                } else {
                    reject(err);
                    throw err;
                }
            });
        });
    } catch (error) {
        console.error(error.message)
        return error.message
    }
}



export default userService