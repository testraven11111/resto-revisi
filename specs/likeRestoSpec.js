import LikeButtonInitializer from '../src/scripts/like-button-initializer';
import FavoriteDatabase from '../src/scripts/data/favorite-database';

describe('Favoriting Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    it('should display the like button', async () => {
        await LikeButtonInitializer.initialize({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="Click to like"]')).toBeTruthy();
    });

    it('should not display the unlike button', async () => {
        await LikeButtonInitializer.initialize({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="Click to unlike"]')).toBeFalsy();
    });

    it('should be able to like a restaurant', async () => {
        await LikeButtonInitializer.initialize({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        const restaurant = await FavoriteDatabase.getFavorite(1);

        expect(restaurant).toEqual({ id: 1 });

        FavoriteDatabase.deleteFavorite(1);
    });

    it('should not be able to like a restaurant that has been liked before', async () => {
        await LikeButtonInitializer.initialize({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        await FavoriteDatabase.putFavorite({ id: 1 });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect(await FavoriteDatabase.getAllFavorites()).toEqual([{ id: 1 }]);
        FavoriteDatabase.deleteFavorite(1);
    });
});
