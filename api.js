/*
Main fonction from the script, executed when "rechercher" button is clicked.
ARG : none.
RETURN : all the hidden web page (id weather)
*/

function generate_flight() {
    var station = document.getElementById("arpt_choice").value
    if(station.length == 4) {
        console.log('Requête acceptée');
    } else {
        alert('Le code de l\'aéroport doit contenir 4 lettres/chiffres');
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
            // Display 
            document.getElementById('weather').style.display = 'block';
            
            // Weather fronts image 
            d = new Date();
            year = String(d.getFullYear());
            month = String("0" + (d.getMonth() + 1));
            day = String(d.getDate());
            hour = String(d.getHours());
            
            url_hour = 00;
            if(hour >= 6 && hour < 12) {
                url_hour = "06"
            } else if(hour >=12 && hour < 00) {
                url_hour = "12"
            } else {
                url_hour = "00"
            }

            // console.log(String(year));
            // console.log(String(month));
            // console.log(String(day));
            // console.log(String(hour));

            var url_date = String(year + month + day + url_hour +"0000");

            // 2021 02 27 00 00 00
            var front_url = "type=front/europeouest&date=" + url_date + "&mode=img"
            document.getElementById('weather_front').src += front_url

            var temsi_url = "type=sigwx/fr/france&date=" + url_date + "&mode=img";
            document.getElementById('temsi').src += temsi_url
            document.getElementById('weather_map_date').innerHTML = String("Cartes du " + day + "/" + month + "/" + year + "/" + url_hour + "h")

            var wintem_url = "type=wintemp/fr/france/fl020&date=" + url_date + "&mode=img"
            document.getElementById('wintem').src += wintem_url

            // Station name
            try{ write_html('station_OACI', read_data().icao); } finally{ console.log('Error while writing HTML') } 
            try{ write_html('station_name', read_data().station.name); } finally{ console.log('Error while writing HTML') }

            // metar
            try{ write_html('metar', read_data().raw_text); } finally{ console.log('Error while writing HTML') }

            // wind
            try{ write_html('wind_direction', read_data().wind.degrees + '° /'); } finally{ console.log('Error while writing HTML') }
            try{ write_html('wind_speed', read_data().wind.speed_kts + 'kts'); } finally{ console.log('Error while writing HTML') }

            // clouds
            try{ write_html('clouds', read_data().clouds[0].code); } finally{ console.log('Error while writing HTML') }
            try{ write_html('clouds_translated', read_data().clouds[0].text); } finally{ console.log('Error while writing HTML') }

            // temperatures
            try{ write_html('temp', read_data().temperature.celsius + "°C", method="id", add="true"); } finally{ console.log('Error while writing HTML') }
            try{ write_html('dew', read_data().dewpoint.celsius + "°C", method="id", add=true); } finally{ console.log('Error while writing HTML') }

            // atmospheric pressure
            try{ write_html('pressure', read_data().barometer.hpa + " hpa"); } finally{ console.log('Error while writing HTML') }
        }
    };

    // API request parameters
    var link = "https://api.checkwx.com/metar/" + station + "/decoded?pretty=1";
    const key = "c4bb76ba2c634e678989a5d2a3";

    // API request
    xhttp.open("GET", link, true);
    xhttp.setRequestHeader('X-API-Key', key);
    
    xhttp.send();
}






