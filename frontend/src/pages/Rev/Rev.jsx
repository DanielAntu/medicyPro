import styles from "./Rev.module.css";

// router
import { Link } from "react-router-dom";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormatData } from "../../hooks/useFormatData";

// redux
import { getRevenuebyId, resetMessages } from "../../slice/revenueSlice";

const Rev = () => {
    const { id } = useParams();

    const { revenue, loading } = useSelector((state) => state.revenue);

    const dispatch = useDispatch();

    const formatData = useFormatData();

    useEffect(() => {
        dispatch(getRevenuebyId(id));

        dispatch(resetMessages());
    }, [dispatch, id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Receituario</h2>
            <div>
                <p>Data: {formatData(revenue.createdAt)}</p>
                <p>Nome: {revenue.userName}</p>
            </div>
            <p>Peso: {revenue.weight}</p>
            <p>Age: {revenue.age}</p>
            <p>Dose: {revenue.drops}</p>
            <p>Tome remédios apenas prescrição medica</p>
            <Link to="/revenues" className="btn">
                Voltar
            </Link>
        </div>
    );
};

export default Rev;
