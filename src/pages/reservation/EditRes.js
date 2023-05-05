import axios from "axios";
import React, {useEffect} from 'react';

export function EditRes() {
    console.log("1")
    let [studentName, setStudentName] = React.useState(localStorage.getItem("name"));
    let [email, setEmail] = React.useState(localStorage.getItem("email"));
    let [currentId, setCurrentId] = React.useState(localStorage.getItem("currentId"));
    let [res, setRes] = React.useState(undefined);
    let [startTime, setStartTime] = React.useState(undefined);
    let [endTime, setEndTime] = React.useState(undefined);
    let [confirmed, setConfirmed] = React.useState(undefined);

    useEffect(() => {
        console.log("-----------")
        async function getRes(id){
            let {data} = await axios.get(`http://localhost:3001/reservations/res/${id}/`);
            console.log(data)
            setRes(data);
            return
        }
        getRes(currentId);
    }, [])

    useEffect(()=>{
        if (res){
            console.log(res)
            setStartTime(res.startTime);
            setEndTime(res.endTime);
            setConfirmed(res.confirmed);
        }

    }, [res])
    
    if(localStorage.getItem("loggedIn") == "false"){
        window.location.href = "/login";
        return;
    }
    else if(localStorage.getItem("currentId")==undefined){
        window.location.href = "/myReservations";
        return;
    }
    else {
        async function updateRes(e){
            e.preventDefault()
            let startTime = document.getElementById("startTime").value
            let endTime = document.getElementById("endTime").value
            let tableNum = document.getElementById("tableNum").value
            let cwid = localStorage.getItem("cwid")

            console.log(startTime, endTime)

            let {data} = await axios.patch(`http://localhost:3001/reservations/${currentId}/edit`, {
                name: studentName,
                email,
                cwid,
                startTime,
                endTime,
                tableNum,
                confirmed
            })
            if (data){
                let {data} = await axios.get(`http://localhost:3001/reservations/res/${currentId}/`);
                setRes(data);
                document.getElementById("updateForm").reset();
                window.location.href="/myReservations"
                return;
            }else{
                console.log("bad!")
            }
        }
        return (
            <div className="d-flex justify-content-center" >
                <form className="border rounded w-25 p-3 mt-4 mb-5" id="updateForm" onSubmit={updateRes}>
                    <div className="form-group p-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" value={studentName} placeholder={studentName} readOnly/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" value={email} placeholder={email} readOnly/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="startTime">Start Time</label>
                        <input type="datetime-local" className="form-control" id="startTime" value={res && res.startTime ? startTime : undefined} onChange={() => setStartTime(document.getElementById("startTime").value)}/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="endTime">End Time</label>
                        <input type="datetime-local" className="form-control"  value={res && res.endTime ? endTime : undefined} onChange={() => setEndTime(document.getElementById("endTime").value)} id="endTime"/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="tableNum">Table #</label>
                        <input type="number" className="form-control" placeholder={res && res.tableNum} id="tableNum"/>
                    </div>
                    <button type="submit" className="btn btn-primary pt-2">Update!</button>
                    {/* <p hidden={error}>Error creating reservation, please try again!</p> */}
                </form>
            </div>
        );
    }
}
