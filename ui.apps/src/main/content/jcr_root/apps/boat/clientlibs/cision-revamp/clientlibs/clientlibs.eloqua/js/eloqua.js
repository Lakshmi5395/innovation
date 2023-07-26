var phoneInputField, phoneInput, getFlagVal = "";
function escapeHTML(str){
	str = str.replace(new RegExp("<\s*script\s*>", "gi"), "");
	str = str.replace(new RegExp("<\s*script\s*\/>", "gi"), "");
    return str;
}
$(window).on("load", function() {

    if($("#busPhone").length > 0){
         phoneInputField = document.querySelector("#busPhone");
         phoneInput = window.intlTelInput(phoneInputField, {
         utilsScript:
           "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
         });
         if($("#dropdownFlag").text()==""){
              getFlagVal =  $("#configFlag").text();
         }else{
             getFlagVal = $("#dropdownFlag").text();
         }
         phoneInput.setCountry(getFlagVal);
    }


    // Added condition for PT site
    if($('#busPhone').length>0){
        var domain = document.location.hostname
        if (/\.(pt)\/?$/i.test(domain)) {
            $('#busPhone').attr('minlength', '8')
        }
    }

 if($('#eloquaForm').attr('name') == "USprwebform"){
	grecaptcha.ready(function() {
		updateCaptcha();
		setInterval(updateCaptcha, 110000)
	});
}

$(function($) {
var requiredCheckboxes = $(':checkbox[required]');
requiredCheckboxes.on('change', function(e) {
var checkboxGroup = requiredCheckboxes.filter('[data-checkboxgroup="' + $(this).attr('data-checkboxgroup') + '"]');
var isChecked = checkboxGroup.is(':checked');
checkboxGroup.prop('required', !isChecked);
});
requiredCheckboxes.trigger('change');
});


	var title=$('#myModalLabel').text();
    var newtitle=title.replace(/-/g, " ");
	$('#myModalLabel').text(newtitle);

    $('#eloquaPopup #close').on('click', function() {
		var url = escapeHTML(window.location.href);
        var current_page = url.substring(url.lastIndexOf('/'));
        if ( current_page == '/') {
            var a = url.split('/');
            url = url.replace(a[a.length-2] + '/', '');
            var a = url.split('/');
            url = url.replace(a[a.length-2] + '/', '');
        }
        else{
            url = url + "/";
			var a = url.split('/');
            url = url.replace(a[a.length-2] + '/', '');
            var a = url.split('/');
            url = url.replace(a[a.length-2] + '/', '');
        }
		window.location.href=url;
    });

    $(document).on('keydown', function(e) {
            if (e.which == 27) {
                if($('#eloquaPopup:visible').length){
                    $('#eloquaPopup #close').trigger('click');
                }
            }
    });

    chk_query_param();

	gdprEmailCheck();
	if($('#eloquaForm').attr('name') == "USContentISPConvert")
	{
		gdprEmailValid();
	}
	function setGLIDCookie(name, value, days){
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + value + expires;
    }
    function getParam(p){
		var strURL = document.location.href;
        var strQStrParamValue = "";

        if (strURL.indexOf('?') != -1) {
            strQStrParamValue = strURL.substr(strURL.indexOf('?') + 1);
            if (strQStrParamValue == "") {
                //window.setTimeout(window.location = "http://us.cision.com/contact_us/demo_request_string.asp",2000);
                //
                //window.setTimeout(window.location = "http://us.cision.com/contact_us/demo_request_string.asp",2000);
            } else if (strQStrParamValue.indexOf(p) != -1) {
                strQStrParamValue = strQStrParamValue.substr(strQStrParamValue.indexOf(p));
                strQStrParamValue = strQStrParamValue.substr(strQStrParamValue.indexOf('=') + 1);

                if (strQStrParamValue.indexOf('&') != -1)
                    strQStrParamValue = strQStrParamValue.substr(0, strQStrParamValue.indexOf('&'));
                return strQStrParamValue;

            }
        }
    }
    var gclid = getParam('gclid');
    if(gclid){
        var gclsrc = getParam('gclsrc');
        if(!gclsrc || gclsrc.indexOf('aw') !== -1){
            setGLIDCookie('gclid', gclid, 90);
        }
    }
    $('#gclid').val(gclid);
    $('#CLID').val(gclid);
	  var currenturlVal = window.location.href.split('?')[0];
    var pageReferrer = getParam('site_refer');
    $('#url').val(currenturlVal);
    $('#site_refer').val(pageReferrer);
	grecaptcha.ready(function() {
		updateCaptcha();
		setInterval(updateCaptcha, 110000)
	});

    // Stop Enter
    $('input').keypress(
        function(event){
          if (event.which == '13') {
            event.preventDefault();
          }
    });
});

function modal_show() {
    if($("#eloquaPopup").length > 0) {
 	   $("#eloquaPopup").modal('show');
    if ($(".modal").hasClass("in")) {
        $("#resource-cision").addClass("mask");
    }
    }
}


function modal_hide() {
    $("#eloquaPopup").modal('hide');
    $("#resource-cision").removeClass("mask");
}

function chk_query_param() {
    var url = window.location.href;
    var current_page = url.substring(url.lastIndexOf('?'));
    if (current_page.search("sf=false") != -1) {
        modal_hide();
    } else {
        modal_show();
    }
}

//update query paramater
var modalUpdateQueryStringParam = function(key, value) {
    var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
        urlQueryString = document.location.search,
        newParam = key + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        keyRegex = new RegExp('([\?&])' + key + '[^&]*');

        // If param exists already, update it
        if (urlQueryString.match(keyRegex) !== null) {
            params = urlQueryString.replace(keyRegex, "$1" + newParam);
        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }
    window.history.replaceState({}, "", baseUrl + params);
};
var gdprDomains="";
 var gdprCountries="";
  var euCountrys="";
