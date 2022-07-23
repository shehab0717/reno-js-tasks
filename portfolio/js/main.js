import { data } from "./data.js";

function loadData() {
    var recent = document.getElementById('recent');
    var tabsContainer = document.createElement('div');
    tabsContainer.className += 'text-center mb-4';
    for (let i = 0; i < data.categories.length; i++) {
        var link = document.createElement('a');
        link.classList.add('tab-link');
        link.setAttribute('data-index',i);
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
    selectTab(0);

}
function selectTab(index){
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
    selectTab(index);
    var currentTab = document.querySelector('#recent .selected-link');
    currentTab.classList.remove('selected-link');
    e.target.classList.add('selected-link');
}
loadData();
