const avengers = [
    {
        name: 'Hulk',
        image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/006hbb_ons_mas_mob_01_0.jpg',
        count: 0,
    },
    {
        name: 'Iron man',
        image: 'https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg',
        count: 0,
    },
    {
        name: 'Thor',
        image: 'https://ichef.bbci.co.uk/images/ic/1200x675/p09t1hg0.jpg',
        count: 0,
    },
    {
        name: 'Captin America',
        image: 'https://www.whatspaper.com/wp-content/uploads/2022/07/captain-america-whatspaper.jpg',
        count: 0,
    },
    {
        name: 'Hawkeye',
        image: 'https://www.direct8.fr/wp-content/uploads/2021/11/hawkeye-680x1024.jpg',
        count: 0,
    },
];

var heroesList = {
    init: function () {
        this.cacheElements();
    },
    cacheElements: function () {
        this.wrapper = document.getElementById('heroes-list');
    },

    render: function () {
        this.wrapper.innerHTML = '';
        avengers.forEach((hero, index) => {
            this.wrapper.innerHTML += this.heroTemplate(hero, index);
        });
    },
    heroTemplate: function (hero, index) {
        const { name, count, image } = hero;
        return (
            `<div class="card hero-card text-dark mb-4" data-index='${index}'>
                <img class="w-100 card-img rounded" src="${image}" alt="">
                <div class="card-body">
                    <div class="hero-name">
                        ${name}
                    </div>
                    <div class="count">
                        ${count}
                    </div>
                </div>
            </div>`
        );
    }
}

var mainArea = {
    init: function () {
        this.cacheElements();
    },

    cacheElements: function () {
        this.wrapper = document.getElementById('main-area');
    },

    render: function (hero) {
        const { count, image } = hero;
        this.wrapper.innerHTML = `
        <img class="main-img rounded border border-1" src="${image}" alt="">
        <div class="count mt-4">${count}</div>`;
    }

}


function addGlobalEventListner(type, selector, cb) {
    document.addEventListener(type, (event) => {
        if (event.target.matches(selector)) {
            cb(event);
        }
    })
}

addGlobalEventListner('click', '.hero-card *', (event) => {
    const heroIndex = event.target.closest('.hero-card').getAttribute('data-index');
    avengers[heroIndex].count += 1;
    heroesList.render();
    mainArea.render(avengers[heroIndex]);

})



heroesList.init();
heroesList.render();
mainArea.init();
mainArea.render(avengers[0]);
