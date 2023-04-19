import styles from "./Auth.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../slice/authSlice";
import Loading from "../../components/Loading/Loading";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { loading, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password,
            confirmPassword,
        };

        dispatch(register(user));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div className={styles.auth}>
            <h2 className="title">
                Faça seu Regitro e aproveite nossos serviços
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite Seu nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ""}
                />

                <input
                    type="email"
                    placeholder="Digite seu E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ""}
                />

                <input
                    type="password"
                    placeholder="Digite sua Senha"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ""}
                />

                <input
                    type="password"
                    placeholder="Confirme sua Senha"
                    autoComplete="off"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword || ""}
                />

                <Loading
                    loading={loading}
                    error={error}
                    msg={error}
                    type="error"
                    btnValue="Cadastrar"
                />
            </form>
            <p>
                Já tem conta? <Link to="/login">Clique Aqui</Link>
            </p>
        </div>
    );
};

export default Register;
