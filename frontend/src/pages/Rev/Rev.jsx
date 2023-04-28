import styles from "./Rev.module.css";

// router
import { Link } from "react-router-dom";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getRevenuebyId, resetMessages } from "../../slice/revenueSlice";

const Rev = () => {
    const { id } = useParams();

    const { revenue, loading } = useSelector((state) => state.revenue);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRevenuebyId(id));

        dispatch(resetMessages());
    }, [dispatch, id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.rev}>
            <h2>Receituario</h2>
            <div className={styles.title}>
                <p>Nome: {revenue.userName}</p>
            </div>
            <p>Peso: {revenue.weight} kg</p>
            <p>Age: {revenue.age} anos</p>
            <p>Dose: {revenue.drops} gotas</p>
            <p>Tome remédios apenas prescrição medica</p>
            <Link to="/revenues" className="btn">
                Voltar
            </Link>
        </div>
    );
};

export default Rev;
