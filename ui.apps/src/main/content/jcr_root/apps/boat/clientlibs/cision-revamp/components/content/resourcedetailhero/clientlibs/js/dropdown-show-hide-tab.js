(function (document, $, Coral) {

var $doc = $(document);

$doc.on('dialog-ready', function(e) {

    $('.showhide', e.target).each(function (i, element) {
        Coral.commons.ready(element, function (component) {
            $(component).on("change",function (event) {
                if($(this).val()=='withAuthorData'){
                    $('.toggletab coral-tablist coral-tab').show();
                }
                else{
                    $(".toggletab coral-tablist coral-tab").eq(1).hide();
                }
            });
        });
    });

    setTimeout(function(){
        if($('.showhide').val()=='withAuthorData'){
            $('.toggletab coral-tablist coral-tab').show();
        }
        else{
            $(".toggletab coral-tablist coral-tab").eq(1).hide();
        }
    },1000);

});

})(document, Granite.$, Coral);