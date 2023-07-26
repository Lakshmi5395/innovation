
$(document).ready(function(){

    $.ajax({
        url: "/content/dam/cision-revamp/dropdown/resourceType.json",
        dataType: 'json',
        success: function(data) {
            var d = data;
            var out = '';
            $.each(d.resourceType, function(key, val) {
        	         out += '<option value="' + val.value + '">' + val.name + '</option>';
            })
             $('#type').append(out);
        }
    });

    $.ajax({
        url: "/content/dam/cision-revamp/dropdown/resourceCategory.json",
        dataType: 'json',
        success: function(data) {
            var d = data;
            var out = '';
            $.each(d.resourceCategory, function(key, val) {
        	         out += '<option value="' + val.value + '">' + val.name + '</option>';
            })
             $('#subject').append(out);
        }
    });
    $('#type,#subject').on('change', function(){
        var resourceType= $('#type').val();
        var  resourceCategory=$('#subject').val();

$.ajax({
    type: "GET",
    url: "/bin/cision-revamp/resourceSelector",
    data: { currentPagePath:$('#currentPagePath').val(),
           resourceType:resourceType,
           resourceCategory:resourceCategory,
                        },
              dataType: 'JSON',
success: function (response) {
            Success = true;//doesn't go here
    var container = $(".grid");
    $(".grid").html('');
    if(response !=null){
        for (var i =response.length-1; i>=0; i--) {
            var dataLoad = response[i];

            if($('#isAuthor').val()=="mode=true"){
                       var pagePath = dataLoad.pagePath;
                        }else{
                         var pagePath = dataLoad.pagePath.replace("/content/cision/us/en","");
                        pagePath =pagePath.replace(".html","/");
                        }
            var thumbnailImg = dataLoad.thumbnailImg;
            var title = dataLoad.title;
            var resCategory = dataLoad.resCategory;
            var createHTML = '<div class="post">' +
                '<div class="image">' +
                    '<a href="' + pagePath + '"></a>' +
                        '<img src="' + thumbnailImg + '" alt="'+ title +'"></div>' +
                            '<div class="details"><a  class="category">' + resCategory + '</a>' +
                                '<h3 class="title"> <a href="' + pagePath + '">' + title + '</a></h3> </div></div>';

                 container.append(createHTML);
        }
    }

        },
        error: function (textStatus, errorThrown) {
            Success = false;
        }
        });

    });

      });

