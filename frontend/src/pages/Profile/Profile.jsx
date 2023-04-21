import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profile, resetMessage, updateProfile } from "../../slice/userSlice";
import Message from "../../components/Message/Message";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, loading, message, error } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name,
        };

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = password;
        }

        await dispatch(updateProfile(user));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.profile}>
            <h2>Edite seu perfil</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={name}
                />
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={email}
                    disabled
                />
                <input
                    type="password"
                    onChange={(e) => e.target.value}
                    value={password}
                    autoComplete="off"
                    placeholder="Digite sua senha"
                />
                {!loading && (
                    <input type="submit" value="Editar" className="btn" />
                )}
                {loading && (
                    <input
                        type="submit"
                        value="Aguardar..."
                        disabled
                        className="btn"
                    />
                )}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    );
};

export default Profile;
