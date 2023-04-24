import { useState, useEffect } from "react";

export const useDrops = (weight, age) => {
    const [res, setRes] = useState("");
    const [drops, setDrops] = useState(0);
    const [rdrops, setRdrops] = useState(0);

    useEffect(() => {
        setDrops(500 / 20);

        if (weight < 5) {
            setRes("Não pode tomar remédio. Consulte o médico");
        } else {
            if (age >= 12) {
                if (weight >= 60) {
                    setRdrops(1000 / drops);
                    setRes(`Tomar ${rdrops} gotas`);
                } else {
                    setRdrops(875 / drops);
                    setRes(`Tomar ${rdrops} gotas`);
                }
            } else {
                if (weight <= 9) {
                    setRdrops(125 / drops);
                    setRes(`Tomar ${rdrops} gotas`);
                } else if (weight <= 16) {
                    setRdrops(250 / drops);
                    setRes(`Tomar ${rdrops} gotas`);
                } else if (weight <= 24) {
                    setRdrops(375 / drops);
                    setRes(`Tomar ${rdrops} gotas`);
                } else if (weight <= 30) {
                    setRdrops(500 / drops);
                    setRes(`Tomar ${rdrops} gotas`);
                } else {
                    setRdrops(750 / drops);
                    setRes(`Tomar ${rdrops} gotas`);
                }
            }
        }
    }, [weight, age, drops, rdrops]);

    return { res, rdrops };
};
