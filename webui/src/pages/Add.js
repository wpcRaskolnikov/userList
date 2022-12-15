import {useNavigate} from "react-router-dom";
import {registerRoute} from "../utile/ApiRouters";
import {useState} from "react";

function Add() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const handleValidation = () => {
        const {password, username} = values;
        if (username.length < 3) {
            alert("Username should be greater than 3 characters.");
            return false;
        } else if (password.length < 8) {
            alert("Password should be equal or greater than 8 characters.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const body=JSON.stringify({
                username:event.target.username.value,
                password:event.target.password.value
            })
            const headers = {'Content-type': 'application/json'}
             await fetch(registerRoute, {method: 'post',body,headers})
                 .then(res=>res.json())
                 .then(res=>{
                     if (res.status === false) {
                         alert(res.msg);
                     }
                     if (res.status === true) {
                         navigate("/");
                     }
                 }).catch(err=>{
                     console.log(err);
                 })
        }
    };

    return (
        <div className="container">
            <h3>添加用户</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>用户名</label>
                    <input name="username" type="text" className="form-control"
                           placeholder="请填写用户名" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>密码</label>
                    <input name="password" type="password" className="form-control"
                           placeholder="请输入密码" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">添加用户</button>
            </form>
        </div>
    )
}

export default Add;