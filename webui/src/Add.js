function Add() {
    let url="http://localhost:8080";
    return (
        <div className="container">
            <h3>添加用户</h3>
            <form method="post" action={`${url}/add`} target="_self">
                <div className="form-group">
                    <label>用户名</label>
                    <input name="name" type="text" className="form-control" placeholder="请填写用户名" required/>
                </div>
                <div className="form-group">
                    <label>密码</label>
                    <input name="password" type="password" className="form-control" placeholder="请输入密码" required/>
                </div>
                <div className="form-group">
                    <label>年龄</label>
                    <input name="age" type="number" className="form-control" placeholder="请填写年龄" required/>
                </div>
                <div className="form-group">
                    <label>邮箱</label>
                    <input name="email" type="email" className="form-control" placeholder="请填写邮箱" required/>
                </div>
                <div className="form-group">
                    <label>请选择爱好</label>
                    <div>
                        <label className="checkbox-inline">
                            <input type="checkbox" value="足球" name="hobbies"/> 足球
                        </label>
                        <label className="checkbox-inline">
                            <input type="checkbox" value="篮球" name="hobbies"/> 篮球
                        </label>
                        <label className="checkbox-inline">
                            <input type="checkbox" value="橄榄球" name="hobbies"/> 橄榄球
                        </label>
                        <label className="checkbox-inline">
                            <input type="checkbox" value="敲代码" name="hobbies"/> 敲代码
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">添加用户</button>
            </form>
        </div>
    )
}
export default Add;