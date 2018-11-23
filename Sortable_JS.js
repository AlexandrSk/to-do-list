$(function () {

    $("#sortable").sortable({
        update: function (event, ui) {
            save1();
        }
    });
	$('#sortable').sortable({
    revert: 100
	});
    $("#sortable").disableSelection();
    $("#btnClear").attr("Disabled");
    // get shopping list from localStorage or create the list if it's not there  
    var shopping = [];
    if (!localStorage.shoppingText) {
        // make an array of shopping items
        shopping = [];
        shopping.sort();
    } else {
        var shoppingText = localStorage.shoppingText;
        shopping = shoppingText.split(",");
    }

    /* build the list of shopping items */
    // a temporary variable in which to build a the list items 
    var textToInsert = "";
    // using $.each() to iterate over the collection 
    $.each(shopping, function (count, item) {
        textToInsert += "<li  class=\"ui-state-default\">" + item + "</li>";
    });
    // add the string with all the items to the list
    $("#sortable").append(textToInsert); 

    $("#btnClear").click(function (event) {
        // clear localStorage so we can start fresh
        event.preventDefault();
        localStorage.removeItem("shoppingText");
        $(this).attr("Disabled", "Disabled");
    });
	$("#add").on('click', function () {
            var popup_id = $('#' + $(this).attr("rel"));
            console.log(popup_id);
			var newListItem = $('#inp').val();

        if(newListItem.length>0) {

            var textToInsert = "<li class=\"ui-state-default\">" + newListItem + "</li>";

            $("#sortable").append(textToInsert);

            // put items in sortable into an array
            var theArray = [];
            $("li", "#sortable").each(function (count, item) {
                theArray[count] = $(this).text();
            });
            var shoppingText = theArray.toString();
            localStorage.setItem("shoppingText", shoppingText);

            $('#inp').val('');

        }
	});

    function save1() {
        // put items in sortable into an array
        var theArray = [];
        $("li", "#sortable").each(function (count, item) {
            theArray[count] = $(this).text();
        });
        var shoppingText = theArray.toString();
        localStorage.setItem("shoppingText", shoppingText);
        $("#btnClear").removeAttr("Disabled");
        //console.log(localStorage.shoppingText);        
    }
});