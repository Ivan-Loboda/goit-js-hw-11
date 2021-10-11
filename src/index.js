import './sass/main.scss';

import { debounce } from 'lodash';
import Notiflix from 'notiflix';

import { fetchImages } from './js/fetchImages'

const inputForm = document.querySelector('#search-form');



inputForm.addEventListener('submit', debounce(getData, 300));







function getData(e) {
    e.prevent.default();
    const inputData = inputForm.value.trim();
    // countryCard.innerHTML = '';
    // countryList.innerHTML = '';
    // clearCards();

    if (!inputData) {
        return;
    };
    fetchImages(inputData)
        .then((data) => {
            console.log(data)
            if (data.status === 404) {
                return Notiflix.Notify.info("Oops, there is no country with that name.")
            };
            if (data.length > 10) {
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            };
            // if (data.length === 1) {
            //     return printOne(data)
            // };
            // return printMany(data);
        })
        .catch((error) => console.error(error))
};