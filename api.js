function generate_flight() {
    var data = document.getElementById("arpt_choice").value
    if(data.length == 4) {
        console.log('ok')
    } else {
        alert('Le code de l\'aéroport doit contenir 4 lettres/chiffres');
    }
}



/*-----API-----*/


// Api request variable
var xhttp = new XMLHttpRequest();
var JSON_data = null;
 
// Actions on receinving DATA from the API
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    // Stock the JSON table received
    JSON_data = xhttp.responseText;
        // console.log(JSON_data);    

    function read_data(json_file=JSON_data, path_to_data="data") {
    /* 
    Read data from a JSON table and return an Array with the wished data in the JSON table
    ARGUMENTS : 
        json_file : variable containing the JSON table
    RETURN : 
        data : Array with the requested data  
    */
        var JS_data = JSON.parse(json_file);
        data = JS_data[String(path_to_data)];
        // console.log(data[0])
        return data[0]
    }

    function write_html(tag, content, method='id', add=false) {
    /* 
    Write a content in api.html by getting it's tag (id, or class)
    ARGUMENTS : 
        tag : name or the tag or the class used to localize the HTML element
        content : content to add in the html object
        method : Choose if the html element should be localised by getting its class name or its id name
        add : Shloud content be added to the previous html content, or replace it ? add=false will replace the content, else it will be add to the previous html content
    RETURN : 
        content : content which should be written in the html element get by the previous tag and method  
    */
        if(method == 'id') {
            if(add) {
                document.getElementById(tag).innerHTML += content;
            } else {
                document.getElementById(tag).innerHTML = content;
            }
        }

        if(method == 'class') {
            if(add) {
                document.getElementsByClassName(tag).innerHTML += content;
            } else {
                document.getElementsByClassName(tag).innerHTML = content;
            }        
        }
    }

    /* -----HTML WRITTING----- */
    
    // Station name
    write_html('station_OACI', read_data().icao);
    write_html('station_name', read_data().station.name);

    // metar
    write_html('metar', read_data().raw_text);

    // wind
    write_html('wind_direction', read_data().wind.degrees + '° /');
    write_html('wind_speed', read_data().wind.speed_kts + 'kts');

    // clouds
    write_html('clouds', read_data().clouds[0].code);
    write_html('clouds_translated', read_data().clouds[0].text);

    // temperatures
    write_html('temp', read_data().temperature.celsius + "°C", method="id", add="true");
    write_html('dew', read_data().dewpoint.celsius + "°C", method="id", add=true);

    // atmospheric pressure
    write_html('pressure', read_data().barometer.hpa + " hpa");
  }
};



xhttp.open("GET", "https://api.checkwx.com/metar/OMDB/decoded?pretty=1", true);
xhttp.setRequestHeader('X-API-Key', 'c4bb76ba2c634e678989a5d2a3');

xhttp.send();


