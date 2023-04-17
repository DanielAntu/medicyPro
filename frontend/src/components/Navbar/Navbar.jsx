import styles from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
    const { auth } = useAuth();

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
