import axios from "axios";
import React from 'react';

export function CreateRes() {
    let [studentName, setStudentName] = React.useState(localStorage.getItem("name"));
    let [email, setEmail] = React.useState(localStorage.getItem("email"));

    async function createUser(e){
        e.preventDefault()
        let {data} = await axios.post('http://localhost:3001/reservations/', {
            studentName,
            email,
            // startTime,
            // endTime,
            // tableNum
          })
        if (data){
            window.history.pushState("/login");
            return;
        }else{
            console.log("bad!")
        }
    }
    return (
        <div className="d-flex justify-content-center" >
            <form className="border rounded w-25 p-3 mt-4 mb-5" onSubmit={createUser}>
                <div className="form-group p-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder={studentName} readOnly />
                </div>
                <div className="form-group p-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder={email} readOnly/>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="cwid">Start Time</label>
                    <input type="datetime-local" className="form-control" id="cwid" placeholder="00000000"/>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="password">End Time</label>
                    <input type="datetime-local" className="form-control" id="password"/>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="password">Table #</label>
                    <input type="number" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary pt-2">Reserve</button>
            </form>
        </div>
    );
}
