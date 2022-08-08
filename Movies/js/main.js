class eventsMediator {

    constructor() {
        this.events = {};
    }
    on(event, cb) {
        this.events[event] = this.events[event]
            ? this.events[event]
            : [];

        this.events[event].push(cb);
    }

    emit(event, eventArgs) {
        if (this.events[event]) {
            this.events[event].forEach(cb => {
                cb(eventArgs);
            });
        }
    }
}

const eMediator = new eventsMediator();

class moviesComponent {

    apiUrl = 'https://api.themoviedb.org/3';
    apiKey = 'f29bbd909381fc55ca788c4d5c45f876';

    movies;
    stats;

    constructor() {
        this.cacheElements();
        eMediator.on('pageChanged', this.render.bind(this))
    }

    async render(pageNumber) {
        this.$moviesContainer.html('');
        this.$loaderWrapper.html('<div class="loader"></div>');
        await this.fetchData(pageNumber);
        this.$loaderWrapper.html('');

        this.movies.forEach(element => {
            var movieCard = $(Mustache.render(this.movieTemplate, element));
            movieCard.click(this.onClick.bind(this));
            this.$moviesContainer.append(movieCard);
        })
        eMediator.emit('dataLoaded', { stats: this.stats });
    }

    cacheElements() {
        this.$moviesContainer = $('#movies-container');
        this.movieTemplate = $('#movie-template').html();
        this.$loaderWrapper = $('#loader-wrapper');
        this.$modal = $('#modal-content');
        this.modalTemplate = $('#modal-template').html();
    }

    async fetchData(pageNumber) {
        await $.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${pageNumber}`, bindData.bind(this));

        function bindData(data) {
            this.movies = data.results.map(
                element => {
                    return {
                        img: element.poster_path,
                        name: element.original_title,
                        rating: element.vote_average,
                        id: element.id
                    }
                }
            );
            let topRating = 0;
            let topRatedMovie = data.results[0];
            data.results.forEach(element => {
                if (topRating < element.vote_average) {
                    topRatedMovie = element;
                    topRating = element.vote_average;
                }
            });
            this.stats = {
                currentPage: data.page,
                numberOfMovies: data.total_results,
                topRatedMovie: topRatedMovie.original_title,
                topRating: topRating,
                totalPages: data.total_pages
            }
        }
    }

    async onClick(eventArgs) {
        this.$modal.html('<div class="loader"></div>')
        var movieId = $(eventArgs.currentTarget).attr('data-movie-id');
        let movieData;
        await $.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`, data => {
            movieData = data;
        })
        console.log(movieData);
        this.$modal.html(Mustache.render(this.modalTemplate, { img: movieData.poster_path, name: movieData.original_title, rating: movieData.vote_average, overview: movieData.overview }));

    }

}

class statsComponent {
    constructor() {
        this.cacheElements();
        eMediator.on('dataLoaded', this.render.bind(this));

    }

    cacheElements() {
        this.$wrapper = $('#stats-wrapper');
        this.template = $('#stats-template').html();
    }

    render(data) {
        this.$wrapper.html(Mustache.render(this.template, { stats: data.stats }));
    }
}


class pagingComponent {
    currentPage;
    totalPages;
    constructor() {
        this.cacheElements();
        eMediator.on('dataLoaded', this.render.bind(this));
        $('body').on('click', 'a.pagination-link', this.onChange.bind(this));
    }

    cacheElements() {
        this.$wrapper = $('#pagination-wrappper');
        this.template = $('#pagination-template').html();
    }

    render({stats}) {
        this.currentPage = stats.currentPage;
        this.totalPages = stats.totalPages;
        let left = [
            { number: this.currentPage - 1, text: 'Previous', enabled: this.currentPage > 1 },
            { number: 1, text: 1, selected: this.currentPage == 1, enabled: true },
            { number: 2, text: 2, selected: this.currentPage == 2, enabled: true }
        ];
        let right = [
            { number: this.totalPages - 1, text: this.totalPages - 1, selected: this.currentPage == this.totalPages - 1, enabled: true },
            { number: this.totalPages, text: this.totalPages, selected: this.currentPage == this.totalPages, enabled: true },
            { number: this.currentPage + 1, text: 'Next', enabled: (this.currentPage < this.totalPages) },
        ];
        let mid = this.midGroup();
        this.$wrapper.html(Mustache.render(this.template, { left, right, mid }))
    }

    midGroup() {
        if (this.currentPage >= 3 && this.currentPage <= this.totalPages - 2) {
            return [
                { number: this.currentPage - 1, text: this.currentPage - 1, selected: false, enabled: true },
                { number: this.currentPage, text: this.currentPage, selected: true, enabled: true },
                { number: this.currentPage + 1, text: this.currentPage + 1, selected: false, enabled: true }
            ];
        }
        return [];
    }

    onChange(eventArgs) {
        var pageNumber = $(eventArgs.target).attr('data-page-number');
        eMediator.emit('pageChanged', pageNumber);
    }

}

var statsComp = new statsComponent();
var mc = new moviesComponent();
var pc = new pagingComponent();
mc.render(1);
