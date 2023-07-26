(function (document, $) {
    "use strict";

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function (e) {
        // if there is already an inital value make sure the according target element becomes visible

        setTimeout(function(){
			$('.navCheckbox').each(function(){

                 if($(this).prop("checked") == true){
                    $(this).parent('div').parent('div').find('.targetedMulti').css('display','block');
                 }else{
                    $(this).parent('div').parent('div').find('.targetedMulti').css('display','none');

                 };
          })
        },1000)

    });

    $(document).on("change", ".navCheckbox", function (e) {
                if($(this).prop("checked") == true){
                    $(this).parent('div').parent('div').find('.targetedMulti').css('display','block');
                 }else{
                    $(this).parent('div').parent('div').find('.targetedMulti').css('display','none');
                 };
    });

})(document, Granite.$);