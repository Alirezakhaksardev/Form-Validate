import React , {useState , useEffect} from 'react';
import { notify } from '../../toastify';
import { validate } from './../validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './../form.module.css';
import {Link} from 'react-router-dom';

const Login = () => {

    const [data , setData] = useState({
        email:"",
        password:"",
    });

    const [errors , setErrors] = useState({});
    const [touchleave , setTouchleave] = useState({});

    const changeHandler = (event) => {

        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }

    useEffect( () => {
        setErrors(validate(data,'login'));
    } , [data,touchleave] )

    const onblurhandeler = event => {
        setTouchleave({ ...touchleave, [event.target.name]: true })
    }
    const submitHandler = (event) => {
        event.preventDefault()
        if(Object.keys(errors).length){
            setTouchleave({
                email:true,
                password:true,
            });
            notify('لطفا خطاهای موجود را رفع کنید' , 'warn')
        }else if(!Object.keys(errors).length){
            notify('اطلاعات شما با موفقیت ثبت شد' , 'success')
        }
    }

    return (
        <div className={styles.container}>
            <form action="#" method="get" onSubmit={submitHandler} className={styles.formContainer} >
                <h1 className={styles.header}>Login</h1>
                <div className={styles.formField}>
                    <label>Email :</label>
                    <input
                        className={(errors.email && touchleave.email) ? styles.uncompleted : styles.formInput}
                    type="text" name="email" value={data.email} onChange={changeHandler}  onBlur={onblurhandeler} />
                    {errors.email && touchleave.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password :</label>
                    <input type="text" name="password"
                    className={(errors.password && touchleave.password) ? styles.uncompleted : styles.formInput}
                    value={data.password} onChange={changeHandler}  onBlur={onblurhandeler} />
                    {errors.password && touchleave.password && <span>{errors.password}</span>}
                </div>

                <div className={styles.formButtons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type="submit">Login</button>
                </div>
                <ToastContainer rtl="true" className={styles.alert} />
            </form>
        </div>
    );
}

export default Login;
