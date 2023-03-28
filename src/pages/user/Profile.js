import React from 'react';

export function Profile() {
    let [studentName, setStudentName] = React.useState(localStorage.getItem("name"));
    let [email, setEmail] = React.useState(localStorage.getItem("email"));
    let [cwid, setSuccess] = React.useState(localStorage.getItem("cwid"));
    function logout(){
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('cwid');
        localStorage.setItem('loggedIn', false);
        window.location.href = "/";
    }
    return (
        <div className="d-flex justify-content-center" >
            <div className="border rounded w-25 p-3 mt-5">
                <h3 className=''>Hello {studentName}!</h3>
                <div className="p-2">
                   <p className=''>Name: {studentName}</p>
                </div>
                <div className="p-2">
                    <p>Email: {email}</p>
                </div>
                <div className="p-2">
                    <p>CWID: {cwid}</p>
                </div>
                <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}
