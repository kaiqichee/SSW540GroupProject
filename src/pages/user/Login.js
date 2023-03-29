
import axios from "axios";
import {useState} from "react"

export function Login() {
    let [error, setError] = useState(true);

    if(localStorage.getItem("loggedIn") == "true"){
        window.location.href = "/";
        return;
    }
    else {
        async function verifyUser(e){
            e.preventDefault()
            let email = document.getElementById("email").value
            let password = document.getElementById("password").value
            try {
                let {data} = await axios.post('http://localhost:3001/users/login', {
                    email,
                    password
                })
                if (data) {
                    localStorage.setItem("name", data.name)
                    localStorage.setItem("email", data.email)
                    localStorage.setItem("cwid", data.cwid)
                    localStorage.setItem("loggedIn", true);
                    window.location.href = "/";
                    return;
                }
                else {
                    throw "Invalid Login";
                }
            }catch(e){
                setError(false)
                console.log("bad!")
            }
        }
        return (
            <div className="d-flex justify-content-center" >
                <form className="border rounded w-25 p-3 mt-5" onSubmit={verifyUser}>
                    <div className="form-group p-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="stevens@stevens.edu" onChange={() => setError(true)}/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" onChange={() => setError(true)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p hidden={error} className="pt-2 text-danger">Ohno, invalid login, please try again!</p>
                </form>
            </div>
        );
    }
}
