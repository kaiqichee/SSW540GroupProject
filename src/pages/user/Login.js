
import { redirect } from 'react-router-dom';
import axios from "axios";

export function Login() {
    async function verifyUser(e){
        e.preventDefault()
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        console.log(email, password)
        let verify = await axios({
            method:"post",
            url:"/users/login",
            data:{
                email,
                password
            }
        })
        console.log(verify)
     //   let verify = await users.verifyUser(email, password);
        if (true){
            return redirect("/signup")
        }
        else{
            console.log("bad!")
        }

    }
    return (
        <div className="d-flex justify-content-center" >
            <form className="w-25 p-3" onSubmit={verifyUser}>
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
