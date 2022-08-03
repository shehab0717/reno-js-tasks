

var newsComponent = {
    apiUrl: 'https://newsapi.org/v2',
    apiKey: '76e5b90b7af042b59cab2101c8be80b5',

    init: function () {
        this.cacheElements();
        eventsMediator.on('countrySelected', this.render.bind(this));
    },

    cacheElements: function(){
        this.$wrapper = $('.news-wrapper .row');
        this.template = $('#news-template').html();
    },
    render: async function (countryData) {
        eventsMediator.emit('loading', '.news-wrapper .row');
        await this.getNews(countryData.name);
        this.$wrapper.html(Mustache.render(this.template, {news: this.news}));
    },
    getNews: async function (countryName) {
        await $.get(`${this.apiUrl}/everything?q=${countryName}&apiKey=${this.apiKey}`, 
        function (data) {
            newsComponent.news = data.articles.map(function(element){
                return {
                    img: element.urlToImage,
                    title: element.title,
                    description: element.content,
                };
            })
        })
    }
}

var countryComponent = {
    apiUrl: 'https://restcountries.com/v3.1',
    country: null,
    init: async function () {
        this.cacheElements();
        eventsMediator.emit('loading', '#countries-wrapper');
        await this.fetchAll();
        this.render();
    },
    cacheElements: function () {
        this.$wrapper = $('#countries-wrapper');
        this.template = $('#country-template').html();
    },

    render: function () {
        this.$wrapper.html('');
        this.$wrapper.html(Mustache.render(this.template, { countries: this.countries }));
        this.$wrapper.on('click','.country-card', this.selectCountry)

    },
    selectCountry: async function(event){
        var countryName = this.getAttribute('data-country-name');
        var countryData = await countryComponent.fetchOne(countryName);
        eventsMediator.emit('countrySelected',countryData);
    },
    fetchAll: async function () {
        await $.get(this.apiUrl+'/all', function (data) {
            countryComponent.countries = data.map(function (element) {
                return {
                    name: element.name.common,
                    flag: element.flags.png,
                    capital: element.capital ?? [0],
                    languages: element.languages,
                    currencies: element.curruncies,
                    population: element.population,
                    region: element.region,
                }
            });
        })
    },
    fetchOne: async function(name){
        var ret;
        await $.get(this.apiUrl+'/name/'+name, function(data){
            var countryData = data[0];
            ret = {
                name: countryData.name.common,
                flag: countryData.flags.png,
                capital: countryData.capital ?? [0],
                languages: countryData.languages,
                currencies: countryData.curruncies,
                population: countryData.population,
                region: countryData.region,
            }
        });
        return ret;
    }
}

var recentCountryComponent = {

    init: function(){
        eventsMediator.on('countrySelected', this.render.bind(this));
        this.cacheElements();
    },
    cacheElements: function(){
        this.template = $('#recent-country-template').html();
        this.$target = $('#recent-country-wrapper');
    },
    render: function(data){
        this.$target.html(Mustache.render(this.template, data));
    },
}
var loadingComponent = {
    init: function(){
        eventsMediator.on('loading', this.render.bind(this));
    },
    render: function(selector){
        $(selector).html('<div class="display-3">LOADING...</div>');
    }
}
var eventsMediator = {
    events: {},
    on: function (event, cb) {
        this.events[event] = this.events[event]
            ? this.events[event]
            : [];
        this.events[event].push(cb);
    },

    emit: function(event, data){
        if(this.events[event]){
            this.events[event].forEach(event => {
                event(data);
            });
        }
    }

}
loadingComponent.init();
countryComponent.init();
newsComponent.init();
recentCountryComponent.init();
