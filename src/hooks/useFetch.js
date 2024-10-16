import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { getUserInfoDetails } from '../utlis';
const { companyId, clientId } = getUserInfoDetails()

const cache = {};

const useFetch = (url, param = {}) => {
    const paramsObj = Object.keys(param).length ? param : { company: companyId, client: clientId }
    const [data, setData] = useState(cache[url] || null);
    const [loading, setLoading] = useState(!cache[url]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(url, { params: paramsObj })
            const result = response.data
            cache[`${url}_${JSON.stringify(paramsObj)}`] = result;
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        if (!cache[url]) {
            fetchData();
        }
    }, [url, fetchData]);

    const refetch = () => {
        delete cache[url];
        fetchData();
    };

    return { data, loading, error, refetch };
};

export default useFetch;
