import {Link} from "react-router-dom";
import {useState} from "react";
import {allUsersRoute, deleteRoute} from "../utile/ApiRouters";

function UsersList() {
    const [users, setUsers] = useState([]);
    fetch(allUsersRoute)
        .then(res => res.json())
        .then(res => setUsers(res))
        .catch(err => console.log(err));
    return (
        <div className="container">
            <h6>
                <Link to="add" className="btn btn-primary">添加用户</Link>
            </h6>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>用户名</th>
                    <th>密码</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(({username, password}, i) => (
                        <tr key={i}>
                            <td>{username}</td>
                            <td>{password}</td>
                            <td>
                                <button onClick={() => {
                                    fetch(`${deleteRoute}/${username}`, {method: 'delete'})
                                        .then(res => res.json())
                                        .catch(err=>console.log(err)
                                )
                                    ;
                                }} className="btn btn-danger btn-xs">删除
                                </button>
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
