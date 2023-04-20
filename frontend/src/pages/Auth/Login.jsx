import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../slice/authSlice";
import Loading from "../../components/Loading/Loading";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        dispatch(login(user));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div className={styles.auth}>
            <h2 className="title">Faça o Login para continuar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite seu e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="off"
                />
                <Loading
                    loading={loading}
                    error={error}
                    msg={error}
                    type="error"
                    btnvalue="Entrar"
                />
            </form>
            <p>
                Não tem conta? <Link to="/register">Clique Aqui</Link>
            </p>
        </div>
    );
};

export default Login;