var gdprflag =false;
$(document).ready(function() {
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

    var $select_state = $('#state');
    $('#state').parents('.form-field').addClass('d-none');

	var $select_companytype = $('#companytype');
    $('#companytype').parents('.form-field').addClass('d-none');

	if ($('#eloquaForm').attr('name') == 'UScontentform') {
        if($('#externalurlset').val() =='true'){
			var return_URL = $('input[name="retURL"]').val();
            $('input[name="retURL"]').val(return_URL);
        }
        else if($('#eloquaPopup').attr('role') != "dialog"){
            var return_URL = $('input[name="retURL"]').val();
    		var return_URL_Full = document.location.origin + return_URL;
			$('input[name="retURL"]').val(return_URL_Full);
        }
        else{
            var return_URL = $('input[name="retURL"]').val();
    		var return_URL_Full = document.location.origin + return_URL + '?sf=false';
			$('input[name="retURL"]').val(return_URL_Full);
        }

	}
	else{

        if($('#externalurlset').val() =='true'){
			var return_URL = $('input[name="retURL"]').val();
            $('input[name="retURL"]').val(return_URL);
			}
        else{
			var return_URL = $('input[name="retURL"]').val();
    		var return_URL_Full = document.location.origin + return_URL;
			$('input[name="retURL"]').val(return_URL_Full);
        }
    }
//GDPR implementation
	 $.ajax({
	        url: '/content/dam/cision-revamp/eloqua/formjson/gdpr.csv',
	        dataType: 'text',
	        success: function(data) {
				gdprDomains=data;
	        }
	    });
//EU Countries

 $.ajax({
	        url: '/content/dam/cision-revamp/eloqua/formjson/EuConuntry.csv',
	        dataType: 'text',
	        success: function(data) {
				euCountrys=data;
	        }
	    });
		//gdpr Countries

 $.ajax({
	        url: '/content/dam/cision-revamp/eloqua/formjson/gdprCountry.csv',
	        dataType: 'text',
	        success: function(data) {
				gdprCountries=data;
	        }
	    });

	 var emailDomains="";
		$.ajax({
		        url: '/content/dam/cision-revamp/eloqua/formjson/email.csv',
		        dataType: 'text',
		        success: function(data) {
					emailDomains=data;
		        }
		    });

	$('#emailcheck').css('display', 'none');
	function emailCheck(){
	    gdprEmailCheck();
		var email = $("#emailAddress").val();
		var array = emailDomains.split(',');
	            if(email!="" && email != undefined && email != null){
	                var domain = email.split("@")[1];
	                if(domain!=null && array.indexOf(domain)!=-1){
					 $('#emailcheck').css('display', 'none');
					 }
					 else{
					  $('#emailcheck').css('display', 'block');
					 }
		        }
	            else{
				    $('#gDPROptIn1').parent().css('display', 'none');
					$('#optin').parents('.form-field').addClass('d-none');
					$('#emailcheck').css('display', 'none');
	            }
	}

	$("#emailAddress").focusout(function(){
    		//terms_hide_show();
			gdprEmailCheck();
			if($('#eloquaForm').attr('name') == "USContentISPConvert")
			{
				var flag = gdprEmailValid();
				if(flag == true){
				$('#contact-modalsubmit').prop("disabled", true);
				}
				else{
				$('#contact-modal-submit').prop("disabled", false);
				}
			}
            //emailCheck();
        });
	$('input[type=checkbox].gdprchk').change(function () {

		if($('#gDPROptIn1').is(':checked'))
	    {
		   $('#gDPROptIn1').val("1");
	    }else{
			 $('#gDPROptIn1').val("");
		}
	});
	$('input[type=checkbox].chk').change(function () {
		if($('#optin').is(':checked'))
	    {
		   $('#optin').val("1");
	    }else{
			 $('#optin').val("");

		}

	});
    $('.univform_clearbtn').on('click', function() {

        if($("#busPhone").length > 0){
           phoneInput.setCountry(getFlagVal);
        }

        $('#eloquaForm').trigger("reset");
		  $('#newsletter-Form').trigger("reset");

        setCookie('eloquaForm', '', -1);
		cookieCountry='';
		$('#companytype').parents('.form-field').addClass('d-none');
		$('#companytype').prop('required',false);
		$('#state').parents('.form-field').addClass('d-none');
		$('#state').prop('required',false);
		$('#emailvalid').css('display', 'none');
		$('.selectWrap select').trigger('change');

		gdprEmailCheck();
		$('input, select, textarea').each(function(e){

            var $currEl = $(this);
           if ($currEl.is('select')) {

                if ($currEl.val() === $("option:first", $currEl).val()) {
                    $currEl.parents('.form-field').removeClass('focused');
                } else {
                    $currEl.parents('.form-field').toggleClass('focused', ((e.type === 'focus' || this.value.length > 0) && ($currEl.val() !== $("option:first", $currEl).val())));
                }
            } else {
                $currEl.parents('.form-field').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
            }
        });

        return false;
    });
	var demoCampID = $('#demoCampaignID').val();
    var campaignId = $('#campaignId').val();
    $('#sFDCLastCampaignID').val(campaignId);
    $('#campaign_id').val(campaignId);
    $('#contentDemoRequest1').on('click', function() {
        var formName = $('#eloquaForm').attr('name');
        var optinVal = $('#optin').val();

        if (formName.indexOf('content')!= -1) {
            if ($('#contentDemoRequest1').is(":checked") && demoCampID) {
                $('#sFDCLastCampaignID').val(demoCampID);
                $('#campaign_id').val(demoCampID);
            }else{
				$('#sFDCLastCampaignID').val(campaignId);
                $('#campaign_id').val(campaignId);
            }
        }
        else{
			$('#sFDCLastCampaignID').val(campaignId);
            $('#campaign_id').val(campaignId);
        }
    });

    var parseJSON = function(data) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        return data;
    }
    var $select = $('#country');


    var eloquaForm_val = getCookie('eloquaForm');

	var pathName = location.pathname;
	var pageUrl = window.location.href;
    var cookieCountry = '';
	var countryPath = '/content/dam/cision-revamp/eloqua/formjson/countrydropdown.json';
	var poiPath = '/content/dam/cision-revamp/eloqua/formjson/usproductlist.json';
	var stateJson = '/content/dam/cision-revamp/eloqua/formjson/state.json';
	var jobrolesrc = '/content/dam/cision-revamp/eloqua/formjson/jobrole.json';
	var jobtitlesrc = '/content/dam/cision-revamp/eloqua/formjson/jobtitle.json';

    $.ajax({
        url: countryPath,
        dataType: 'json',
        success: function(data) {

            var d = parseJSON(data);
            var out = '';
            $.each(d.country, function(key, val) {

                    out += '<option value="' + val.value + '">' + val.name + '</option>';

            })
            $('#country').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.country).trigger('change');
                    cookieCountry = obj.country;
                }
            });
        },
        error: function() {
            $select.html('<option id="-1">none available</option>');
        }
    });

    $('#country').on("change", function() {
        $('#optin, #gDPROptIn1').prop('checked', false);
        $select_state.empty();
		$select_companytype.empty();
        var countryID = $('#country option:selected').attr('value');
		gdprEmailCheck();

        if (countryID=="USA" || countryID=="CAN") {
		$('#state').parents('.form-field').removeClass('d-none');
            $.ajax({
                url: stateJson,
                dataType: 'json',
                success: function(data) {

                    var d = parseJSON(data);
                    	var out = '<option value="">Select State/Province*</option>';
                    var statelist = d[countryID];
                    if (statelist == undefined) {
                        $select_state.html('<option value="Not Applicable">Not Applicable</option>');

                    } else {

                        $.each(statelist, function(key, val) {

                      			 out += '<option value="' + val.value + '">' + val.name + '</option>';

                        })
                        $('#state').append(out).promise().done(function() {
                            if ($('#country option:selected').val() == cookieCountry) {
                                var obj = JSON.parse(eloquaForm_val);
                                $(this).val(obj.state);
                            } else {

                                $('option[value=""]', this).attr('selected', 'selected');
                            }
                        });

                    }
                },
            });
            $('#companytype').parents('.form-field').addClass('d-none');
         	$('#state').prop('required',true);
         	$('#companytype').prop('required',false);
        }
		else if(countryID=="GBR" || countryID=="IRL"){
            if(location.hostname.includes('cision.ca') || pathName.includes('cision-ca')){
			     $('#companytype').parents('.form-field').addClass('d-none');
			}else{
				 $('#companytype').parents('.form-field').removeClass('d-none');
			}
            $.ajax({
				url: '/content/dam/cision-revamp/eloqua/formjson/companytype.json',
				dataType: 'json',
				success: function(data) {
					var d = parseJSON(data);
					var out = '<option value="">Select type of company*</option>';
					$.each(d.companytype, function(key, val) {
						out += '<option value="' + val.value + '">' + val.name + '</option>';
					})
					$('#companytype').append(out).promise().done(function() {
						if ($('#country option:selected').val() == cookieCountry) {
							var obj = JSON.parse(eloquaForm_val);
							$(this).val(obj.companytype);
						}
					});
				},
			});
            $('#state').parents('.form-field').addClass('d-none');
            if(location.hostname.includes('cision.ca') || pathName.includes('cision-ca')){
				 $('#companytype').prop('required',false);
			}else{
				 $('#companytype').prop('required',true);
			}
			$('#state').prop('required',false);

		}
		else{
		 $('#state').parents('.form-field').addClass('d-none');
		 $('#companytype').parents('.form-field').addClass('d-none');
         $('#state').prop('required',false);
         $('#companytype').prop('required',false);
         $select_state.html('<option>&nbsp;</option>');
        }
       // terms_hide_show();
            //  $('#state,#companytype').parents('.selectWrap').removeClass('active');
              setTimeout(function(){ $('.custom-styling select').each(function () {
                        if (!$(this).find('option:first-child:selected').length) {
                             $(this).parents('.selectWrap').addClass('active');
                        } else {
                             $(this).parents('.selectWrap').removeClass('active')
                        }
                   });
              	},50);
  });

    $.ajax({
        url: jobrolesrc,
        dataType: 'json',
        success: function(data) {
        	//var pageUrl = window.location.href;
            var d = parseJSON(data);
            var out = '';
            $.each(d.jobrole, function(key, val) {

        	         out += '<option value="' + val.value + '">' + val.name + '</option>';

            })
            $('#jobrole').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.jobrole);
                }
            });
        }
    });
    $.ajax({
        url: jobtitlesrc,
        dataType: 'json',
        success: function(data) {
        	//var pageUrl = window.location.href;
            var d = parseJSON(data);
            var out = '';
            $.each(d.jobtitle, function(key, val) {


        	         out += '<option value="' + val.value + '">' + val.name + '</option>';

            })
            $('#jobtitle').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.jobtitle);
                }
            });

        }
    });

	var companyRevenuesrc = '/content/dam/cision-revamp/eloqua/formjson/companyRevenue1.json';

    $.ajax({
        url: companyRevenuesrc,
        dataType: 'json',
        success: function(data) {
        	//var pageUrl = window.location.href;
            var d = parseJSON(data);
            var out = '';
            $.each(d.companyRevenue1, function(key, val) {
        	         out += '<option value="' + val.value + '">' + val.name + '</option>';
            })
            $('#companyRevenue1').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.companyRevenue1);
                }
            });
        }
    });

    var primaryactivitysrc = '/content/dam/cision-revamp/eloqua/formjson/primaryactivity.json';
    $.ajax({
        url: primaryactivitysrc,
        dataType: 'json',
        success: function(data) {
            var d = parseJSON(data);
            var out = '';
			$.each(d.primaryactivity, function(key, val) {
        	         out += '<option value="' + val.value + '">' + val.name + '</option>';
            })
            $('#primaryactivity').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.primaryactivity);
                }
            });
        }
    });

    var timelsrc = '/content/dam/cision-revamp/eloqua/formjson/time1.json';
    $.ajax({
        url: timelsrc,
        dataType: 'json',
        success: function(data) {
            var d = parseJSON(data);
            var out = '';
			$.each(d.time1, function(key, val) {
        	         out += '<option value="' + val.value + '">' + val.name + '</option>';
            })
            $('#time1').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.time1);
                }
            });
        }
    });

	var time2src = '/content/dam/cision-revamp/eloqua/formjson/time2.json';
    $.ajax({
        url: time2src,
        dataType: 'json',
        success: function(data) {
            var d = parseJSON(data);
            var out = '';
			$.each(d.time2, function(key, val) {
        	         out += '<option value="' + val.value + '">' + val.name + '</option>';
            })
            $('#time2').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.time2);
                }
            });
        }
    });

	var contactpreferencesrc = '/content/dam/cision-revamp/eloqua/formjson/contactpreference.json';
    $.ajax({
        url: contactpreferencesrc,
        dataType: 'json',
        success: function(data) {
            var d = parseJSON(data);
            var out = '';
			$.each(d.contactpreference, function(key, val) {
        	         out += '<option value="' + val.value + '">' + val.name + '</option>';
            })
            $('#contactpreference').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.contactpreference);
                }
            });
        }
    });

    $.ajax({

        url: poiPath,
        dataType: 'json',
        success: function(data) {
		var pageUrl = window.location.href;
            var d = parseJSON(data);
            var out = '';
        $.each(d.productlist, function(key, val) {
	    if(pageUrl.indexOf('/cision-ca2/ca/fr/') > -1 || pageUrl.indexOf('cision.ca/fr/') > -1){
            out += '<option value="' + val.value + '">' + val.text + '</option>';
	    }
		else{
			if($("#poidefaultval").val() === val.value && $("#poidefaultvalOption").val() === ''){
	         out += '<option selected="selected" value="' + val.value + '">' + val.text + '</option>';
			}
			else{
				 out += '<option value="' + val.value + '">' + val.text + '</option>';
			}
       }
	   })
            $('#poi').append(out).promise().done(function() {
                if (eloquaForm_val) {
                    var obj = JSON.parse(eloquaForm_val);
                    $(this).val(obj.poi);
                }
                $('#poi [selected=selected]').prop('selected',true);
            });
        }
    });
    $('#form_signup_center').hide();
    $('#form_signup_right').hide();
	$('#newsletter-error').hide();


     $('#dailybrief,#weeklyrecap').on("click", function() {
        if( $('#dailybrief').is(':checked') || $('#weeklyrecap').is(':checked') ) {
            $('#newsletter-error').hide();
        }
        else{
		$('#newsletter-error').show();
        }
    });

    $('#eloquaForm').on("submit", function(e) {
    	var formprweb = prweb(true);
		if($('#eloquaForm').attr('name')!= "USprwebform" && formprweb == true) {
		var searchInpTxt = $("#eloquaForm").find("#submit")
        $(searchInpTxt).button('loading');
		}
 		if($('#form_error_box').attr('bool')=='true'){
 			e.preventDefault();
 		}

 	});


    $('#newsletter-Form').on("submit", function(e) {
            if( $('#dailybrief').is(':checked') || $('#weeklyrecap').prop("checked")==true ) {
				var res = recaptchaValidate();
				if(res == true)
				{
					var form_name = document.getElementById("newsletter-Form").name;
					//code snippet
					if($('#dailybrief').is(':checked'))
					{
						$('#dailybrief').val("1");
					}else{
						$('#dailybrief').val("");

					}
					if($('#weeklyrecap').is(':checked'))
					{
						$('#weeklyrecap').val("1");
					}
					else{
						$('#weeklyrecap').val("");
					}
					var js_field_obj = {};
					$('#newsletter-Form').find('input[type!="hidden"]').each(function() {
							js_field_obj[this.name] = $(this).val();
					});
					var json_field_str = JSON.stringify(js_field_obj);
					(window.dataLayer=window.dataLayer||[]).push({
					  'event' : 'page.formSubmit',
					  'page.formSubmit' : {
						'name'    : form_name,  // Human-readable form title.
						'step'    : '1',  // Start at 1; only neccessary for paginated forms.
						'type'    : 'ajax',  // "pageload" or "ajax".
						'valid'   : 'True', // True if passed validation, otherwise false.
						'message' : 'success',  // The success/error message displayed to the user.
						'data'    : json_field_str   // All of the submitted form values.
					}});
					$('#newsletter-Form').attr('method','post').attr('action',$('#actionURL').val());
					var searchInpTxt = $("#newsletter-Form").find("#submit")
					$(searchInpTxt).button('loading');
				}
				else{
					$('#recaptchaerror').css('display', 'block');
					e.preventDefault(e);
				}
            }
            else {
				$('#newsletter-error').show();
                e.preventDefault();
            }

    });
    // not visible field removed required
    $('form button[type=submit]').click(function(){
        $(this).parents('form').find('input, select, textarea').not(':visible').each(function(){
			$(this).removeAttr('required');
		});
    });
    //submit data to google analytics
    $('#eloquaForm').on("submit", function(e) {
    var res= false;
		if($('#eloquaForm').attr('name') == "USContentISPConvert"){
		gdprEmailValid();
		}
		if(location.hostname.includes('uat') || location.hostname.includes('uat2')){
        res = true;
        }else{
         res = recaptchaValidate();
        }
		$(this).parents('form').find('input, select, textarea').not(':visible').each(function(){
			$(this).removeAttr('required');
		});
		if(res == true)
        {
			saveVisFieldVals();
            var form_name = document.getElementById("eloquaForm").name;
			//code snippet
			var js_field_obj = {};
			$('#eloquaForm').find('input[type!="submit"],text,select,tel,email').not(':hidden').each(function() {
						js_field_obj[this.name] = escapeHTML($(this).val());
			});
			if($('#poidefaultval').length){
                js_field_obj[$('#poi').attr('name')] = escapeHTML($('#poi').val());
            }
			var json_field_str = JSON.stringify(js_field_obj);
			(window.dataLayer=window.dataLayer||[]).push({
			  'event' : 'page.formSubmit',
			  'page.formSubmit' : {
				'name'    : form_name,  // Human-readable form title.
				'step'    : '1',  // Start at 1; only neccessary for paginated forms.
				'type'    : 'ajax',  // "pageload" or "ajax".
				'valid'   : 'True', // True if passed validation, otherwise false.
				'message' : 'success',  // The success/error message displayed to the user.
				'data'    : json_field_str   // All of the submitted form values.
			}});
			$('#eloquaForm').attr('method','post').attr('action',$('#actionURL').val());
			var searchInpTxt = $("#eloquaForm").find("#submit")
            $(searchInpTxt).button('loading');
		}
        else{
            $('#recaptchaerror').css('display', 'block');
            e.preventDefault(e);
        }
    });

    $('#botdailybrief,#botweeklyrecap').on("click", function() {
        if( $('#botdailybrief').is(':checked') || $('#botweeklyrecap').is(':checked') ) {
            $('#form_signup_center').hide();
        }
        else{
		$('#form_signup_center').show();
        }
    });

    $('#eloquaForm-center').on("submit", function(e) {
		var res = false;
		if(location.hostname.includes('uat') || location.hostname.includes('uat2')){
                res = true;
                }else{
                 res = recaptchaValidate();
                }
    	if(res == true)
            {
            if( $('#botdailybrief').is(':checked') || $('#botweeklyrecap').prop("checked")==true ) {
				var form_name = document.getElementById("eloquaForm-center").name;
				//code snippet
				var js_field_obj = {};
				$('#eloquaForm').find('input[type!="submit"],text,select,tel,email').not(':hidden').each(function() {
						js_field_obj[this.name] = escapeHTML($(this).val());
				});
				var json_field_str = JSON.stringify(js_field_obj);
				(window.dataLayer=window.dataLayer||[]).push({
				  'event' : 'page.formSubmit',
				  'page.formSubmit' : {
					'name'    : form_name,  // Human-readable form title.
					'step'    : '1',  // Start at 1; only neccessary for paginated forms.
					'type'    : 'ajax',  // "pageload" or "ajax".
					'valid'   : 'True', // True if passed validation, otherwise false.
					'message' : 'success',  // The success/error message displayed to the user.
					'data'    : json_field_str   // All of the submitted form values.
				}});
				$('#eloquaForm').attr('method','post').attr('action',$('#actionURL').val());
				var searchInpTxt = $("#eloquaForm").find("#submit")
				$(searchInpTxt).button('loading');
            }
            else {

                e.preventDefault();
            }
			}
            else{

                $('#recaptchaerror').css('display', 'block');
            	e.preventDefault(e);
            }

    });

    $('#topdailybrief,#topweeklyrecap').on("click", function() {
        if( $('#topdailybrief').is(':checked') || $('#topweeklyrecap').is(':checked') ) {
            $('#form_signup_right').hide();
        }
        else{
		$('#form_signup_right').show();
        }
    });

    $('#eloquaForm-right').on("submit", function(e) {
		var res = false;
		if(location.hostname.includes('uat') || location.hostname.includes('uat2')){
                res = true;
                }else{
                 res = recaptchaValidate();
                }
        if(res == true)
        {

            if( $('#dailybrief').is(':checked') || $('#weeklyrecap').prop("checked")==true) {
                var form_name = document.getElementById("eloquaForm-right").name;
				//code snippet
				var js_field_obj = {};
				$('#eloquaForm-right').find('input[type!="submit"],text,select,tel,email').not(':hidden').each(function() {
						js_field_obj[this.name] = escapeHTML($(this).val());
				});
				var json_field_str = JSON.stringify(js_field_obj);
				(window.dataLayer=window.dataLayer||[]).push({
				  'event' : 'page.formSubmit',
				  'page.formSubmit' : {
					'name'    : form_name,  // Human-readable form title.
					'step'    : '1',  // Start at 1; only neccessary for paginated forms.
					'type'    : 'ajax',  // "pageload" or "ajax".
					'valid'   : 'True', // True if passed validation, otherwise false.
					'message' : 'success',  // The success/error message displayed to the user.
					'data'    : json_field_str   // All of the submitted form values.
				}});
				$('#eloquaForm-right').attr('method','post').attr('action',$('#actionURL').val());
				var searchInpTxt = $("#eloquaForm-right").find("#submit")
				$(searchInpTxt).button('loading');
				}
            else {
                e.preventDefault();
            }
		}
        else{

            $('#recaptchaerror').css('display', 'block');
            e.preventDefault(e);
        }

    });

    prefill();
	gdprEmailCheck();
   // terms_hide_show();
});


