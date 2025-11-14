import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()

        if(!username){
            setError("Please enter username");
            return;
        }

        const role = username === "admin" ? "admin" : "user";
        const user = { username, role };
        localStorage.setItem("user", JSON.stringify(user));
        setError("");

        if(role === "admin") {
            navigate("/admin", { replace: true });
        } else {
            navigate("/",{ replace: true});
        }
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}
export default Login;