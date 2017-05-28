// Data for bio
var bio = {
	name: "Tetsuya Hasegawa  ",
	role: "Earth Media Designer",
	contacts: {
		mobile: "090-4754-0851",
		email: "hasegawa@elp.or.jp",
		github: "Tetsuya3850",
		location: "Tokyo",
	},
	welcomeMessage: "Hi, welcome to my resume!",
	skills: ["JavaScript", "Digital Earth", "EdTech", "Philosophy", "Japanese"],
	biopic: "img/me.jpeg"
};


// Data for work
var work = {
	jobs: [{
			employer: "Earth Literacy Program",
			title: "Developer",
			location: "Tokyo",
			dates: "2014-2019",
			description: "Programming the world’s first interactive digital globe that dynamically represents various aspects of the earth. It is a powerful tool for researchers, educators, policy makers and the general public to illustrate present conditions of the earth, and to promote a deeper understanding of global challenges in a planetary context.",
			url: "http://earth-museum.jp/"
		},
		{
			employer: "The University of Tokyo",
			title: "Tutor",
			location: "Tokyo",
			dates: "2014-2016",
			description: "GO Tutors are Japanese or international students at the University of Tokyo with superior academic abilities and English skills. GO Tutors assist internaitonal students coming to the University of Tokyo with their studies and helping them adjust to their new environment. Tutoring sessions take place in the GO Lounge.",
			url: "http://www.globalkomaba.c.u-tokyo.ac.jp/en/inbound/support/tutoring/go_tutor/"
		}
	]
};

// Data for projects
var projects = {
	projects: [{
			title: "Earth Solutions Panel",
			dates: "2015",
			description: "A table top interface which you could interact with your hands to search through various good practices that creates planetary value. There are 4 generes: Forest, Water, Food, Disasters.",
			images: ["img/earthsolution1.jpg", "img/earthsolution2.jpg"],
			url: "http://earth-museum.jp/event/in_eco_pro/"
		},
		{
			title: "GAR for Tangible Earth(GfT)",
			dates: "2015",
			description: "A fully interactive stand-alone free Earth science application for learning about the past several decades in the life of our planet, and the role of the UNISDR. Added features include and ever-increasing body of data about good practices for preparing for and ameliorating disasters when they arise, and real-time disaster alerts.",
			images: ["img/GfT1.png", "img/GfT2.PNG"],
			url: "http://www.preventionweb.net/english/hyogo/gar/2015/en/home/gft.html"
		}
	]
};

// Data for education (schools and onlineCourses)
var education = {
	schools: [{
			name: "The University of Tokyo",
			location: "Tokyo",
			degree: "BA",
			majors: ["Analytic Philosophy"],
			dates: "2013-2017",
			url: "http://fusehime.c.u-tokyo.ac.jp/senior/gendai-shiso/"
		},
		{
			name: "The University of Tokyo",
			location: "Tokyo",
			degree: "MA",
			majors: ["EdTech"],
			dates: "2017-2019",
			url: "http://www.iii.u-tokyo.ac.jp/education/courses/culturalhuman"
		}
	],
	onlineCourses: [{
		title: "Front-End Web Developer",
		school: "Udacity",
		dates: "2017",
		url: "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001",
		home: "https://www.udacity.com/"
	}]
};


// Display bio. Replace data from helper.js and append them.
bio.display = function() {
	var formattedName = HTMLheaderName.replace("%data%", bio.name);
	var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
	var formattedImage = HTMLbioPic.replace("%data%", bio.biopic);
	var formattedMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
	var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	var formattedGitHub = HTMLgithub.replace("%data%", bio.contacts.github);
	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

	$("#header").prepend(formattedRole).prepend(formattedName).append(formattedImage, formattedMessage);
	$("#topContacts, #footerContacts").append(formattedMobile, formattedEmail, formattedGitHub, formattedLocation);
	$("#header").append(HTMLskillsStart);

	bio.skills.forEach(function(skill) {
		var formattedSkills = HTMLskills.replace("%data%", skill);
		$("#skills").append(formattedSkills);
	});
};

// Display job. Quite same as above. Mainly utilizing forEach in order to display multiple jobs.
work.display = function() {

	work.jobs.forEach(function(job) {
		$("#workExperience").append(HTMLworkStart);

		var formattedworkEmployer = HTMLworkEmployer.replace("%data%", job.employer).replace("#", job.url);
		var formattedworkTitle = HTMLworkTitle.replace("%data%", job.title);
		var formattedworkDates = HTMLworkDates.replace("%data%", job.dates);
		var formattedworkLocation = HTMLworkLocation.replace("%data%", job.location);
		var formattedworkDescription = HTMLworkDescription.replace("%data%", job.description);
		$(".work-entry:last").append(formattedworkEmployer + formattedworkTitle, formattedworkDates, formattedworkLocation, formattedworkDescription);
	});
};


