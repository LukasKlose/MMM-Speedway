var NodeHelper = require('node_helper');
const request = require('request');
const $ = require('cheerio');
module.exports = NodeHelper.create({
	
	start: function() {
        console.log("Starting module: " + "Speedway");
    },

    getEkstraliga: function(url) {
        console.log(url);
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {			
            if (!error && response.statusCode == 200) {
				result = this.formatResults(body);
                if (result.length > 0) {
                    this.sendSocketNotification('EKSTRALIGA_RESULTS', result);
                }
            }
        });
    },
	
	getPierwszaliga: function(url) {
	console.log(url);
	request({
		url: url,
		method: 'GET'
	}, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			result = this.formatResults(body);
			if (result.length > 0) {
				this.sendSocketNotification('PIERWSZALIGA_RESULTS', result);
			}
		}
	});
    },
	
	getDrugaliga: function(url) {
	console.log(url);
	request({
		url: url,
		method: 'GET'
	}, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			result = this.formatResults(body);
			if (result.length > 0) {
				this.sendSocketNotification('DRUGALIGA_RESULTS', result);
			}
		}
	});
    },
	
	formatResults: function(body){
		var result = "";
				
		var snippets = [];
		$('table > tbody > tr ', body).find('td').each(function (index, element) {
			snippets.push($(element).text());
		});
		
		result = "";
		
		result = result + "<table>"
		result = result + "<tr> <td></td> <td></td> <td>Sp</td><td>Bn</td><td>Pkt</td><td>Sg</td><td>Un</td><td>Nl</td><td>+/-</td>"
		for (i = 0; i < snippets.length; i = i+9) {
			if(snippets[i+1].includes("Zielona Góra")) snippets[i+1] = "Zielona Góra";
			if(snippets[i+1].includes("Leszno")) snippets[i+1] = "Leszno";
			if(snippets[i+1].includes("Wrocław")) snippets[i+1] = "Wrocław";
			if(snippets[i+1].includes("Częstochowa")) snippets[i+1] = "Częstochowa";
			if(snippets[i+1].includes("Grudziądz")) snippets[i+1] = "Grudziądz";
			if(snippets[i+1].includes("Lublin")) snippets[i+1] = "Lublin";
			if(snippets[i+1].includes("Gorzów")) snippets[i+1] = "Gorzów";
			if(snippets[i+1].includes("Toruń")) snippets[i+1] = "Toruń";
			if(snippets[i+1].includes("Rybnik")) snippets[i+1] = "Rybnik";
            if(snippets[i+1].includes("Ostrów")) snippets[i+1] = "Ostrów";
			if(snippets[i+1].includes("Ostrovia")) snippets[i+1] = "Ostrów";
			if(snippets[i+1].includes("Gniezno")) snippets[i+1] = "Gniezno";
			if(snippets[i+1].includes("Tarnów")) snippets[i+1] = "Tarnów";
			if(snippets[i+1].includes("Gdańsk")) snippets[i+1] = "Gdańsk";
			if(snippets[i+1].includes("Daugavpils")) snippets[i+1] = "Daugavpils";
			if(snippets[i+1].includes("Łódź")) snippets[i+1] = "Łódź";
			if(snippets[i+1].includes("Bydgoszcz")) snippets[i+1] = "Bydgoszcz";
			if(snippets[i+1].includes("Poznań")) snippets[i+1] = "Poznań";
			if(snippets[i+1].includes("Opole")) snippets[i+1] = "Opole";
			if(snippets[i+1].includes("Krosno")) snippets[i+1] = "Krosno";
			if(snippets[i+1].includes("Piła")) snippets[i+1] = "Piła";
			if(snippets[i+1].includes("Rawicz")) snippets[i+1] = "Rawicz";
			if(snippets[i+1].includes("Kraków")) snippets[i+1] = "Kraków";
            if(snippets[i+1].includes("Rzeszów")) snippets[i+1] = "Rzeszów";
            if(snippets[i+1].includes("Wittstock")) snippets[i+1] = "Wittstock";
			
			
			result = result + "<tr>" + "<td>" + snippets[i] + "</td>"
			+ "<td> " + snippets[i+1] + "</td>" 
			+ "<td> " + snippets[i+2] + "</td>" 
			+ "<td> " + snippets[i+3] + "</td>" 
			+ "<td> " + snippets[i+4] + "</td>" 
			+ "<td> " + snippets[i+5] + "</td>" 
			+ "<td> " + snippets[i+6] + "</td>" 
			+ "<td> " + snippets[i+7] + "</td>" 
			+ "<td> " + snippets[i+8] + "</td>" 
			+ "</tr>";
		}
		result = result + "</table>"
		
		return result;
	},

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_EKSTRALIGA') {
            this.getEkstraliga(payload);
        }
		if (notification === 'GET_PIERWSZALIGA') {
            this.getPierwszaliga(payload);
        }
		if (notification === 'GET_DRUGALIGA') {
            this.getDrugaliga(payload);
        }
    }
});