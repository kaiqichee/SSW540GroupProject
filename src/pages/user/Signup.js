import axios from "axios";

export function Signup() {
    async function createUser(e){
        e.preventDefault()
        let name = document.getElementById("name").value
        let email = document.getElementById("email").value
        let cwid = document.getElementById("cwid").value
        let password = document.getElementById("password").value
        let {data} = await axios.post('http://localhost:3001/users/', {
            name,
            email,
            password,
            cwid
          })
        if (data){
            window.location.href = "/login";
            return;
        }else{
            console.log("bad!")
        }
    }
    return (
        <div className="d-flex justify-content-center" >
            <form className="border rounded w-25 p-3 mt-5" onSubmit={createUser}>
                <div className="form-group p-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Student Name"/>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="stevens@stevens.edu"/>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="cwid">CWID</label>
                    <input type="text" className="form-control" id="cwid" placeholder="00000000"/>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary pt-2">Signup</button>
            </form>
        </div>
    );
}
