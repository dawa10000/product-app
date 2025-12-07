import axios from "axios";
import { useEffect, useState } from "react";






export const useApi = (apiUrl, params) => {
    const [data, setData] = useState();
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState();

    const getData = async () => {
        try {
            setLoad(true);
            const response = await axios.get(apiUrl, {
                params
            });

            setLoad(false);
            setData(response.data);
        } catch (err) {

            setLoad(false);
            setErr(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return [data, load, err];
}





