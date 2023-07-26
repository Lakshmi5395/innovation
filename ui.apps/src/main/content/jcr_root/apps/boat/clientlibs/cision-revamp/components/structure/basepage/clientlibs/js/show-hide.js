(function (document, $) {
    "use strict";
    // when dialog gets injected

    $(document).on("foundation-contentloaded", function (e) {
        // if there is already an inital value make sure the according target element becomes visible
          $('.targetProductCheck input[type="checkbox"]').attr('data-count', $("input[name='./publicationDate']").length);
          checkboxShowHideHandler($(".targetProductCheck", e.target));
    });

    $(document).on("change", ".targetProductCheck", function (e) {
         checkboxShowHideHandler($(this));
    });

    function checkboxShowHideHandler(el) {
        el.each(function (i, element) {
            if($(element).is("coral-checkbox")) {
                // handle Coral3 base drop-down
                Coral.commons.ready(element, function (component) {
                    showHide(component, element);
                    component.on("change", function () {
                        showHide(component, element);
                    });
                });
            } else {
                // handle Coral2 based drop-down
                var component = $(element).data("checkbox");
                if (component) {
                    showHide(component, element);
                }
            }
        })
    }

    function showHide(component, element) {
        $('.targetPubDate').parent().removeClass("hide");
        if (component.checked) {
            $('.targetPubDate').parent().removeClass('hide');

        }
        else {
            $('.targetPubDate').parent().addClass('hide');
            $('.targetPubDate').attr('value', '');
            $('.targetPubDate').find('input').val('');

        }
        if($("input[name='./publicationDate']").length >1) {
                $('.targetProductCheck').parents('.foundation-field-editable').remove();
                $('.targetPubDate').parents('.coral-Form-fieldwrapper').remove();
            }
    }
})(document, Granite.$);
