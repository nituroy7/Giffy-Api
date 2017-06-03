 $(document).ready(function() {

     // Initial array of topics
     var topics = ["dog", "cat", "pig", "cow", "mouse", "horse", "zebra", "rat", "giraffe", "lion", "rhinoceros", "elephant", "peacock", "tiger", "frog", "chicken", "rabbit", "fox"];

     function animateImage() {
         var movingImageSrc = $(this).attr("data-moving-src");
         var stillImageSrc = $(this).attr("data-still-src");
         if (!$(this).hasClass('moving')) {
             $(this).attr("src", movingImageSrc);
             $(this).addClass('moving');
         } else {
             $(this).attr("src", stillImageSrc);
             $(this).removeClass('moving');
         }
     }

     function displayAnimalimages() {
         var animal = $(this).attr("data-name");
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
         $.ajax({
             url: queryURL,
             method: "GET"
         }).done(function(response) {
             // storing the data from the AJAX request in the results variable

             var results = response.data;

             // Looping through each result item
             for (var i = 0; i < results.length; i++) {
                 var animalDiv = $("<div class=\"animal-item\">");
                 // Creating a paragraph tag with the result item's rating
                 var p = $("<p>").text("Rating: " + results[i].rating);

                 // Creating and storing an image tag
                 var animalImage = $("<img>");
                 // Setting the src attribute of the image to a property pulled off the result item
                 animalImage.attr("src", results[i].images.fixed_height_still.url);
                 animalImage.attr("data-still-src", results[i].images.fixed_height_still.url);
                 animalImage.attr("data-moving-src", results[i].images.fixed_height.url);

                 // Appending the paragraph and image tag to the animalDiv
                 animalDiv.append(p);
                 animalDiv.append(animalImage);

                 // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                 $("#gifs-appear-here").prepend(animalDiv);

             }
         });
     }

     // Function for displaying animal data
     function renderButtons() {

         // Deleting the animal buttons prior to adding new animal buttons
         // (this is necessary otherwise we will have repeat buttons)
         $("#animal-view").empty();

         // Looping through the array of topics
         for (var i = 0; i < topics.length; i++) {

             // Then dynamicaly generating buttons for each animal in the array.
             // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
             var a = $("<button>");
             // Adding a class
             a.addClass("animal");
             // Adding a data-attribute with a value of the animal at index i
             a.attr("data-name", topics[i]);
             // Providing the button's text with a value of the animal at index i
             a.text(topics[i]);
             // Adding the button to the HTML
             $("#animal-view").append(a);
         }
     }

     // // This function handles events where one button is clicked
     $("#add-animal").on("click", function(event) {
         // event.preventDefault() prevents the form from trying to submit itself.
         // We're using a form so that the user can hit enter instead of clicking the button if they want
         event.preventDefault();

         // This line will grab the text from the input box
         var animal = $("#animal-input").val().trim();
         // The animal from the text box is then added to our array
         topics.push(animal);

         // calling renderButtons which handles the processing of our animal array
         renderButtons();
     });

     // Calling the renderButtons function at least once to display the initial list of topics

     // Adding a click event listener to all elements with a class of "animal"
     $(document).on("click", ".animal", displayAnimalimages);

     $(document).on("click", "img", animateImage);

     // Calling the renderButtons function to display the intial buttons
     renderButtons();
 });
