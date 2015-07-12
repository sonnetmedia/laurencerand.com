  $.ajax({
  url:"https://www.kimonolabs.com/api/5ntk8dfc?apikey=70362f2a05a633871d07f1faeacd7e36&kimlimit=3",
  crossDomain: true,
  dataType: "jsonp",
    success: function (response) {    
          // console.log(response);
          $(".panel-heading").html(response.name);
          var collection = response.results.collection1;
            for (var i = 0; i < collection.length; i++){
              // Traverses through every element in the entire collection
              $(".list-group").append('<li class="list-group-item"><a href="' + collection[i].title.href + '" target="_blank">' + collection[i].title.text + '</a></li>');
                // adds the text and the links from the first property into the list
              }

            },
        error: function (xhr, status) {
    //handle errors
    console.log(response);
  }
});