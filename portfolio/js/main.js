import { data } from "./data.js";


var navLinks = document.querySelectorAll('.header a');
navLinks.forEach(function (navLink) {
    navLink.onclick = (e) => {
        document.querySelector('.header .selected-link').classList.remove('selected-link');
        e.target.classList.add('selected-link');
    }
})
function loadData() {
    var recent = document.getElementById('recent');
    var tabsContainer = document.createElement('div');
    tabsContainer.className += 'text-center mb-4';
    for (let i = 0; i < data.categories.length; i++) {
        var link = document.createElement('a');
        link.classList.add('tab-link');
        link.setAttribute('data-index', i);
        link.innerHTML = data.categories[i].name;
        if (i == 0) {
            link.classList.add('selected-link');
        }
        link.onclick = changeTab;
        tabsContainer.appendChild(link);
    }

    recent.appendChild(tabsContainer);
    var tabView = document.createElement('div');
    tabView.className = 'row tab-view';
    recent.appendChild(tabView);
    viewTab(0);

    var carousel = document.getElementById('carousel');
    var row = document.createElement('div');
    var carouselRows = 0;
    row.id = `row-${carouselRows}`;
    row.className = 'row';
    for (let i = 0; i < data.reviews.length; i++) {
        row.innerHTML += reviewCard(data.reviews[i]);
        if (i % 3 == 2) {
            carousel.appendChild(row);
            row = document.createElement('row');
            row.className = 'row hide';
            carouselRows++;
            row.id=`row-${carouselRows}`;
        }
    }
}
var currentRow = 0;
var carouselRows;
function next(e){
    console.log('Hi');
    e.preventDefault();
    slide(1);
}
function previous(e){
    e.preventDefault();
    slide(-1);
}
document.querySelector('#carousel .right').onclick = next;
document.querySelector('#carousel .left').onclick = previous;

function slide(direction){
    var targetRow = currentRow+direction;
    if(targetRow > carouselRows || targetRow < 0)
        return;
    
    document.getElementById(`row-${targetRow}`).classList.remove('hide');
    document.getElementById(`row-${currentRow}`).classList.add('hide');
    currentRow = targetRow;
}
function reviewCard(reviewData) {
    return `<div class="col-12 col-md-4 mb-4 mb-md-0">
    <div class="card shadow-sm text-center p-4">
        <div class="rounded-circle m-auto overflow-hidden img-wrapper mb-3">
            <img class="w-100" src="${reviewData.img}" alt="">
        </div>
        <p>
            ${reviewData.content}
        </p>
        <div class="fw-bold">${reviewData.name}</div>
        <div>${reviewData.title}</div>
    </div>
</div>`;
}
function viewTab(index) {
    var tabView = document.querySelector('#recent .tab-view');
    tabView.innerHTML = '';
    data.categories[index].images.forEach((imgSrc) => {
        var card =
            `<div class="col-12 col-md-4 mb-4 mb-md-0">
                <img class="rounded-3 w-100" src="${imgSrc}" alt="">
            </div>`;
        // recent.innerHTML+=card; Weired behavior
        var div = document.createElement('div');
        div.innerHTML = card;
        tabView.appendChild(div.firstChild);
    });
}
function changeTab(e) {
    e.preventDefault();
    var index = e.target.getAttribute('data-index');
    viewTab(index);
    var currentTab = document.querySelector('#recent .selected-link');
    currentTab.classList.remove('selected-link');
    e.target.classList.add('selected-link');
}
loadData();
