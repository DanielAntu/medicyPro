import styles from "./Navbar.module.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../slice/authSlice";

const Navbar = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    };

    return (
        <nav className={styles.navbar}>
            <h2>
                <Link to="/">MedicyPro</Link>
            </h2>
            <ul>
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Perfil</NavLink>
                        </li>
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/register">Cadastrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
