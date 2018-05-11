    function get_todos() {
        var todos = new Array;
        var todos_str = localStorage.getItem('todo');
        if (todos_str !== null) {
            todos = JSON.parse(todos_str); 
        }
        return todos;
    }
     
    function add() {
        var task = document.getElementById('task').value;
        var todos = get_todos();
        todos.push(task);
        localStorage.setItem('todo', JSON.stringify(todos));
        document.getElementById('task').value = '';
        show();
        
        return false;
    }
     
    function remove() {
        navigator.vibrate(500);
        if (confirm("¿Desea eliminar la tarea?")){
            var id = this.getAttribute('id');
            var todos = get_todos();
            todos.splice(id, 1);
            localStorage.setItem('todo', JSON.stringify(todos));
        }
        navigator.vibrate(0);
     
        show();
     

        return false;
    }
     
    function show() {
        var todos = get_todos();
     
        var html = '<ul class="list-group">';
        for(var i=0; i<todos.length; i++) {
            html += '<li class="list-group-item">' + todos[i] +' ' + '<button class="remove btn btn-danger btn-sm" id="' + i  + '">Eliminar</button></li>';
        };
        html += '</ul>';
        
        document.getElementById('todos').innerHTML = html;
     
        var buttons = document.getElementsByClassName('remove');
        for (var i=0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', remove);
        };
    }

    //var x = document.getElementById("demo");

    var geocoder;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
      }
      //Get the latitude and the longitude;
      function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng)
      }
      
      function errorFunction(){
        alert("Geocoder failed");
      }
      
      function initialize() {
        geocoder = new google.maps.Geocoder();
      
      
      
      }
      
      function codeLatLng(lat, lng) {
      
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
          console.log(results)
            if (results[1]) {
             //formatted address
             //alert(results[0].formatted_address)
             document.getElementById('mapholder').innerHTML = results[0].formatted_address
            //find country name
                 for (var i=0; i<results[0].address_components.length; i++) {
                for (var b=0;b<results[0].address_components[i].types.length;b++) {
      
                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                    if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                        //this is the object you are looking for
                        city= results[0].address_components[i];
                        break;
                    }
                }
            }
            //city data
            //alert(city.short_name + " " + city.long_name)
            //document.getElementById('mapholder').innerHTML = city.short_name + " " + city.long_name;
      
            } else {
              alert("No results found");
            }
          } else {
            alert("Geocoder failed due to: " + status);
          }
        });
      }


     
    document.getElementById('add').addEventListener('click', add);
    show();
    initialize();
    