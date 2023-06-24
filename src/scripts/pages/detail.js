import sourceData from '../data/source';
import CONFIG from '../data/config';
import UrlParser from '../routes/url-parser';
import LikeButtonInitiator from '../like-button-initiator';

const Detail = {
    async render() {
        return `
        <section class="content">
            <div class="latest">
                <h1 id="restoName"></h1>
                <div class="detail-content" id="detail"></div>
                <div id="likeButtonContainer"></div>
            </div>
        </section>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const data = await sourceData.detailResto(url.id);
        const dataDetail = this.generateDataDetail(data);

        document.querySelector('#restoName').innerHTML = 'DETAIL RESTORAN';
        document.querySelector('#detail').innerHTML = dataDetail;

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: this.generateLikeButtonData(data.restaurant),
        });
    },

    generateDataDetail(data) {
        const { restaurant } = data;

        let listCategory = '';
        let listMakanan = '';
        let listMinuman = '';
        let listReview = '';

        restaurant.categories.forEach((category) => {
            listCategory += `
                <div class="tag">${category.name}</div>
            `;
        });

        restaurant.menus.foods.forEach((food) => {
            listMakanan += `
                ${food.name},
            `;
        });

        restaurant.menus.drinks.forEach((drink) => {
            listMinuman += `
                ${drink.name},
            `;
        });

        restaurant.customerReviews.forEach((review) => {
            listReview += `
            <div class="review-card">
                <p><b>${review.name}</b> - ${review.date}</p>
                <p>${review.review}</p>
            </div>
            `;
        });

        const dataDetail = `
            <div class="list_item">
                <img class="list_item_img" src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId}" alt="${restaurant.name}" title="${restaurant.name}">
                <div class="city">${restaurant.city}</div>
                <div class="list_item_content" style="text-align:left;">
                    <p class="list_item_rating">
                        Rating : 
                        <a href="#" class="list_item_rating_value">${restaurant.rating}</a>
                    </p>
                    <h2>${restaurant.name}</h2>
                    <p class="alamat" style="color:white">${restaurant.address}</p>
                    <div class="list_item_desc_detail">${restaurant.description}</div>
                    <br>
                    <h2>Menu</h2>
                    <div style="margin-top:10px;margin-bottom:20px;color:white;">${listCategory}</div>
                    <h3>Makanan</h3>
                    <div style="margin-top:10px;margin-bottom:20px;color:white;">${listMakanan}</div>
                    <h3>Minuman</h3>
                    <div style="margin-top:10px;margin-bottom:20px;color:white;">${listMinuman}</div>
                    <h2>Review</h2>
                    <p style="color:white;">Apa kata mereka yang sudah pernah berkunjung ke sini?</p>
                    <div style="margin-top:-15px;margin-bottom:20px; padding-top:20px;padding-bottom:20px;color:white;">${listReview}</div>
                </div>
            </div>
        `;

        return dataDetail;
    },

    generateLikeButtonData(restaurant) {
        return {
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            rating: restaurant.rating,
            pictureId: restaurant.pictureId,
            city: restaurant.city,
        };
    },
};

export default Detail;
