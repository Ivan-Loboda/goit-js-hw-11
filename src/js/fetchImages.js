const baseUrl = 'https://pixabay.com/api/?key=23763400-56e03b3c97aa031975e4c0255';
const filterUrl = '&image_type=photo&orientation=horizontal&safesearch=true';
const filterData = '&webformatURL&largeImageURL&tags&likes&views&comments&downloads'

export const fetchImages = (inputData) => {
    return fetch(`${baseUrl}&q${inputData}${filterUrl}${filterData}`)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.status);
        })
};