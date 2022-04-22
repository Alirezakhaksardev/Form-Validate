export const validate = (data,type) => {
    const errors = {}


    if(!data.email){
        errors.email = "Email require";
    }else if(!/\S+@\S+\.\S+/.test(data.email)){
        errors.email = "Email address is invalid";
    }else{
        delete errors.email;
    }

    if(!data.password){
        errors.password = "Password is required";
    }else if(data.password.length < 6){
        errors.password = "Password needs to be 6 characters long or more";
    }else{
        delete errors.password;
    }

    if(type === 'signup'){
        if(!data.name.trim()) {
            errors.name = "Username require";
        }else{
            delete errors.name;
        }
        if(!data.confirmPassword){
            errors.confirmPassword = "Confirm is required";
        }else if(data.confirmPassword !== data.password){
            errors.confirmPassword = "Passwords do not match";
        }else{
            delete errors.confirmPassword;
        }

        if (data.isAccepted){
            delete errors.isAccepted;
        }else {
            errors.isAccepted = "Accept our requations";
        }
    }

    return errors;
}
