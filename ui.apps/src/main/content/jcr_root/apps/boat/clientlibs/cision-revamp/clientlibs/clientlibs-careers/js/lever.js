$(function(){
var requiredCheckboxes = $(':checkbox[required]');
requiredCheckboxes.change(function(){
	if(requiredCheckboxes.is(':checked')) {
		requiredCheckboxes.removeAttr('required');
	}
	else {
		requiredCheckboxes.attr('required', 'required');
	}
});
});
//function added to focus the field on submit for error message - start
   var navhei = $('header').height();
   var navheix = navhei + 30;
   document.addEventListener('invalid', function(e){
   $(e.target).addClass("invalid");
   $('html, body').animate({scrollTop: $($(".invalid")[0]).offset().top - navheix }, 0);

   setTimeout(function(){
   $('.invalid').removeClass('invalid');
   },0300);
   }, true);
    //function added to focus the field on submit for error message - End
$(document).on("submit","#leverjobform", function(e) {
    var form = $(this);
    //Generate Recaptcha token on every form submit instead of window onload
    grecaptcha.ready(function() {
        grecaptcha.execute('6LcND_QUAAAAAP1F-ViHZtRv64_xwiGtTa9A4q8f', {action: 'submit'}).then(function(token) {
    		$('#recaptchaToken').val(token);
            var buttonText = $('#leverjobform').find('.submit-button').text();
            var getSpinner = $('#leverjobform').find('.submit-button').attr('data-loading-text');
            $('#leverjobform').find('.submit-button').html(getSpinner);
            setTimeout(function(){
                var res = recaptchaValidate();
            if(res == true)
            {
                var input = $(":input");
                for(var i=0; i < input.length; i++){
                    if(input[i].type == 'file'){
                        console.log(input[i].id)
                        var formData = new FormData();
                        var inputForm = document.getElementById(input[i].id).files[0];
                        if(inputForm!=undefined){
                            if(inputForm.size > 31457279){
                                this.value = "";
                                alert( "File size is too large. Upload file under 30MB." );
                                e.preventDefault();
                            }else{
                                formData.append('file', inputForm);
                                $.ajax({
                                    type: "POST",
                                    enctype: 'multipart/form-data',
                                    async : false,
                                    url: "/bin/cision-revamp/fileuploadtolever",
                                    data: formData,
                                    processData: false,
                                    contentType: false,
                                    cache: false,
                                    timeout: 600000,
                                    success: function (data) {
                                        var response = JSON.parse(data);
                                        console.log("SUCCESS : ", response.data.uri);
                                    $('<input>').attr('type','hidden').attr('name',input[i].id).attr('value',response.data.uri).appendTo('#leverjobform');
                                    },
                                    error: function (e) {
                                        alert(e)
                                    }
                                });
                                e.preventDefault();
                            }
                        }
                    }
                }

                $.ajax({
                    type: "POST",
                    url: "/bin/cision-revamp/applytolever.json",
                    async : false,
                    data: form.serialize(), // serializes the form's elements.
                    success: function(data)
                    {
                        $('#leverjobform').find('.submit-button').html(buttonText);
                        var jsonResponse = data;
                        if(jsonResponse.hasOwnProperty('data')){
                            $('#leverErrorText').hide();
                            $('#leverjobform')[0].reset();
                            $(".custom-file").find('input').val('');
                            $(".custom-file").find('label').removeClass('active');
                            $(".custom-file").find('.custom-file-label').text('');
                            window.location.href = $(".submit-button").data().thankyoupage;
                            return false;
                        }else{
                            $('#leverErrorText').show();
                            var res=jsonResponse.message;
                            var authoredError = $('#leverErrorText').attr('data-customerror');
                            if(authoredError != undefined){
                                $('#leverErrorText').text(authoredError);
                            }else{
                                $('#leverErrorText').text(res);
                            }
                        }
                        $('#leverjobform').find('.submit-button').html(buttonText);
                    },
                    error: function(e){
                        $('#leverErrorText').text(e);
                        $('#leverjobform').find('.submit-button').html(buttonText);
                    }
                    });
                 e.preventDefault();
            }
            else{
                $('#leverErrorText').show();
                var recaptchaAuthoredError = $('#recaptchaErrorMsg').val();
                var errorMsgToDisplay = recaptchaAuthoredError ? recaptchaAuthoredError : 'Recaptcha validation fails Please try again';
                $('#leverErrorText').text(errorMsgToDisplay);
                $('#leverjobform').find('.submit-button').html(buttonText);
                e.preventDefault(e);
            }
           },100);
        });
   	});
    e.preventDefault(e);

});

function recaptchaValidate(){
    var recaptchaFlag = false;
    jQuery.ajax({
  	type: 'GET',
    async : false,
    url: '/bin/cision-revamp/recaptcha.json',
    data: 'token='+ $('#recaptchaToken').val(),
        success: function (data) {
			if(data === "true" || data == true){
            	recaptchaFlag = true;
			}
		}
	});
	return true;
}