function prefill() {
    var eloquaForm_val = getCookie('eloquaForm');
    if (eloquaForm_val) {
        var obj = JSON.parse(eloquaForm_val);
        $("#firstName").val(obj.firstName);
        $("#lastName").val(obj.lastName);
        $("#emailAddress").val(obj.emailAddress);
        $(".emailAddress").val(obj.emailAddress);
        $("#company").val(obj.company);
        $("#professorname").val(obj.professorname);
		$("#email").val(obj.email);
        /*$("#country").promise().done(function(){
				//$(this).val(obj.country);
                console.log(obj.country)
            });*/

        //$("#country").val(obj.country);
        $("#website").val(obj.website);
        $("#city").val(obj.city);
        $("#poi").val(obj.poi);
        $("#companydescription").val(obj.companydescription);
        $("#partnershipopps").val(obj.partnershipopps);
        $("#state").val(obj.state);
        $("#producttype").val(obj.producttype);
        $("#busPhone").val(obj.busPhone);
        $("#mobilePhone").val(obj.mobilePhone);
        if (obj.jobrole != 'undefined' && obj.jobrole != null && obj.jobrole != "") {
            $("#jobrole").val(obj.jobrole);
        }

        $("#jobrole").val(obj.jobrole);
        $("#jobtitle").val(obj.jobtitle);
		$("#companyRevenue1").val(obj.companyRevenue1);
        $("#time1").val(obj.time1);
		$("#time2").val(obj.time2);
		$("#contactpreference").val(obj.contactpreference);
		$("#primaryactivity").val(obj.primaryactivity);


        //$("#jobrole").val(obj.jobrole);
        //$("#jobtitle").val(obj.jobtitle);
    }

}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var url = escapeHTML(window.location.pathname);
    var path_parts = url.match(/[^/]+/);
    var path = path_parts ? "/" + path_parts[0] + "/" : "/";
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + path + ";";
}
function gdprEmailCheck(){
	var email = $("#emailAddress").val();
	var ctry = $("#country").val();
	 gdprflag = false;
	var array = gdprDomains.split(',').map(function (value) {
                                          return value.trim();
                                   });
	var euCountryArray = euCountrys.split(',').map(function (value) {
                          return value.trim();
                          });
	var gdprCountryArray = gdprCountries.split(',').map(function (value) {
                                                         return value.trim();
                            });
	if(email!="" && email != undefined && email != null){
		 var domain = email.split("@")[1];
		  if(domain!=null && array.indexOf(domain)!=-1){
			  gdprflag = true; //GDPR Email
			  if (euCountryArray.indexOf(ctry) > -1 && gdprflag) {
				  //EU +GDPR Email
				  if($('#gDPROptIn1').parents('.form-field').hasClass('d-none')){
					$('#gDPROptIn1').parents('.form-field').removeClass('d-none');
					}
					if(!$('#gDPROptIn1').parents('.form-field').hasClass('d-none')){
						 $('#gDPROptIn1').prop('required',true);
					$('#gDPROptIn1').val("1");
					}

					 if(!$('#divTC').parents('.form-field').hasClass('d-none')){
						$('#divTC').parents('.form-field').addClass('d-none');
					}
					 if(!$('#optin').parents('.form-field').hasClass('d-none')){
                         $('#optin').parents('.form-field').addClass('d-none');
                        }
			  }else{
				  if(!$('#gDPROptIn1').parents('.form-field').hasClass('d-none')){
						$('#gDPROptIn1').parents('.form-field').addClass('d-none');
						$('#gDPROptIn1').removeAttr('required');
					}
				if($('#divTC').parents('.form-field').hasClass('d-none')){
					$('#divTC').parents('.form-field').removeClass('d-none');
				}
				if(!$('#optin').parents('.form-field').hasClass('d-none')){
					$('#optin').parents('.form-field').addClass('d-none');
				}
			  }

		  } else { //gdpr email domain not null
		gdprflag = false;
		$('#gDPROptIn1').val("");
		if(!$('#gDPROptIn1').parents('.form-field').hasClass('d-none')){
			 $('#gDPROptIn1').parents('.form-field').addClass('d-none');
			 $('#gDPROptIn1').removeAttr('required');
		}
		if($('#divTC').parents('.form-field').hasClass('d-none')){
			 $('#divTC').parents('.form-field').removeClass('d-none');
			}
			if(!$('#optin').parents('.form-field').hasClass('d-none')){
			 $('#optin').parents('.form-field').addClass('d-none');
			}
	}
}else {
    if(!$('#gDPROptIn1').parents('.form-field').hasClass('d-none')){
        $('#gDPROptIn1').parents('.form-field').addClass('d-none');
		$('#gDPROptIn1').removeAttr('required');
    }
    if($('#divTC').parents('.form-field').hasClass('d-none')){
    	$('#divTC').parents('.form-field').removeClass('d-none');
    }
    if(!$('#optin').parents('.form-field').hasClass('d-none')){
     $('#optin').parents('.form-field').addClass('d-none');
    }
}
if(gdprCountryArray.indexOf(ctry) > -1) { //gdpr country
		if($('#gDPROptIn1').parents('.form-field').hasClass('d-none')){
			 $('#gDPROptIn1').parents('.form-field').removeClass('d-none');
			}
            if(!$('#gDPROptIn1').parents('.form-field').hasClass('d-none')){
				 $('#gDPROptIn1').prop('required',true);
				$('#gDPROptIn1').val("1");
			}
			if(!$('#divTC').parents('.form-field').hasClass('d-none')){
			 $('#divTC').parents('.form-field').addClass('d-none');
			}
			if(!$('#optin').parents('.form-field').hasClass('d-none')){
			 $('#optin').parents('.form-field').addClass('d-none');
			}
		}
		if (ctry == 'CAN') {
			if(!$('#gDPROptIn1').parents('.form-field').hasClass('d-none')){
			 $('#gDPROptIn1').parents('.form-field').addClass('d-none');
			$('#gDPROptIn1').removeAttr('required');
			}
			if(!$('#divTC').parents('.form-field').hasClass('d-none')){
			 $('#divTC').parents('.form-field').addClass('d-none');
			}
			if($('#optin').parents('.form-field').hasClass('d-none')){
			 $('#optin').parents('.form-field').removeClass('d-none');
			}
		  if($('#optin').is(':checked'))
			{
			$('#optin').val("1");
			}else{
			$('#optin').val("");
			}
		}
}
function gdprEmailValid(){
		var email = $("#emailAddress").val();
		//var urlchk = window.location.href;
		var ctry = $("#country").val();
		var emailflag =false;
		//var submitButton = document.getElementById('submit');
        gdprflag = false;
            var array = gdprDomains.split(',');
            if(email!="" && email != undefined && email !=null){
                var domain = email.split("@")[1];
                if(domain!=null && array.indexOf(domain)!=-1){
				 gdprflag = true;
				 var emaildomain = email.split("@")[1];

					 $('#emailvalid').css('display', 'block');
					emailflag = true;
					// submitButton.disabled = true;

				}
				else{
					$('#emailvalid').css('display', 'none');
				}

		}
		return emailflag;
}