//Display projects.
projects.display = function() {
	projects.projects.forEach(function(project) {
		$("#projects").append(HTMLprojectStart);

		var formattedprojectTitle = HTMLprojectTitle.replace("%data%", project.title).replace("#", project.url);
		var formattedprojectDates = HTMLprojectDates.replace("%data%", project.dates);
		var formattedprojectDescription = HTMLprojectDescription.replace("%data%", project.description);
		$(".project-entry:last").append(formattedprojectTitle, formattedprojectDates, formattedprojectDescription);
		project.images.forEach(function(image) {
			var formattedImage = HTMLprojectImage.replace("%data%", image);
			$(".project-entry:last").append(formattedImage);
		});
	});
};


// Display education.
education.display = function() {
	education.schools.forEach(function(school) {
		$("#education").append(HTMLschoolStart);

		var formattedschoolName = HTMLschoolName.replace("%data%", school.name).replace("#", school.url);
		var formattedschoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
		var formattedschoolDates = HTMLschoolDates.replace("%data%", school.dates);
		var formattedschoolLocation = HTMLschoolLocation.replace("%data%", school.location);


		$(".education-entry:last").append(formattedschoolName + formattedschoolDegree, formattedschoolDates, formattedschoolLocation);

		school.majors.forEach(function(major) {
			var formattedschoolMajor = HTMLschoolMajor.replace("%data%", major);
			$(".education-entry:last").append(formattedschoolMajor);
		});
	});

	education.onlineCourses.forEach(function(onlinecourse) {
		$(".education-entry:last").append(HTMLonlineClasses);

		var formattedonlineTitle = HTMLonlineTitle.replace("%data%", onlinecourse.title).replace("#", onlinecourse.url);
		var formattedonlineSchool = HTMLonlineSchool.replace("%data%", onlinecourse.school);
		var formattedonlineDates = HTMLonlineDates.replace("%data%", onlinecourse.dates);
		var formattedonlineUrl = HTMLonlineURL.replace("%data%", onlinecourse.home).replace("#", onlinecourse.home);
		$(".education-entry:last").append(formattedonlineTitle + formattedonlineSchool, formattedonlineDates, formattedonlineUrl);
	});
};

/*
function inName(name){
    console.log(name);
    var newName = name;
    newName = newName[0].toUpperCase() + newName.slice(1,newName.indexOf(" ") + 1).toLowerCase() + newName.slice(newName.indexOf(" ") + 1).toUpperCase();

    return newName;
};
*/

// Execute All
bio.display();
work.display();
projects.display();
education.display();


// Add GoogleMap

var map;

function initializeMap() {

	var locations;

	var mapOptions = {
		disableDefaultUI: true
	};

	map = new google.maps.Map(document.querySelector('#map'), mapOptions);


	function locationFinder() {

		var locations = ["Chicago"];

		locations.push("bio.contacts.location");

		work.jobs.forEach(function(job) {
			locations.push(job.location);
		});

		education.schools.forEach(function(school) {
			locations.push(school.location);
		});

		return locations;
	}

	function createMapMarker(placeData) {
		var lat = placeData.geometry.location.lat();
		var lon = placeData.geometry.location.lng();
		var name = placeData.formatted_address;
		var bounds = window.mapBounds;

		var marker = new google.maps.Marker({
			map: map,
			position: placeData.geometry.location,
			title: name
		});

		var infoWindow = new google.maps.InfoWindow({
			content: name
		});

		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.open(map, marker);
		});


		bounds.extend(new google.maps.LatLng(lat, lon));
		map.fitBounds(bounds);
		map.setCenter(bounds.getCenter());
	}

	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMapMarker(results[0]);
		}
	}

	function pinPoster(locations) {
		var service = new google.maps.places.PlacesService(map);
		locations.forEach(function(place) {
			var request = {
				query: place
			};
			service.textSearch(request, callback);
		});
	}

	window.mapBounds = new google.maps.LatLngBounds();

	locations = locationFinder();

	pinPoster(locations);

}

window.addEventListener('load', initializeMap);

window.addEventListener('resize', function(e) {
	map.fitBounds(mapBounds);
});

$("#mapDiv").append(googleMap);

/* $("#main").append(internationalizeButton); */
