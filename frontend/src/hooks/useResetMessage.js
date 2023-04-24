import { resetMessages } from "../slice/revenueSlice";

export const useResetMessage = (dispatch) => {
    setTimeout(() => {
        dispatch(resetMessages());
    }, 2000);
};