function setFormFields() {
    document.getElementById('eloquaForm').elements['CLID'].value = getQueryStringParamValue('clid');
    //repeat for each field to populate
    setFieldFromCookie('GA_Campaign__c', 'cs_ck_utm_campaign');
    setFieldFromCookie('GA_Content__c', 'cs_ck_utm_content');
    setFieldFromCookie('GA_Medium__c', 'cs_ck_utm_medium');
    setFieldFromCookie('GA_Source__c', 'cs_ck_utm_source');
    setFieldFromCookie('GA_Term__c', 'cs_ck_utm_term');
    setFieldFromCookie('KCID__c', 'cs_ck_trkid');

    //google click id gclid
    document.getElementById("gclid").value = (name = new RegExp('(?:^|;\\s*)gclid=([^;]*)').exec(document.cookie)) ? name.split(",")[1] : "";
}
$(function() {
	//eloqua tarcking params
		var defaultPages = {};
		defaultPages['/us']='homepage';
		defaultPages['/pricing']='pricing-page';
		defaultPages['/request-demo']='demo-request';
		defaultPages['/contact-us']='contact-us';
		defaultPages['/products/database']='product-page-database';
		defaultPages['/products/distribution']='product-page-distribution';
		defaultPages['/products/monitoring']='product-page-monitoring';
		defaultPages['/products/analytics']='product-page-analysis';
		defaultPages['/products/commscloud']='product-page-analysis';


	var checkRefExist = function(refURL) {
		var isRefExist = false;
		var refObj = {};
		refObj.isRefExist = false;
		var loctag = document.createElement("a");
		loctag.href = refURL;
		var path = loctag.href;
		var pathUrl = window.location.href;

		if(path.indexOf('/resources') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/resources'];
		}else if(path.indexOf('/pricing') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/pricing'];
		}else if(path.indexOf('/contact-us') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/contact-us'];
		}else if(path.indexOf('/products/database') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/products/database'];
		}else if(path.indexOf('/products/distribution') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/products/distribution'];
		}else if(path.indexOf('/products/monitoring') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/products/monitoring'];
		}else if(path.indexOf('/products/analytics') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/products/analytics'];
		}else if(path.indexOf('/products/commscloud') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/us/products/commscloud'];
		}else if(path.indexOf('/request-demo') > -1){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/request-demo'];
		}else if(path.indexOf('/us') > -1 && path.length < 27){
			refObj.isRefExist = true;
		refObj.campVal = defaultPages['/us'];
		}else{
		refObj.isRefExist = true;
		refObj.campVal = '';
		}
		return refObj;
	};

    //Do Prefill logic here

    prepopFields();


    function setCampaignParams(campaign_values) {
        var paramList = campaign_values.split('&');
        var paramName = "";
        var paramValue = "";
        for (i = 0; i < paramList.length; i++) {
            paramName = paramList[i].split('=')[0];
            paramValue = paramList[i].split('=')[1];
            if (paramName == 'utm_medium') {
                $("#gAMedium1").val(paramValue);
                $("#originalGAMedium1").val(paramValue);
            }
            if (paramName == 'utm_source') {
                $("#gASource1").val(paramValue);
                $("#originalGASource1").val(paramValue);
            }
            if (paramName == 'utm_content') {
                $("#originalGAContent1").val(paramValue);
                $("#gAContent1").val(paramValue);
            }
            if (paramName == 'utm_campaign') {
                $("#originalGACampaign1").val(paramValue);
                $("#gACampaign1").val(paramValue);
            }
            if (paramName == 'utm_term') {
                $("#originalGATerm1").val(paramValue);
                $("#gATerm1").val(paramValue);
            }
            if (paramName == 'gclid') {
                $("#gclid").val(paramValue);

            }
            if(paramName == 'campaigncode')
			{
				$("#campaigncode").val(paramValue);
			}
        }
    }



    function setDefaultCampaignParams(campaign_name) {
        var defVal = "website";
        $("#gAMedium1").val(defVal);
        $("#originalGAMedium1").val(defVal);
        $("#gASource1").val(defVal);
        $("#originalGASource1").val(defVal);
        $("#originalGAContent1").val(defVal);
        $("#gAContent1").val(defVal);
        $("#originalGACampaign1").val(campaign_name);
        $("#gACampaign1").val(campaign_name);
        $("#gATerm1").val(campaign_name);
        $("#originalGATerm1"). val(campaign_name);
    }

    function prepopFields() {

        //set form values
        try {
            var pageUrl = window.location.href;
            var refObj = "";
            var isValuesSet = false;


            //First set values from page url if exists
            if (pageUrl.indexOf('utm') > 0 && pageUrl.indexOf('?') > 0) {
                var campaign_values = pageUrl.split("?")[1];
                setCampaignParams(campaign_values);
                saveCampFieldVals();
                isValuesSet = true;

            } else {

			if(!isValuesSet){
				if(document.referrer !=""){
					  if(document.referrer.startsWith('https://')){
						  var currentdomain = encodeURIComponent(document.referrer);
	                        refObj = checkRefExist(currentdomain);
	                    }
					//refObj = checkRefExist(encodeURIComponent(document.referrer));
					if (refObj != null && refObj.isRefExist) {
						if((pageUrl.indexOf('/resources')  > -1) || (pageUrl.indexOf('/resources/')  > -1)){
	                        setDefaultCampaignParams($('#gACampaign1').val());
						} else{
							setDefaultCampaignParams(refObj.campVal);
						}
					}
				}
				else if(document.referrer ==""){
					if(pageUrl.indexOf('/products/database')  > -1){
							setDefaultCampaignParams("product-page-database");
					}
					else if(pageUrl.indexOf('/products/monitoring')  > -1){
							setDefaultCampaignParams("product-page-monitoring");
					}
					else if(pageUrl.indexOf('/products/monitoring')  > -1){
							setDefaultCampaignParams("product-page-monitoring");
					}
					else if((pageUrl.indexOf('/resources')  > -1) || (pageUrl.indexOf('/resources/')  > -1)){
                        setDefaultCampaignParams($('#gACampaign1').val());
					}
					else if(pageUrl.indexOf('/pricing')  > -1){
							setDefaultCampaignParams("pricing-page");
					}
				}
				if(pageUrl.includes("cision.com") || pageUrl.includes("/cision-us/us")){
					blogRegex = new RegExp('[0-9]{4}');
                    if(pageUrl.indexOf('/contact-us')  > -1){
                            setDefaultCampaignParams("contact-us");
                    }
                    else if(pageUrl.indexOf('/request-demo')  > -1){
                            setDefaultCampaignParams("demo-request");
                    }
                    else if(pageUrl.split("/")[3].match(blogRegex) || pageUrl.indexOf("/resources/articles/") > -1)
                    {
                        setDefaultCampaignParams("");
                    }
				}
            }
            }

        } catch (err) {}
    }



    function getQueryStringParamValue(strQStrParam) {
        var strURL = document.location.href;
        var strQStrParamValue = "";

        if (strURL.indexOf('?') != -1) {
            strQStrParamValue = strURL.substr(strURL.indexOf('?') + 1);
            if (strQStrParamValue == "") {
                //window.setTimeout(window.location = "http://us.cision.com/contact_us/demo_request_string.asp",2000);
                //
                //window.setTimeout(window.location = "http://us.cision.com/contact_us/demo_request_string.asp",2000);
            } else if (strQStrParamValue.indexOf(strQStrParam) != -1) {
                strQStrParamValue = strQStrParamValue.substr(strQStrParamValue.indexOf(strQStrParam));
                strQStrParamValue = strQStrParamValue.substr(strQStrParamValue.indexOf('=') + 1);

                if (strQStrParamValue.indexOf('&') != -1)
                    strQStrParamValue = strQStrParamValue.substr(0, strQStrParamValue.indexOf('&'));
                return strQStrParamValue;

            }
        }
    }



    function setFieldFromCookie(field, cookie_name) {
        var form_cnt = document.forms.length;
        for (var x = 0; x < form_cnt; x++) {
            var tmp_form = document.forms[x];
            if (tmp_form != undefined) {
                var tmp_field = tmp_form.elements[field];
                if (tmp_field != undefined) {
                    tmp_field.value = getCookie(cookie_name);
                }
            }
        }
    }

    function setFormFields() {
        $("#CLID").val(getQueryStringParamValue('clid'));


        //google click id gclid
        $("#gclid").val((name = new RegExp('(?:^|;\\s*)gclid=([^;]*)').exec(document.cookie)) ? name.split(",")[1] : "");
    }

});

