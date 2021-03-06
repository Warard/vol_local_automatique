// Api request variable
var xhttp = new XMLHttpRequest();
var JSON_data = null;
 
// Actions on receinving DATA from the API
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    // Stock the JSON table received
    JSON_data = xhttp.responseText;
    console.log(JSON_data);    

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

    function write_html(tag, content, method='id') {
        if(method == 'id') {
            document.getElementById(tag).innerHTML = content;
        }

        if(method == 'class') {
            document.getElementsByClassName(tag).innerHTML = content;
        }
    }

    write_html('wind_direction', read_data().wind.degrees, 'id');
    write_html('wind_speed', read_data().wind.speed_kts, 'id');




  }
};

xhttp.open("GET", "https://api.checkwx.com/metar/LFPG/decoded?pretty=1", true);
xhttp.setRequestHeader('X-API-Key', 'c4bb76ba2c634e678989a5d2a3');

xhttp.send();


