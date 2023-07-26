(function ($, window, document)
{
	/* Adapting window object to foundation-registry */
    var registry =  $(window).adaptTo("foundation-registry");

	/*Validator for CoralUI 3 Multifield - Any Custom logic can go inside validate function */
    /* data attribute to come via granite:data node under multifield node(with properties) */
    registry.register("foundation.validation.validator",{

       	selector: "[data-validation=multi-validate]",
        validate: function (el)
        {
			var element = $(el);
            var fieldLimit = element.data("fieldlimit");
			var multiLength = element.find(".coral3-Multifield-item").length;

            if(multiLength > fieldLimit)
            {
				var ui = $(window).adaptTo("foundation-ui");
                ui.alert("Warning", "Maximum " + fieldLimit + " Multifield items are allowed!", "notice");
                return "Only "+fieldLimit+" Multifield items are allowed";
            }
            else
            {
                return ;
            }
        }
	});
})
($, window, document);