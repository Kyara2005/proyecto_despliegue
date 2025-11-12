// useFetch.js
import axios from "axios";
import { toast } from "react-toastify";

export function useFetch() {
    const fetchDataBackend = async (endpoint, data = null, method = "POST", headers = {}) => {
        const loadingToast = toast.loading("Procesando solicitud...");

        try {
            // Construimos la URL completa usando la variable de entorno
            const url = `${import.meta.env.VITE_BACKEND_URL}${endpoint}`;

            const options = {
                method,
                url,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                data
            };

            const response = await axios(options);

            toast.dismiss(loadingToast);
            return response.data; // devuelve directamente los datos del backend

        } catch (error) {
            toast.dismiss(loadingToast);
            console.error(error);
            toast.error(error.response?.data?.msg || "Ocurrió un error inesperado");
            throw error; // para que el componente que llama pueda capturarlo
        }
    };

    return fetchDataBackend;
}
