var cms = {
    init: function () {
        var heightBandeau = $("#bandeauHaut").innerHeight();
        $("#corps").css('margin-top', heightBandeau);
        $("#bandeauHaut").addClass('sticky');
        // On teste la position de la fenêtre au chargement de la page
        if ($(window).scrollTop() >= heightBandeau) {
            $('#document').addClass("scrolled");
        } else if ($(window).scrollTop() < heightBandeau) {
            $('#document').removeClass("scrolled");
        }
        // Gestion de la classe fixed au scroll de la page
        $(window).scroll(function (e) {
            if ($(window).scrollTop() >= heightBandeau) {
                $('#document').addClass("scrolled");
            } else if ($(window).scrollTop() < heightBandeau) {
                $('#document').removeClass("scrolled");
            }
        });
    },
    menu: function () {

    }
};
$('document').ready(function(){
    $(cms.init);
    $(cms.menu);
});