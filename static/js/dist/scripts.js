  $.ajax({
  url:"https://www.kimonolabs.com/api/cxy6x3cw?apikey=70362f2a05a633871d07f1faeacd7e36",
  crossDomain: true,
  dataType: "jsonp",
  success: function (response) {    
          console.log(response);
          $.each(response, function(i, item){
              
              
              var text = item.text;
              var href = item.href;
              
              
              //$("<img/>").attr("src", src).appendTo("#wrapper").wrap('<div class="postImage"></div>').after('<span class="postCaption">' + body + '</div>');
              if(text && href) {

                  $('<h4><a href="' + href +   '" target="_blank">' +  text + '</a></h4>').appendTo('#content_feed');
                    }

                    else if(item.text) {
                      $('<h4>' + item.title + '</h4>').appendTo('#content_feed');
                
                }
                
                    $('<hr />').appendTo('#content_feed');
              


              });
            
  },
  error: function (xhr, status) {
    //handle errors
    console.log(response);
  }
});