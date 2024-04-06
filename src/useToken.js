import { useContext } from "react";
import TokenContext from "./TokenContext";

function useToken() {
    return useContext(TokenContext);
}

export default useToken;