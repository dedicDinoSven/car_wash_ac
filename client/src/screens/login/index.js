import React, { useEffect, useState } from "react";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Validation from "../../utils/validation";
import { toast } from "react-toastify";
import { login, reset } from "../../redux/authSlice";

const Login = () => {
    const [data, setData] = useState({
        email: "", password: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userData, isSuccess, isError, message } = useSelector(
        (state) => state.auth);

    const handleSubmit = () => {
        if (!Validation.validateEmail(data.email))
            toast.error("Please enter valid email!");

        dispatch(login(data));
    };

    useEffect(() => {
        if (isError) toast.error(message);

        if (isSuccess || userData) navigate("/dashboard");

        dispatch(reset());
    }, [userData, isSuccess, isError, message, navigate, dispatch]);

    return (
        <div className="login-wrapper">
            <div className="login-form">
                <h1>Login</h1>
                <InputField type="email" id="email" name="email"
                            placeholder="Email *" autoFocus value={data.email}
                            setValue={(e) => setData(
                                { ...data, email: e.target.value })} />
                <InputField type="password" id="password" name="password"
                            placeholder="Password *" value={data.password}
                            setValue={(e) => setData(
                                { ...data, password: e.target.value })} />
                <Button onClick={handleSubmit} variant="submit"
                        disabled={!data.email || data.email === "" ||
                        !data.password || data.password === ""}
                        style={{ marginTop: "30px" }}>Submit</Button>
            </div>
        </div>
    );
};

export default Login;