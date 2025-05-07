 
/*=====================
02. Background Image js
  ==========================*/
$(".bg-center").parent().addClass('b-center');
$(".bg-img-cover").parent().addClass('bg-size');
$('.bg-img-cover').each(function () {
    var el = $(this),
        src = el.attr('src'),
        parent = el.parent();
    parent.css({
        'background-image': 'url(' + src + ')',
        'background-size': 'cover',
        'background-position': 'bottom',
        'display': 'block'
    });
    el.hide();
});

/*----------------------------------------
passward show hide
----------------------------------------*/
$('.show-hide').show();
$('.show-hide span').addClass('show');

$('.show-hide span').click(function () {
if ($(this).hasClass('show')) {
    $('input[name="login[password]"]').attr('type', 'text');
    $(this).removeClass('show');
} else {
    $('input[name="login[password]"]').attr('type', 'password');
    $(this).addClass('show');
}
});
$('form button[type="submit"]').on('click', function () {
$('.show-hide span').addClass('show');
$('.show-hide').parent().find('input[name="login[password]"]').attr('type', 'password');
});

 