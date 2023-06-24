import UnlikeButtonInitializer from '../src/scripts/unlike-button-initializer';
import FavoriteDatabase from '../src/scripts/data/favorite-database';

describe('Unfavoriting Restaurant', () => {
    const addUnlikeButtonContainer = () => {
        document.body.innerHTML = '<div id="unlikeButtonContainer"></div>';
    };

    beforeEach(() => {
        addUnlikeButtonContainer();
        FavoriteDatabase.putFavorite({ id: 1 });
    });

    it('should display the unlike button', async () => {
        await UnlikeButtonInitializer.initialize({
            unlikeButtonContainer: document.querySelector('#unlikeButtonContainer'),
            data: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="Click to unlike"]')).toBeTruthy();
    });

    it('should be able to unlike a restaurant', async () => {
        await UnlikeButtonInitializer.initialize({
            unlikeButtonContainer: document.querySelector('#unlikeButtonContainer'),
            data: {
                id: 1,
            },
        });

        document.querySelector('#unlikeButton').dispatchEvent(new Event('click'));
        expect(await FavoriteDatabase.getAllFavorites()).toEqual([]);
    });

});
