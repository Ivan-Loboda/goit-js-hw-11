import axios from "axios";
import Notiflix from 'notiflix';

const baseUrl = 'https://pixabay.com/api/?key=23763400-56e03b3c97aa031975e4c0255';
// const key = 'key=23763400-56e03b3c97aa031975e4c0255';
const filterUrl = '&image_type=photo&orientation=horizontal&safesearch=true';


export const fetchImages = async (inputData, page) => {
    const data = await axios.get(`${baseUrl}&q=${inputData}${filterUrl}&page=${page}&per_page=40`)

    if (data.status >= 200 && data.status < 300) {
        return data;
    }
    if (data.status === 404) {
        return Notiflix.Notify.info("Oops, there is no country with that name.")
    };
    throw new Error(data.status);

};

