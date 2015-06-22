$(function() {
// do something on document ready

     function changePlaceholder() {
          
          // create our list of different placeholders we'll use
          var placeHolders = new Array();
          placeHolders[0] = "Search for Google";
          placeHolders[1] = "Search for Microsoft";
          placeHolders[2] = "Search for Facebook";
          
          // x will be our counter for what placeholder we're currently showing
          var x = 0;
          
          // change the placeholder to the current number of our counter
          $('#searchBox').attr('placeholder', placeHolders[x]);

          // increase the counter
          x++;
	  
          // if we've hit the last placeholder then start over
          if(x >= placeHolders.length) {
               x = 0;
          }
	  
          // run this function again in 3 seconds to keep the loop going	
          setTimeout(changePlaceholder, 1000);
     }
	
     // start running the changePlaceholder function after 3 seconds
     t = setTimeout(changePlaceholder, 1000);
     });