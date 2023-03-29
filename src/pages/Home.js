import CurrentSeats from "./home/CurrentSeats.js"
import SeatChart from "./home/SeatChart.js"

export function Home() {

    return (
        <div className="w-90 container" >
            <div className="row mt-5">
                <div className="col-8">
                    <SeatChart />
                </div>
                <div className="col-4">
                    <CurrentSeats />
                    <button className="btn btn-outline-primary w-100 mt-3 p-3" onClick={()=>window.location.href="/reserve"}>Create Reservation</button>
                    <button className="btn btn-outline-primary w-100 mt-3 p-3" onClick={()=>window.location.href="/myReservations"}>My Reservations</button>
                    <button className="btn btn-outline-primary w-100 mt-3 p-3" onClick={()=>window.location.href="/profile"}>My Profile</button>

                </div>

            </div>
           
        </div>
    );
}
