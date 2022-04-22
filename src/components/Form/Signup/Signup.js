import React , {useState , useEffect} from 'react';
import { notify } from '../../toastify';
import { validate } from './../validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './../form.module.css';
import {Link} from 'react-router-dom';

const Signup = () => {

    const [data , setData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        isAccepted: false
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
        setErrors(validate(data,'signup'));
    } , [data,touchleave] )

    const onblurhandeler = event => {
        setTouchleave({ ...touchleave, [event.target.name]: true })
    }
    const submitHandler = (event) => {
        event.preventDefault()
        if(Object.keys(errors).length){
            setTouchleave({
                name:true,
                email:true,
                password:true,
                confirmPassword:true,
                isAccepted: true
            });
            notify('لطفا خطاهای موجود را رفع کنید' , 'warn')
        }else if(!Object.keys(errors).length){
            notify('اطلاعات شما با موفقیت ثبت شد' , 'success')
        }
    }

    return (
        <div className={styles.container}>
            <form action="#" method="get" onSubmit={submitHandler} className={styles.formContainer} >
                <h1 className={styles.header}>Sign Up</h1>

                <div className={styles.formField}>
                    <label>Name :</label>
                    <input
                        className={(errors.name && touchleave.name) ? styles.uncompleted : styles.formInput}
                        type="text" name="name" value={data.name} onChange={changeHandler} onBlur={onblurhandeler} />
                    {errors.name && touchleave.name && <span>{errors.name}</span>}
                </div>
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
                <div className={styles.formField}>
                    <label>ConfirmPassword :</label>
                    <input type="text" name="confirmPassword"
                    className={(errors.confirmPassword && touchleave.confirmPassword) ? styles.uncompleted : styles.formInput}
                    value={data.confirmPassword} onChange={changeHandler} onBlur={onblurhandeler} />
                    {errors.confirmPassword && touchleave.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formField}>
                <div className={styles.checkBoxContainer}>
                        <label>I accet terms of privacy policy</label>
                        <input
                            type="checkbox"
                            name="isAccepted"
                            value={data.isAccepted}
                            onChange={changeHandler}
                            onBlur={onblurhandeler} />
                </div>
                    {errors.isAccepted && touchleave.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/login">Login</Link>
                    <button type="submit">Sign Up</button>
                </div>
                <ToastContainer rtl="true" className={styles.alert} />
            </form>
        </div>
    );
}

export default Signup;
