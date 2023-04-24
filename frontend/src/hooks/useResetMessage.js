import { resetMessages } from "../slice/revenueSlice";

export const useResetMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetMessages());
        }, 2000);
    };
};
