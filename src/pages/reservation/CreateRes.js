import axios from "axios";
import React, {useEffect} from 'react';

export function CreateRes() {
    let [studentName, setStudentName] = React.useState(localStorage.getItem("name"));
    let [email, setEmail] = React.useState(localStorage.getItem("email"));
    let [success, setSuccess] = React.useState(true);
    if(localStorage.getItem("loggedIn") == "false"){
        window.location.href = "/login";
        return;
    }
    else {
        async function createUser(e){
            e.preventDefault()
            let startTime = document.getElementById("startTime").value
            let endTime = document.getElementById("endTime").value
            let tableNum = document.getElementById("tableNum").value
            let cwid = localStorage.getItem("cwid")

            console.log()
            let {data} = await axios.post('http://localhost:3001/reservations/', {
                name: studentName,
                email,
                cwid,
                startTime,
                endTime,
                tableNum
            })
            if (data){
                document.getElementById("resForm").reset();
                setSuccess(false)
                return;
            }else{
                console.log("bad!")
            }
        }
        return (
            <div className="d-flex justify-content-center" >
                <form className="border rounded w-25 p-3 mt-4 mb-5" id="resForm" onSubmit={createUser}>
                    <div className="form-group p-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder={studentName} readOnly/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder={email} readOnly/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="startTime">Start Time</label>
                        <input type="datetime-local" className="form-control" id="startTime" placeholder="00000000"/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="endTime">End Time</label>
                        <input type="datetime-local" className="form-control" id="endTime"/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="tableNum">Table #</label>
                        <input type="number" className="form-control" id="tableNum"/>
                    </div>
                    <button type="submit" className="btn btn-primary pt-2">Reserve</button>
                    <p hidden={success} className="pt-2 text-success">Success creating reservation!</p>
                    {/* <p hidden={error}>Error creating reservation, please try again!</p> */}
                </form>
            </div>
        );
    }
}
