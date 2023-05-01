import styles from "./Edit.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRevenue, getRevenuebyId } from "../../slice/revenueSlice";
import { useResetMessage } from "../../hooks/useResetMessage";
import Message from "../../components/Message/Message";
import { useDrops } from "../../hooks/useDrops";
import { useParams, Link } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [drops, setDrops] = useState("");

    const dispatch = useDispatch();

    const resetMessage = useResetMessage(dispatch);

    const { revenue, loading, error, message } = useSelector(
        (state) => state.revenue
    );

    useEffect(() => {
        dispatch(getRevenuebyId(id));
    }, [dispatch, id]);

    const { res, rdrops } = useDrops(weight, age);

    useEffect(() => {
        setWeight(revenue.weight);
        setAge(revenue.age);
    }, [revenue]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const Revenue = {
            id: id,
            weight: weight.toString(),
            age: age.toString(),
            drops: rdrops.toString(),
        };

        dispatch(updateRevenue(Revenue));

        resetMessage();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.edit}>
            <h2>Edite Sua Receita</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Digite seu peso"
                    onChange={(e) => setWeight(e.target.value)}
                    defaultValue={weight}
                />
                <input
                    type="number"
                    placeholder="Digite Sua idade"
                    onChange={(e) => setAge(e.target.value)}
                    defaultValue={age}
                />
                <input
                    type="hidden"
                    onChange={(e) => setDrops(drops)}
                    value={rdrops}
                />
                {!loading && (
                    <input type="submit" value="Editar" className="btn" />
                )}
                {loading && (
                    <input
                        type="submit"
                        value="Aguarde..."
                        disabled
                        className="btn"
                    />
                )}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
                <h3>{res}</h3>
            </form>
        </div>
    );
};

export default Edit;
