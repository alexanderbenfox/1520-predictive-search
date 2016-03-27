// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

var saved_search = "";
var saved_hover;

(function() {
	// Magic!
	var typeahead = document.getElementById("search");
	typeahead.addEventListener("input", function(){retrieve()});
	console.log('Keepin\'n it clean with an external script!');
})();


function retrieve()
{
	var interests_data = $.ajax({
		type: 'GET',
        url: 'http://www.mattbowytz.com/simple_api.json?data=interests',
        async: false,
        data: '{}',
        dataType: 'json'
    }).responseText;
    var programming_data = $.ajax({
		type: 'GET',
        url: 'http://www.mattbowytz.com/simple_api.json?data=programming',
        async: false,
        data: '{}',
        dataType: 'json'
    }).responseText;
    var all_data = $.ajax({
		type: 'GET',
        url: 'http://www.mattbowytz.com/simple_api.json?data=all',
        async: false,
        data: '{}',
        dataType: 'json'
    }).responseText;

    console.log(interests_data);

    interests_data = JSON.parse(interests_data)["data"];
    programming_data = JSON.parse(programming_data)["data"];
    all_data = JSON.parse(all_data)["data"];

    var search_data;

    if(document.getElementById('interests').checked && document.getElementById('programming').checked)
    	search_data = interests_data.concat(programming_data);//search_data = all_data;
    else if(document.getElementById('interests').checked)
    	search_data = interests_data;
    else if(document.getElementById('programming').checked)
    	search_data = programming_data;
    else interests_data.concat(programming_data);//search_data = all_data;

    $("#search-list").empty();

    build_search_list(search_data);

	var numitems =  $("#search-list li").length;
	if(numitems < 1)
		{
			saved_search = "";
			saved_hover = "";
		}
}

function build_search_list(data)
{
	for (i = 0; i < data.length; i++)
	{
		lower_case_search = document.getElementById("search").value.toLowerCase();
		lower_case_data = data[i].toLowerCase();
		if (lower_case_data.includes(lower_case_search) && lower_case_search != "")
		{
			var search_term = data[i].split(" ");
			if (search_term.length > 1)
				search_term = search_term[0] + "+" + search_term[1];
			$("#search-list").append("<a onmouseleave = "+'"'+ "exit_hover();" + '"'+ " " + "onmouseenter=" + '"' + "hover_function("+"'"+data[i]+"'"+");" + '"' + " href='https://www.google.com/search?q="+search_term+"'>"+data[i]+"</a>");
			$("#search-list").append("<br/>");
		}
	}
}

function hover_function(word)
{
	if (saved_search == "")
		saved_search = document.getElementById("search").value;
	document.getElementById("search").value = word;
	saved_hover = word;
}

function exit_hover()
{
	console.log(saved_hover);
	if (saved_hover == document.getElementById("search").value)
		document.getElementById("search").value = saved_search;

	saved_search = "";
}

function get_search()
{
	console.log("it got here tho");
	var value = document.getElementById("search").value;
	window.location.href = "http://www.google.com/search?q="+value;
}