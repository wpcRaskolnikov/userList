import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Modify() {
    let url="http://localhost:8080";
    let hobbies = ['足球', '篮球', '橄榄球', '敲代码'];
    let {id}=useParams();
    let [user,setUser]=useState(null);
    useEffect(()=>{
        fetch(`http://localhost:8080/modify?id=${id}`).then(res=>res.json())
            .then(res=>{setUser(res)});
    })

    return (
        user&&(<div className="container">
            <h3>修改用户</h3>
            <form method="post" action={`${url}/modify?id=${id}`} target="_self">
                <div className="form-group">
                    <label>用户名</label>
                    <input defaultValue={user.name} name="name" type="text" className="form-control"
                           placeholder="请填写用户名" required/>
                </div>
                <div className="form-group">
                    <label>密码</label>
                    <input defaultValue={user.password} name="password" type="password" className="form-control"
                           placeholder="请输入密码" required/>
                </div>
                <div className="form-group">
                    <label>年龄</label>
                    <input defaultValue={user.age} name="age" type="number" className="form-control"
                           placeholder="请填写年龄" required/>
                </div>
                <div className="form-group">
                    <label>邮箱</label>
                    <input defaultValue={user.email} name="email" type="email" className="form-control"
                           placeholder="请填写邮箱" required/>
                </div>
                <div className="form-group">
                    <label>请选择爱好</label>
                </div>
            <div>
                {
                    hobbies.map((item,i) => (<label key={i} className="checkbox-inline">
                                <input type="checkbox" value={item} name="hobbies"
                                       defaultChecked={user["hobbies"].includes(item)}/> {item}
                            </label>))
                }
            </div>
                <input type="submit" className="btn btn-primary" value="修改用户"/>
            </form>
        </div>))
}
export default Modify;