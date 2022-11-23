import {Link} from "react-router-dom";
import {useState} from "react";

function UsersList() {
    const [users,setUsers]=useState([]);
    fetch("http://localhost:8080/list").then(res=>res.json())
        .then(res=>{setUsers(res)});
    return (
        <div className="container">
            <h6>
                <Link to="add" className="btn btn-primary">添加用户</Link>
            </h6>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>用户名</th>
                    <th>年龄</th>
                    <th>爱好</th>
                    <th>邮箱</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(({name,age,email,hobbies,_id},i) =>(
                        <tr key={i}>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>
                                {hobbies.map((item,i) =>
                                <span key={i}>{item}</span>)}
                            </td>
                            <td>{email}</td>
                            <td>
                                <button onClick={()=>{
                                    fetch(`http://localhost:8080/remove?id=${_id}`).then(res=>res);
                                }} className="btn btn-danger btn-xs">删除</button>
                                <Link to={`modify/${_id}`} className="btn btn-success btn-xs">修改</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;
