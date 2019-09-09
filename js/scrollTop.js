$(document).ready(function () {

    $('.scrollTop').click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });

});