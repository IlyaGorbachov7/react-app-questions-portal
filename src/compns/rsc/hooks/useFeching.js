import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({
        isError: false,
        errorEvent: undefined
    })

    const fetching = async () => {
        try {
            setLoading(true)
            await callback();
        } catch (e) {
            setError({
                isError: true,
                errorEvent: e
            })
        } finally {
            setLoading(false)
        }
    }
    return [fetching, isLoading, error]
}