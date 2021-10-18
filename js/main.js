console.log('Starting up');

$(onInit());

function onInit() {
    renderProjs()
}

function renderProjs() {
    var projs = gProjs;
    var strHtml = projs.map(proj => {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${capitalize(proj.id)}">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <i class="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
                </a>
                <div class="portfolio-caption">
                    <h4>${proj.name}</h4>
                    <p class="text-muted">${proj.title}</p>
                </div></div>`
    });

    $('.portfolio-container').html(strHtml);
    console.log(strHtml);
}



function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}
