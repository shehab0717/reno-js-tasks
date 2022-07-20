var data = [
    {
        id: 1,
        img: 'https://zamzam.com/blog/wp-content/uploads/2021/08/shutterstock_1904889901.jpg',
        title: 'Madinah',
        description: 'Saudia arabia - Madina Munaurah',
        time: 'Aug 5, 2013',
        comments: 22
    },
    {
        id: 2,
        img: 'https://cdn.theculturetrip.com/wp-content/uploads/2021/07/great-pyramid.jpg',
        title: 'Egypt Pyramids',
        description: 'Egypt - Giza Pyramids, very incient civilization which is oldre than 5000 years',
        time: 'Aug 5, 2013',
        comments: 22
    },
    {
        id: 3,
        img: 'https://www.planetware.com/photos-large/IND/india-top-attractions-taj-mahal.jpg',
        title: 'Taj Mahal',
        description: 'India - Taj Mahal Mosque',
        time: 'Aug 5, 2013',
        comments: 22
    },
    {
        id: 4,
        img: 'https://mumbaitourism.travel/images/places-to-visit/headers/top-places-to-visit-in-mumbai-tourism-entry-fee-timings-holidays-reviews-header.jpg',
        title: 'Tourism place',
        description: 'somewhere in the world this place is located...',
        time: 'Aug 5, 2013',
        comments: 22
    },
    {
        id: 5,
        img: 'https://www.tripyana.com/wp-content/uploads/2018/08/turkeyistanbul.jpg',
        title: 'Aya sofia',
        description: 'Turkey - Istanbul islamic historical mosque',
        time: 'Aug 5, 2013',
        comments: 22
    }

];

$(document).ready(function () {
    data.forEach(function (element) {
        $('.gallery').append(placeCard(element));
    })

    $('.card').click(function(e){
        var id = $(this).attr('data-place-id');
        id--;
        console.log($("#modal-img"));
        $("#modal-img").attr('src', data[id].img);
        $("#modal-title").html(data[id].title);
        $("#modal-desc").html(data[id].description);
    })
});



function placeCard(placeData) {
    return `<div class="col-md-3 pb-4">
    <div class="card border-0 p-0 text-center bg-light-gray cursor-pointer" data-bs-toggle="modal" data-bs-target="#placeModal" data-place-id=${placeData.id}>
        <img class="card-img-top"
            src="${placeData.img}" alt="">
        <div class="card-body">
            <h5 class="card-title text-info text-uppercase">${placeData.title}</h5>
            <p class="text-secondary">
                ${placeData.description}    
            </p>
            <div class="row text-secondary">
                <div class="col">
                    <i class="fas fa-calendar"></i>
                    ${placeData.time}
                </div>
                <div class="col">
                    <i class="fas fa-comments"></i>
                    ${placeData.comments} Comments
                </div>
            </div>
        </div>
    </div>
</div>`
}