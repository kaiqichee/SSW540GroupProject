import axios from "axios";
import React, {useEffect, useState} from 'react';
import Modal from "../common/Modal.js";
import {Button} from 'react-bootstrap';



export function UserRes() {
    let [studentName, setStudentName] = useState(localStorage.getItem("name"));
    let [email, setEmail] = useState(localStorage.getItem("email"));
    let [cwid, setCwid] = useState(localStorage.getItem("cwid"));
    let [allRes, setAllRes] = useState([]);
    let [show, setShow] = useState(false);
    let [deleteId, setDeleteId] = useState("");
    let [updated, setUpdate] = useState(false);

    useEffect(() => {
        async function getAllRes(id){
            let {data} = await axios.get(`http://localhost:3001/reservations/${id}/`);
            setAllRes(data);
            return
        }
        getAllRes(cwid);
    }, [])
    if(localStorage.getItem("loggedIn") == "false"){
        window.location.href = "/login";
        return;
    }
    else {
        
        const handleClose = () => setShow(false);
        const handleShow = (id) => {
            setDeleteId(id);
            setShow(true);
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
            let {data} = await axios.delete(`http://localhost:3001/reservations/${deleteId}/delete`);
            console.log(data);
            let updateData = await axios.get(`http://localhost:3001/reservations/${cwid}/`);
            data = updateData.data;
            setAllRes(data);
            setShow(false);
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

            let currentDate = new Date()
            if (new Date(res.startTime)<=currentDate) {
                editable = false
                editColor = "#BEBEBE"
            }
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
                    <td>{(new Date(res.startTime)).toLocaleString("en-US", timeOptions)}</td>
                    <td>{(new Date(res.endTime)).toLocaleString("en-US", timeOptions)}</td>
                    <td>{res.tableNum}</td>
                    <td>
                      {res.confirmed ? confirmed : notConfirmed}
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
    
            <Modal show={show} handleClose={handleClose} title="Delete Reservation" message="Are you sure you want to delete this reservation?" delete={deleteRes} />



            </div>
        );
    }
    
}