function saveVisFieldVals() {
    var js_field_obj = {};
    $('#eloquaForm').find('input[type!="submit"],text,select,tel,email').not(':hidden').each(function() {
        js_field_obj[this.name] = escapeHTML($(this).val());
    });
    var json_field_str = JSON.stringify(js_field_obj);
    setCookie('eloquaForm', json_field_str, 90);
}

function terms_hide_show() {
    var ctry = $("#country").val();
	var urlchk = document.location.href;
    if (ctry == 'CAN') {
        if (urlchk.includes('cision-de2/de') || urlchk.includes('cision.de') || urlchk.includes('cision-se') || urlchk.includes('cision.se') || urlchk.includes('cision-no') || urlchk.includes('cision.no')|| urlchk.includes('cision-fr') || urlchk.includes('cision.fr')) {
			$('.confirm-text').css('display', 'none');
			$('#optin').parents('.form-field').removeClass('d-none');
			$('#divTC').css('display', 'block');
			$('#gDPROptIn1').parent().css('display', 'block');
		}
		else{
			$('.confirm-text').css('display', 'none');
			$('#optin').parents('.form-field').removeClass('d-none');
			$('#divTC').css('display', 'none');
			$('#gDPROptIn1').parent().css('display', 'none');
			$('#gDPROptIn1').removeAttr('required');
			$('#gDPROptIn1').val("");
		}
		if($('#optin').is(':checked'))
	    {
		   $('#optin').val("1");
	    }else{
			 $('#optin').val("");

		}
    }
	else{
		if (urlchk.includes('cision.co.uk') || urlchk.includes('cision-uk') || urlchk.includes('cision-ca') || urlchk.includes('cision.ca')) {
				gdprEmailCheck();
			if(gdprflag){
				$('#gDPROptIn1').parent().css('display', 'block');
				$('#gDPROptIn1').val("1");

			}
			else{
				$('#gDPROptIn1').parent().css('display', 'none');
				$('#gDPROptIn1').val("");
			}
		if (ctry != 'CAN' && gdprflag == true) {
			$('#divTC').css('display', 'none');
		}else if(gdprflag == false && ctry != 'CAN'){
			 $('#divTC').css('display', 'block');
		}else{
			$('#divTC').css('display', 'block');
		}
        $('#optin').parents('.form-field').addClass('d-none');
        $('.confirm-text').css('display', 'block');
		$('#optin').val("");
    }else{
		gdprEmailCheck();
			if(gdprflag){
				$('#gDPROptIn1').parent().css('display', 'block');
				$('#gDPROptIn1').val("1");
			}
			else{
				if (urlchk.includes('cision-de2') || urlchk.includes('cision.de') || urlchk.includes('cision-se') || urlchk.includes('cision.se') || urlchk.includes('cision-no') || urlchk.includes('cision.no')|| urlchk.includes('cision-fr') || urlchk.includes('cision.fr')) {
					$('#gDPROptIn1').parent().css('display', 'block');
				 }
				else{
					$('#gDPROptIn1').parent().css('display', 'none');
					$('#gDPROptIn1').val("");
				}
			}
		$('#divTC').css('display', 'block');
        $('#optin').parents('.form-field').addClass('d-none');
        $('.confirm-text').css('display', 'block');
		$('#optin').val("");
	}
}

}

