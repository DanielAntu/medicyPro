export const useFormatData = () => {
    const formatData = (createdAt) => {
        const datadiv = createdAt.split("T")[0];
        const newDate = new Date(datadiv).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        });
        return newDate;
    };

    return formatData;
};
