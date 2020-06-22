var searchData = {};

document.querySelector("#search-btn").addEventListener("click", function () {
	// get fields input data and save them to object
	searchData.city = document.querySelector("#city").value;
	searchData.state = document.querySelector("#state").value;
	searchData.country = document.querySelector("#country").value;
});
var iqair = {
	name: "iqair.com",
	url: "https://api.airvisual.com/v2",
	key: "edc2772e-2265-4a2f-a329-b99922199cd6",
};

var aqi = {
	name: "aqicn.org",
	url: "https://api.waqi.info/feed/",
	key: "8d06a01f6a4d9bcd42ea4bc38433cd2c09da0803",
};

document.querySelector("#search-btn").addEventListener("click", function () {
	// call api

	var city = searchData.city;
	var state = searchData.state;
	var country = searchData.country;

	async function getData(source) {
		if (source === "iqair") {
			await fetch(
				iqair["url"] +
					"/city?city=" +
					city +
					"&state=" +
					state +
					"&country=" +
					country +
					"&key=" +
					iqair["key"]
			)
				.then((res) => res.json())
				.then((data) => {
					iqair.pollution = data.data.current.pollution;
				})
				.catch((err) => {
					console.log("Fetch Error", err);
				});
			document.querySelector("#iqair").innerHTML =
				city + "'s" + " AQI from iqair.com is: " + iqair.pollution.aqius;
		} else if (source === "aqi") {
			await fetch(aqi.url + city + "/?token=" + aqi.key)
				.then((res) => res.json())
				.then((data) => {
					aqi.pollution = data.data;
				})
				.catch((err) => {
					console.log("Fetch Error", err);
				});
			document.querySelector("#aqicn").innerHTML =
				city + "'s" + " AQI from aqicn.org is: " + aqi.pollution.aqi;
		}
		//console.log(getAverageAQI(iqair.pollution.aqius, aqi.pollution.aqi));
		document.querySelector("#average").innerHTML =
			"Average AQI is: " + (aqi.pollution.aqi + iqair.pollution.aqius) / 2;
	}

	getData("iqair");
	getData("aqi");
});

/*function getAverageAQI(aqi1, aqi2) {
	var average = (aqi1 + aqi2) / 2;
	return average;
}*/
