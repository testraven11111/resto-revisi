import UrlParser from './routes/url-parser';
import routes from './routes/routes';

class App {
    constructor({ content, menu, drawer, main }) {
        this._content = content;
        this._menu = menu;
        this._drawer = drawer;
        this._main = main;
        this.onInit();
    }

    onInit() {
        this._menu.addEventListener('click', (event) => {
            this._drawer.classList.toggle('open');
            event.stopPropagation();
        });

        this._main.addEventListener('click', () => {
            this._drawer.classList.remove('open');
        });

        // Menambahkan event listener pada saat di-scroll
        window.addEventListener('scroll', () => {
            const skipLink = document.querySelector('.skip-link');

            // Memeriksa apakah user telah menscroll ke bawah
            if (window.scrollY > 0) {
                skipLink.style.display = 'block'; // Menampilkan tombol skip to content
            } else {
                skipLink.style.display = 'none'; // Menyembunyikan tombol skip to content
            }
        });
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url];

        try {
            this._content.innerHTML = await page.render();
            await page.afterRender();
        } catch (error) {
            this._content.innerHTML = '<error-message></error-message>';
            console.error(error);
        }

        this._drawer.classList.remove('open');

        // Menyembunyikan tombol skip to content pada saat load awal
        const skipLink = document.querySelector('.skip-link');
        skipLink.style.display = 'none';
    }
}

export default App;