function prweb(bRetry){
	   var bAjaxSuccess = true;
	   if($('#eloquaForm').attr('name') == "USprwebform" && $('#ajaxHit').val()=='false'){
			$('#form_error_box').remove();
		    $('#eloquaForm').removeAttr('method');
			$('#eloquaForm').removeAttr('post');
			var univform_errors = [];
			var g_redirect_url=$('input[name="retURL"]').val();;
			var redirectLink = "https://app.prweb.com/Login.aspx?campaigncode="+escapeHTML($("input[name=campaigncode]").val())+"utm_source="+escapeHTML($("input[name=gASource1]").val())+"&utm_medium="+escapeHTML($("input[name=gAMedium1]").val())+"&utm_campaign="+escapeHTML($("input[name=gACampaign1]").val())+"&prw_ga_use_case=2";
			$.ajax({
	    				async: false,
	    				method: "POST",
	    				cache: false,
	    				url: '/bin/cision-restructure/prwebAccountSignup/',
	    				data: {
	    					fname: $('#firstName').val(),
	    					lname: $('#lastName').val(),
	    					phone: $('#busPhone').val(),
	    					org: $('#company').val(),
	    					country: $('#country').val(),
	    					email: $('#emailAddress').val(),
	    					pass: $('#password').val(),
	    					utm_campaign: $("input[name=gACampaign1]").val(),
	    					utm_medium: $("input[name=gAMedium1]").val(),
	    					utm_source: $("input[name=gASource1]").val(),
	    					campaigncode: $("input[name=campaigncode]").val(),
	    					prw_ga_use_case: '1',
	    					lang_id: '1033'
	    				},
	    				success: function(data){

	    					var json = JSON.parse(data);

	    					bAjaxSuccess = true;

	    					if(json.ierror){
	    						bAjaxSuccess = false;
	    						if(json.ierror == 'timeout'){
	    							univform_errors.push('processing request...');
	    							univform_showerrors(univform_errors);

	    							setTimeout(function(){
	    								prweb(true);
	    							},200);
	    						}
	    					}
	    					else if(json.string.error){
	    						if(bRetry && json.string.error.includes('LoginTaken')){
	    							g_redirect_url = 'https://app.prweb.com/Login.aspx';
	    						}
	    						else {
	    							if(json.string.error.includes('CreateCompanyFailed') || json.string.error.includes('already exists')){
	    								json.string.error = "You already have a PRWeb account. Please <a class='error_link' href='" + redirectLink + "'>click this link</a> to log in to your account.  ";
	    							}
	    						}
	    						bAjaxSuccess = false;
    							univform_errors.push(json.string.error);
    							univform_showerrors(univform_errors);
	    					}

	    					if(bAjaxSuccess) {
	    						$("#returl").val(g_redirect_url);
	    						$("#password").val('');
								$('#ajaxHit').attr('value','true');
								$('#eloquaForm').attr('method','post').attr('action',$('#actionURL').val());
								var searchInpTxt = $("#eloquaForm").find("#submit")
                                $(searchInpTxt).button('loading');
								$('#eloquaForm').submit();

	    					}else{
	    						$(".submitbutton").val("Submit");
	    					}

	    				},
	    			});
			    }
	            return bAjaxSuccess;

        }

function univform_showerrors(univform_errors){
		var t_errors = "";
		for(var x = 0; univform_errors[x];x++){
			t_errors += "<div>"+univform_errors[x]+"</div>";
		}
		var errorDisplay = "<div id='form_error_box' bool='true' style='color: red; margin-bottom: 10px;font-size: 14px;'>"+t_errors+"</div>"
		$("#submit").parent().prepend(errorDisplay);
}

function updateCaptcha() {
  	grecaptcha.execute('6LcND_QUAAAAAP1F-ViHZtRv64_xwiGtTa9A4q8f', {action: 'submit'}).then(function(token) {
    $('#recaptchaToken').val(token)
  	});
}

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
	return recaptchaFlag;
}
