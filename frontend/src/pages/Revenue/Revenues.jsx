import styles from "./Revenue.module.css";
import { getUserRevenue } from "../../slice/revenueSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    BsFillEyeFill,
    BsFillTrash3Fill,
    BsFillPencilFill,
} from "react-icons/bs";

const Revenues = () => {
    const { revenues, loading, error } = useSelector((state) => state.revenue);

    const dispatch = useDispatch();

    const dataFormat = (createdAt) => {
        const datadiv = createdAt.split("T")[0];
        const newDate = new Date(datadiv).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        });
        return newDate;
    };

    useEffect(() => {
        dispatch(getUserRevenue());
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Aqui estão suas receitas salva</h2>
            {revenues &&
                revenues.map((rev) => (
                    <div key={rev._id}>
                        <p>{dataFormat(rev.createdAt)}</p>
                        <p>{rev.weight}</p>
                        <p>{rev.age}</p>
                        <p>{rev.drops}</p>
                        <p>{rev.userName}</p>
                        <div className="actions">
                            <BsFillEyeFill />
                            <BsFillPencilFill />
                            <BsFillTrash3Fill />
                        </div>
                    </div>
                ))}
            {!revenues && <p>Ainda não existe receita salva</p>}
        </div>
    );
};

export default Revenues;
