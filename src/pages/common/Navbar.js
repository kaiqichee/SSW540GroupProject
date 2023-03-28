
export function Navbar() {
    if (localStorage.getItem("loggedIn") == "false"){
        return (
            <nav className="navbar navbar-expand-lg bg-light border-bottom py-3 px-5 d-flex justify-content-between">
                <a className="navbar-brand" href="/">Home</a>
                <div className="d-flex">
                    <a className="p-2 nav-link" href="/signup">Signup</a>
                    <a className="p-2 nav-link" href="/login">Login</a>
                </div>
            </nav>
        );
    }
    else {
        return (
            <nav className="navbar navbar-expand-lg bg-light border-bottom py-3 px-5 d-flex justify-content-between">
                <a className="navbar-brand" href="/">Home</a>
                <div className="d-flex">
                    <a className="p-2 nav-link" href="/reserve">Reserve</a>
                    <a className="p-2 nav-link" href="/profile">Profile</a>
                </div>
            </nav>
        );
    }
}
