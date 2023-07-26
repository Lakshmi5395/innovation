var clickCount=0;
$(document).ready(function(){
 $('.custom-loadmore').on('click', function() {
     clickCount++;
$.ajax({
    type: "GET",
    url: "/bin/cision-revamp/resources",
    data: { currentPagePath:$('#currentPagePath').val(),
           clickCount:clickCount,
           records:$('#countfiltertext').val(),
                        },
              dataType: 'JSON',
success: function (response) {
            Success = true;//doesn't go here

    var container = $(".js-posts-list");
    if(response !=null){
        for (var i = 0; i < response.length; i++) {
            var dataLoad = response[i];
            if($('#isAuthor').val()=="mode=true"){
             var pagePath = dataLoad.pagePath;
             }else{
              var pagePath = dataLoad.pagePath.replace("/content/cision/us/en","");
              pagePath =pagePath.replace(".html","/");
             }
            var thumbnailImg = dataLoad.thumbnailImg;
            if(thumbnailImg!=null){
              thumbnailImg = dataLoad.thumbnailImg;
                 }else{
                   thumbnailImg ='/content/dam/cision-revamp/cision-optimized/global-assets/logo-cision-dark-lg.jpg';
                    }
            var title = dataLoad.title;
            var resCategory = dataLoad.resCategory;
            var createHTML = '<div class="post">' +
            '<div class="post-content">' +
                '<div class="image">' +
                    '<a href="' + pagePath + '"></a>' +
                        '<img src="' + thumbnailImg + '" alt="'+ title +'"></div>' +
                            '<div class="details"><a  class="category">' + resCategory + '</a>' +
                                '<h3 class="title"> <a href="' + pagePath + '">' + title + '</a></h3> </div></div><hr class="divider"></div>';

                 container.append(createHTML);
        }
    }else{
       $('.load-more').hide();
    }

        },
        error: function (textStatus, errorThrown) {
            Success = false;
        }
        });
      });
      })