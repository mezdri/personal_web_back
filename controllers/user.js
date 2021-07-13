const bcrypt = require("bcrypt-nodejs");
const UsersModel = require("../models/users");

function singUp(req, res){
    const Users = new UsersModel();
    //const {name, lastname, email, password, confirmPassword} = req.body;
    const json_input = req.body;
    let flag_error = false;
    let status_code = 200;
    let msg = '';
    let bcrypt_password = '';
    for (let key in json_input){
        if (json_input[key] === ''){
            flag_error = true;
            status_code = 400
            msg = 'Debe llenar todos los campos';
        }else{
            if (key === 'password'){
                if (json_input['password'] !== json_input['confirmPassword']){
                    flag_error = true;
                    status_code = 400
                }
            }
        }
    }
    if (flag_error){
        res.status(status_code).send({message: msg});
    }else{
        bcrypt.hash(json_input['password'], null, null, function (err, hash){
            if (err){
                flag_error = true;
                status_code = 500;
                msg = 'Error al guardar';
                res.status(status_code).send({message: msg});
            }else{
                bcrypt_password = hash;
                Users.name = json_input['name'];
                Users.lastname = json_input['lastname'];
                Users.email = json_input['email'].toLowerCase();
                Users.password = bcrypt_password;
                Users.role = 'User';
                Users.active = false;
                Users.save((err, userStored) => {
                    if (err){
                        flag_error = true;
                        status_code = 500;
                        msg = 'Error al guardar el registro';
                        console.warn(err);
                        res.status(status_code).send({message: msg});
                    }else{
                        res.status(200).send({message: 'Registro Finalizado', user: userStored});
                    }
                });
            }

        });


    }
}

module.exports = {
    singUp
}