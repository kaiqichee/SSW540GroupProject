
export function Signup() {
    return (
        <div class="d-flex justify-content-center" >
            <form class="w-25 p-3">
                <div class="form-group p-2">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Student Name"/>
                </div>
                <div class="form-group p-2">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="stevens@stevens.edu"/>
                </div>
                <div class="form-group p-2">
                    <label for="CWID">CWID</label>
                    <input type="text" class="form-control" id="CWID" placeholder="00000000"/>
                </div>
                <div class="form-group p-2">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password"/>
                </div>
                <button type="submit" class="btn btn-primary">Signup</button>
            </form>
        </div>
    );
}
