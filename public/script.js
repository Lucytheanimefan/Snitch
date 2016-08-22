//get session id
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var stringLength = 5;
    var sessionID = Array.apply(null, new Array(stringLength)).map(function() {
        return possible[Math.floor(Math.random() * possible.length)];
    }).join('');

    var die_data = "";

    if (count==0){
        die_data = html_name+","+sessionID+","+pageopened+",1,"+count.toString();
        recordIPAddressData();
    }

    function throwdice() {
        var randomdice;
        var currentTime = timestamp();
        //create a random integer between 0 and 5
        count++:
        if (count < 11) {
            randomdice = nums[count];
        } else {
            randomdice = nums[count % 10];
        }

        /*
        timeTracking[timestamp()] = {
            "Count": count,
            "die number": randomdice
        };
        */
        
        die_data = html_name+","+sessionID+","+currentTime+","+randomdice.toString()+","+count.toString();
        count++;
        recordIPAddressData();

        document.images["mydice"].src = "images/animated-dice-image.gif";
        document.images["mydice"].style.height = '50px';
        document.images["mydice"].style.width = '50px';

        setTimeout(function() {
            document.images["mydice"].src = "images/die_" + randomdice.toString() + ".png";
        }, 1000);

    }

    function timestamp() {
        var d = new Date();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
        var day = days[d.getDay()];
        var hr = d.getHours();
        var min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        var ampm = hr < 12 ? "am" : "pm";
        var date = d.getDate();
        var month = months[d.getMonth()];
        var year = d.getFullYear();
        var seconds = d.getSeconds();
        var timestamp = day + " " + hr + ":" + min + ":" + seconds + ampm + " " + date + " " + month + " " + year;
        return timestamp;
    }

    function recordIPAddressData() {
        $.getJSON('https://api.ipify.org?format=json', function(data) {

            /*
            var jsonData = JSON.stringify({
                data,
                timeTracking
            });
            */

            //localStorage.setItem(jsonData);
            die_data=data["ip"] + ","+die_data;
            sendDataToBackend(die_data);
            //console.log(data["ip"]);
        });

    }


    function printLocalStorage() {
        for (var key in localStorage) {
            console.log(key + ":" + localStorage[key]);
        }
    }

    function clearLocalStorage() {
        localStorage.clear();
    }

    function sendDataToBackend(jsonData) {
        console.log(jsonData);
        $.ajax({
            type: 'GET', // added,
            url: '/sendDataToBackend',
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            //jsonpCallback: 'callback' - removed
            success: function(data) {
                console.log("success on client side");
            }
        });

    }