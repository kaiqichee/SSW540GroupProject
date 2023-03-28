
import axios from "axios";

export function Login() {
    async function verifyUser(e){
        e.preventDefault()
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let {data} = await axios.post('http://localhost:3001/users/login', {
            email,
            password
          })
        if (data){
            localStorage.setItem("name", data.name)
            localStorage.setItem("email", data.email)
            localStorage.setItem("cwid", data.cwid)
            localStorage.setItem('loggedIn', true);
            window.location.href = "/";
            return;
        }else{
            console.log("bad!")
        }
    }
    return (
        <div className="d-flex justify-content-center" >
            <form className="border rounded w-25 p-3 mt-5" onSubmit={verifyUser}>
                <div className="form-group p-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="stevens@stevens.edu"/>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
