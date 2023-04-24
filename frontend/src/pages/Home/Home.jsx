import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRevenue } from "../../slice/revenueSlice";
import { useResetMessage } from "../../hooks/useResetMessage";
import Message from "../../components/Message/Message";
import { useDrops } from "../../hooks/useDrops";

const Home = () => {
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [drops, setDrops] = useState("");
    const [idrops, setIdrops] = useState("");

    const { res, rdrops } = useDrops(weight, age);

    useEffect(() => {
        setIdrops(rdrops.toString());
        setDrops(res);
    }, [res]);

    const { loading, message, error } = useSelector((state) => state.revenue);

    const dispatch = useDispatch();

    const resetMessage = useResetMessage(dispatch);

    const handleSubmit = (e) => {
        e.preventDefault();

        const revenue = {
            weight,
            age,
            drops: idrops,
        };

        dispatch(createRevenue(revenue));

        resetMessage();
        setWeight("");
        setAge("");
    };

    return (
        <div className={styles.home}>
            <div className="formrevenue">
                <h2>Preencha o formulario para ter sua receita</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Seu peso"
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Sua idade"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        required
                    />
                    <input
                        type="hidden"
                        onChange={(e) => setIdrops(e.target.value)}
                        defaultValue={idrops}
                    />

                    {!loading && (
                        <input
                            className="btn"
                            type="submit"
                            value="Salvar Receita"
                        />
                    )}
                    {loading && (
                        <input
                            className="btn"
                            type="submit"
                            value="Aguarde..."
                            disabled
                        />
                    )}
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                    <h3>{drops}</h3>
                </form>
            </div>
        </div>
    );
};

export default Home;
