import axios from "axios";
import React, {useEffect, useState} from 'react';

export default function CurrentSeats() {
    let [allRes, setAllRes] = useState([]);
    let [currentRes, setCurrentRes] = useState([]);
    let [totalSeats, setTotalSeats] = useState();

    useEffect(() => {
        async function getAllRes(){
            let {data} = await axios.get(`http://localhost:3001/reservations/`);
            setAllRes(data);
            setCurrentRes(data.filter((x) => isNow(x)))
            return
        }
        async function getAllSeats(){
            let {data} = await axios.get(`http://localhost:3001/tables/`);
            let total = 0;
            for (let i of data){
                total += i.seats
            }
            setTotalSeats(total);
            return
        }
        getAllRes();
        getAllSeats();
    }, [])

    function isNow(res){
        let startTime = new Date(res.startTime)
        let endTime = new Date(res.endTime)
        let currentDate = new Date()
        return (startTime<=currentDate && currentDate<=endTime)
    }

    return (
        <div className="d-flex flex-column justify-content-center border rounded w-25 p-3 mt-5" >
            <p>Current Occupied Seats: </p>
            <h1>{currentRes.length}/{totalSeats}</h1>
        </div>
    );
}