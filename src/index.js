import './sass/main.scss';

import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import { fetchImages } from './js/fetchImages'

const inputForm = document.querySelector('#search-form');
// const inputData = document.querySelector('#search-form input');
const inputData = inputForm.elements['searchQuery'];
const galleryList = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')

let page = 1;

function clearCards() {
    galleryList.innerHTML = '';
}

const getData = async () => {
    if (!inputData.value) {
        return;
    };
    // console.log(inputData.value)

    await fetchImages(inputData.value, page)
        .then(response => {
            const parsedData = response.data.hits;
            console.log(parsedData)
            if (parsedData.length === 0) {
                Notiflix.Notify.failure(
                    'Sorry, there are no images matching your search query. Please try again.',
                );
            }
            else printImg(parsedData);
        })

    const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
    });

}

inputForm.addEventListener('submit', async e => {
    e.preventDefault();
    clearCards();
    await getData();
});


function printImg(data) {
    const markUp = data
        .map(item => {
            const { tags, likes, views, comments, downloads, webformatURL, largeImageURL } = item;
            return `<div class="photo-card">
                        <a href=${largeImageURL}>
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" width='200'/></a>
                        <div class="info">
                                <p class="info-item">
                                    <b>Likes:</b>${likes}
                                </p>
                                <p class="info-item">
                                    <b>Views:</b>${views}
                                </p>
                                <p class="info-item">
                                    <b>Comments:</b>${comments}
                                </p>
                                <p class="info-item">
                                    <b>Downloads:</b>${downloads}
                                </p>
                            </div>
                        </div>`;
        })
        .join('');
    galleryList.insertAdjacentHTML('beforeend', markUp);
}


loadMoreBtn.addEventListener('click', async e => {

    page += 1;
    await getData();
    console.log(page);
});