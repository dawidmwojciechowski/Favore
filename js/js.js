$(document).ready(function () {

    $(".message-after").hide();

    $('#form_zip').keydown(function ()
    {
        var zip = $("#form_zip").val();
        zip = zip.replace(/[^0-9-]/g, "");
        $("#form_zip").val(zip);

        if ($("#form_zip").val().length == 2)
        {
            var tmpregex = /^[0-9]{2}$/;
            if (tmpregex.test(zip))
            {
                $("#form_zip").val(zip + "-");
            }
        }
    });

    // show more
    var showChar = 150;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "[rozwiń]";
    var lesstext = "[zwiń]";


    $('.more').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });


    if (document.cookie.indexOf("COOKIE_INFO") < 0)
    {
        $('.cookies').css("display", "block");
    }

});
// from validator
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (form.checkValidity() === true) {
                    sendTender();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
$('.hideBar').on('click', function () {
    closeCokieInfo();
});

function closeCokieInfo()
{
    expiry = new Date();
    expiry.setTime(expiry.getTime() + (1000 * 24 * 60 * 60 * 1000)); // 1000 dni
    document.cookie = "COOKIE_INFO=" + "1; expires=" + expiry.toUTCString() + "; path=/";
    $('.cookies').css("display", "none");
}

function sendTender()
{
    var tb_body = $("#tenderForm [name='body']").val();
    var tb_email = $("#tenderForm [name='email']").val();
    var tb_zip = $("#tenderForm [name='zip']").val();
    var tb_phone = $("#tenderForm [name='phone']").val();
 
    $.ajax({
        url: '/ax/msete.jsp',
        type: 'post',
        dataType: 'html',
        data: $('#tenderForm').serialize(),
        success: function (data)
        {
            if (data == "OK")
            {
                $(".formBox").hide();
                $(".message-after").show();

                $("#tenderForm [name='body']").val("");
                $("#tenderForm [name='email']").val("");
                $("#tenderForm [name='zip']").val("");
                $("#tenderForm [name='phone']").val("");
            } else
            {
                alert(data);
            }
        }
    });

}

function checkZip(src)
{
    var regex = /^[0-9]{2}\-[0-9]{3}$/;
    return regex.test(src);
}

function checkEmail(src)
{
    var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
    return regex.test(src);
}