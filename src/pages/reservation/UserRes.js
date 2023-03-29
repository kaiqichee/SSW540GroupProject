import axios from "axios";
import React, {useEffect, useState} from 'react';
import Modal from "../common/Modal.js";

export function UserRes() {
    let [studentName, setStudentName] = useState(localStorage.getItem("name"));
    let [email, setEmail] = useState(localStorage.getItem("email"));
    let [cwid, setCwid] = useState(localStorage.getItem("cwid"));
    let [allRes, setAllRes] = useState([]);
    let [show, setShow] = useState(false);
    let [confirmShow, setConfirmShow] = useState(false);
    let [currentId, setCurrentId] = useState("");

    useEffect(() => {
        async function getAllRes(id){
            let {data} = await axios.get(`http://localhost:3001/reservations/${id}/`);
            setAllRes(data.sort((a,b) => (new Date(b.startTime))-(new Date(a.startTime))));
            return
        }
        getAllRes(cwid);
    }, [])
    
    if(localStorage.getItem("loggedIn") == "false"){
        window.location.href = "/login";
        return;
    }
    else {
        
        const handleClose = () => {
            setShow(false);
            setConfirmShow(false);
        }

        const handleShow = (id) => {
            setCurrentId(id);
            setShow(true);
        }

        const handleConfirmShow = (id, now) => {
            if (now) {
                setCurrentId(id);
                setConfirmShow(true);
            }
            else {
                return false;
            }
        }

        function sendToEdit(id, editable) {
            if (editable){
                localStorage.setItem("currentId", id)
                window.location.href = '/res/edit';
                return;
            } else {
                return false;
            }
        }

        async function deleteRes(){
            let {data} = await axios.delete(`http://localhost:3001/reservations/${currentId}/delete`);
            console.log(data);
            let updateData = await axios.get(`http://localhost:3001/reservations/${cwid}/`);
            data = updateData.data;
            setAllRes(data.sort((a,b) => ((new Date(b.startTime))-new Date(a.startTime))));
            setShow(false);
        }

        
        async function confirmRes(){
            let {data} = await axios.post(`http://localhost:3001/reservations/${currentId}/confirm`);
            console.log(data)
            let updateData = await axios.get(`http://localhost:3001/reservations/${cwid}/`);
            data = updateData.data;
            console.log(data)
            setAllRes(data.sort((a,b) => ((new Date(b.startTime))-new Date(a.startTime))));
            setConfirmShow(false);
        }
       
       
         
        let timeOptions = {
            weekday: "long",
            year: "2-digit",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }

        function tableRow(res, i){
            let editable = true
            let editColor = "currentColor"
            let startTime = new Date(res.startTime)
            let endTime = new Date(res.endTime)
            let currentDate = new Date()
            let isNow = (startTime<=currentDate && currentDate<=endTime)

            if (startTime<=currentDate) {
                editable = false
                editColor = "#BEBEBE"
            }
            let clickConfirm =   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>

            let confirmed =   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>

            let notConfirmed = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>

            let rubbishIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>

            let editIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={editColor} className="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>

            return (
                <tr  key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{startTime.toLocaleString("en-US", timeOptions)}</td>
                    <td>{endTime.toLocaleString("en-US", timeOptions)}</td>
                    <td>{res.tableNum}</td>
                    <td>
                        <a onClick={() => handleConfirmShow(res._id, isNow)}>
                            {(isNow && !res.confirmed) ? clickConfirm : (res.confirmed ? confirmed : notConfirmed)}
                        </a>
                    </td>
                    <td><a onClick={() => sendToEdit(res._id, editable)}>{editIcon}</a></td>
                    <td><a onClick={() => handleShow(res._id)}>{rubbishIcon}</a></td>

                </tr>
            )
        }  
        return (
            <div className="d-flex justify-content-center border rounded m-3" >
               <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Table</th>
                        <th scope="col">Confirmed</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {allRes.map((res, i) => tableRow(res, i))}
                </tbody>
               </table>
    
            <Modal show={show} handleClose={handleClose} title="Delete Reservation" message="Are you sure you want to delete this reservation?" delete={deleteRes} buttonCol="danger" />
            <Modal show={confirmShow} handleClose={handleClose} title="Confirm Reservation" message="Would you like to confirm the reservation?" delete={confirmRes} buttonCol="success" />

            </div>
        );
    }
    
}
