
$(document).ready(function () {




    $('.custom-dropdown-toggle').click(function () {
        $(this).next('.custom-dropdown-wrapper').slideToggle();
    });


    // Form Placeholderr Text Size
    if ($('.form-field .field-input').length > 0) {
        $('.form-field .field-input').each(function () {
            if ($(this).next('.field-label').length > 0) {
                var getlength = $(this).next('.field-label').text().length;
                var getLabelText = "";
                if (getlength >= 35) {
                    getLabelText = $(this).next('.field-label');
                    getLabelText.insertBefore(this);
                    getLabelText.addClass('js-label');
                }
            }
        });
    }

    setTimeout(function () {
        $('.form-field .field-input[type=text], .form-field .field-input[type=email],  .form-field .field-input[type=number], .form-field select.field-input, .form-field textarea.field-input').on('focus blur change', function (e) {
            var $currEl = $(this);
            if ($currEl.prev('.js-label').length < 1) {

                if ($currEl.is('select')) {

                    if ($currEl.val() === $("option:first", $currEl).val()) {
                        // $('.field-label', $currEl.parent()).animate({ opacity: 0 }, 240);
                        $currEl.parents('.form-field').removeClass('focused');
                    } else {
                        //$('.field-label', $currEl.parent()).css({ opacity: 1 });
                        $currEl.parents('.form-field').toggleClass('focused', ((e.type === 'focus' || this.value.length > 0) && ($currEl.val() !== $("option:first", $currEl).val())));
                    }
                } else {
                    $currEl.parents('.form-field').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
                }
            }


        }).trigger('blur');
    }, 100);

    $('input[type=file]').change(function (e) {
        var getVal = e.target.files[0].name;
        $(this).parents('.form-field').find('.custom-file-label').text(getVal);
        if (getVal != "") {
            $(this).parents('.form-field').addClass('focused');
        } else {
            $(this).parents('.form-field').removeClass('focused');
        }
    });

    // Remove -
    if ($('.meta .meta-category.second').length || $('.tabs .tab-item').length) {
        $('.meta .meta-category.second, .tabs .tab-item .tab').each(function () {
            var getcontent = $(this).text();
            $(this).attr('data-value', getcontent);
            getcontent = getcontent.replace(/-/g, ' ');
            $(this).text(getcontent);
        });
    }

});