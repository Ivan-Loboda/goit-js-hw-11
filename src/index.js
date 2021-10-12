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
loadMoreBtn.style.display = 'none';
let page = 1;

function clearCards() {
    galleryList.innerHTML = '';
}

const getData = async (checkMsg) => {
    if (!inputData.value) {
        return;
    };

    const response = await fetchImages(inputData.value, page);

    const parsedData = response.data;
    if (parsedData.hits.length === 0) {
        return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
        );
    }

    printImg(parsedData.hits)
    loadMoreBtn.style.display = 'block';
    if (checkMsg) {
        Notiflix.Notify.info(
            `Hooray! We found ${parsedData.totalHits} images.`
        );
    }

    if (document.querySelectorAll('.photo-card').length >= parsedData.totalHits) {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
        );
    }


    const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
    });

}

inputForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearCards();
    page = 1;
    await getData(true);
});


function printImg(data) {
    const markUp = data
        .map(item => {
            const { tags, likes, views, comments, downloads, webformatURL, largeImageURL } = item;
            return `<div class="photo-card">
                        <a href=${largeImageURL}>
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" width='300' height='170'/></a>
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


loadMoreBtn.addEventListener('click', async (e) => {

    page += 1;
    await getData(false);
    console.log(page);

});