"use strict";

var URL = "http://localhost:3000/courses/";

//////////////////////////////////////////////////////////
// Wait for DOM Content loaded
//////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function(){ 
    var xmlhttp = new XMLHttpRequest();

    //////////////////////////////////////////////////////////
    // Get all users from web service
    //////////////////////////////////////////////////////////
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
                let jsonData = JSON.parse( xmlhttp.responseText );
                let str = ""; 
                for(var i=0; i < jsonData.length; i++){
                    str += "<tr id='" + jsonData[i]._id + "'><td>" + jsonData[i].courseId + "</td><td>" + jsonData[i].courseName + "</td><td>" + jsonData[i].coursePeriod + "</td><td class='btn' id='" + jsonData[i]._id + "'>Radera</td></tr>";
                        
                }
                document.getElementById("main").innerHTML = str;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           } else {
              alert('something else other than 200 was returned');
           }
        }
    };
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();

  //////////////////////////////////////////////////////////
    // Create new course
    //////////////////////////////////////////////////////////



    document.getElementById("create").addEventListener("click", function(){ 
        var xmlhttp = new XMLHttpRequest();

       
        //
        // REST web service - POST
        var obj = {};
	    obj.courseId = document.getElementById("courseId").value;
        obj.courseName = document.getElementById("courseName").value;
        obj.coursePeriod = document.getElementById("coursePeriod").value;
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                if (xmlhttp.status == 200) {
                    var jsonData = JSON.parse( xmlhttp.responseText );
                    document.getElementById("main").innerHTML += "<tr><td>" + jsonData.courseId + "</td><td>" + jsonData.courseName + "</td><td>" + jsonData.coursePeriod + "</td><td class='btn' id='" + jsonData._id + "'>Radera</td></tr>";                       
                    location.reload();      
                }
                else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                }
                else {
                    alert('something else other than 200 was returned');
                }

            }
        };

        xmlhttp.open("POST", URL, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(obj));
    }); 

    //////////////////////////////////////////////////////////
    // Delete course
    //////////////////////////////////////////////////////////
    document.getElementById("main").addEventListener('click', function(e) {
        if (event.target.id) { // Check if button is clicked
    
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                    if (xmlhttp.status == 200) {
                        var jsonData = JSON.parse( xmlhttp.responseText );
                        location.reload();
                    }
                    else if (xmlhttp.status == 400) {
                        alert('There was an error 400');
                    }
                    else {
                        alert('something else other than 200 was returned');
                    }
                }
            };

            xmlhttp.open("DELETE", URL + event.target.id, true);
            xmlhttp.send();
        
        }
    
	});

}); 