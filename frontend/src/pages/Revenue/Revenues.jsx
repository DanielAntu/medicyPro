import styles from "./Revenue.module.css";
import { deleteRevenue, getUserRevenue } from "../../slice/revenueSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    BsFillEyeFill,
    BsFillTrash3Fill,
    BsFillPencilFill,
} from "react-icons/bs";
import { useResetMessage } from "../../hooks/useResetMessage";
import Message from "../../components/Message/Message";
import { useFormatData } from "../../hooks/useFormatData";

const Revenues = () => {
    const { revenues, loading, error, message } = useSelector(
        (state) => state.revenue
    );

    const dispatch = useDispatch();

    const resetMessage = useResetMessage(dispatch);

    const formatData = useFormatData();

    const handleDelete = (id) => {
        dispatch(deleteRevenue(id));

        resetMessage();
    };

    useEffect(() => {
        dispatch(getUserRevenue());
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.revenue}>
            <h2>Aqui estão suas receitas salva</h2>
            {revenues.length > 0 && (
                <div className={styles.header}>
                    <p>Criação</p>
                    <p>Peso</p>
                    <p>Idade</p>
                    <p>Doses</p>
                    <p>ações</p>
                </div>
            )}
            {revenues.length > 0 &&
                revenues.map((rev) => (
                    <div className={styles.body} key={rev._id}>
                        <p>{formatData(rev.createdAt)}</p>
                        <p>{rev.weight}</p>
                        <p>{rev.age}</p>
                        <p>{rev.drops}</p>
                        <div className={styles.actions}>
                            <Link to={`/revenue/${rev._id}`}>
                                <BsFillEyeFill />
                            </Link>
                            <Link to={`/edit/${rev._id}`}>
                                <BsFillPencilFill className={styles.edit} />
                            </Link>
                            <BsFillTrash3Fill
                                onClick={() => handleDelete(rev._id)}
                            />
                        </div>
                    </div>
                ))}
            {revenues.length === 0 && (
                <p className={styles.not}>Ainda não existe receita salva</p>
            )}
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
        </div>
    );
};

export default Revenues;
