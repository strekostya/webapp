window.onLoad = init();

function init ()
{
	ReadyState = 4;
	ReadyStatus = 200;
	initLocalData();
	UrlRegex = initRegex();
	document.querySelector("#save-form").addEventListener("click", function (e) {
		saveInput();
		document.querySelector(".form").action = document.querySelector(".active-tab-item .tab-link").hash;
	});

}

function initRegex()
{
	return new RegExp("https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}", "i");
}

function saveInput () {
	var currentLinklinks = [];
	var currentParams = []
	var currentTab = document.querySelector(".active-tab-item .tab-link").hash;
	var readInput = document.querySelectorAll(".form .readInputObject");
	
	for (var i = 0; i < readInput.length; i++) 
	{
		currentParams = [
			readInput[i].children[2].value,
			readInput[i].children[3].value
		];

		if (currentParams[1] != "" && currentParams[0] != "")
		{
			if (UrlRegex.test(currentParams[1])) 
			{
				links[i] = 
				{
					label : currentParams[0],
					url : currentParams[1]
				}
			}
		};
	};

	var data = localStorage.getItem("MyWebApp");
	data = JSON.parse(data);
	for (var i = 0; i < data.tabsList.length; i++) 
	{
		if (data.tabsList[i].hash == currentTab) 
		{
			for (var j = 0; j < links.length; j++) 
			{
				data.tabsList[i].links.push(links[j]);
				document.querySelector(currentTab + " .links").innerHTML += "<li class=\"link-item\"><a href=\"" 
				+ links[j].url + "\">" + links[j].label + "</a></li>";
			};
		}
	}
	localStorage.setItem("MyWebApp", JSON.stringify(data));
	mySetLinksList();
}

function initLocalData () 
{
	var tempData = localStorage.getItem("MyWebApp");

	if (tempData == null) 
	{
		var request = new XMLHttpRequest();
		request.open("GET", "./data/config.json", true);
		request.send();

		request.onreadystatechange = function ()
		{
			if (request.readyState == ReadyState && request.status == ReadyStatus) 
			{
				tempData = JSON.parse(request.responseText);

				localStorage.setItem("MyWebApp", JSON.stringify(tempData));
				setNote(tempData.notification);
				setInitialMenus(tempData.quickActions);
				initTabs(tempData.tabsList);
				initialTab();
				mySetLinksList();
			}
		};
	} 
	else 
	{
		tempData = JSON.parse(tempData);
		setNote(tempData.notification);
		setInitialMenus(tempData.quickActions);
		initTabs(tempData.tabsList);
		initialTab();
		mySetLinksList();
	}
}
function setNote (note) 
{
	document.querySelector(".notifications").innerHTML = note;
}


function initTabs (tabsList) 
{
	var tabs = document.querySelectorAll(".tab-link");
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].innerHTML = "<i class=\"" + tabsList[i].icon + "\"></i> " + tabsList[i].label;
	}
	var links;
	for (var i = 0; i < tabsList.length; i++) 
	{
		links = tabsList[i].links;
		for (var j = 0; j < links.length; j++) 
		{
			document.querySelector(tabsList[i].hash + " .links").innerHTML += "<li class=\"link-item\"><a href=\"" + links[j].url + "\">" + links[j].label + "</a></li>";
		}
	}
}


function setInitialMenus (quickActions) 
{
	var currSections = document.querySelectorAll(".nav-section");
	for (var i = 0; i < currSections.length; i++) 
	{
		currSections[i].innerHTML = "<p>" + quickActions[i].label + "</p>" + currSections[i].innerHTML;
		currSections[i].style.background = "black url(./img/icons/" + currSections[i].icon + ".png) center top 60px no-repeat";
	}

	var menus = document.querySelectorAll(".menu-caption");
	for (var i = 0; i < menus.length; i++) 
	{
		menus[i].innerHTML = "<p>" + quickActions[i].actionsLabel + "</p>";
	}

	var actionsLists = document.querySelectorAll(".action-list");
	for (var i = 0; i < actionsLists.length; i++) 
	{
		actions = quickActions[i].actions;
		for (var j = 0; j < actions.length; j++) {
			actionsLists[i].innerHTML += "<li class=\"action-list-item\"><a href=\"" + actions[j].url + "\">" + actions[j].label + "</a></li>"
		}
	}
}

function initialTab()
{
	var temp = document.querySelectorAll(".tab-link");
	//setActiveTab(window.location.hash || document.querySelector(".tab-link").hash);

	for (var i = 0; i < temp.length; i++) 
	{
		temp[i].addEventListener("click", function (e) 
		{
			/*
			setActiveTab(this.hash);
			mySetLinksList();
			setFrameLink();
			*/
		});
	}
}

function mySetLinksList () 
{
	/*
	var activeTab = document.querySelector(".active-tab-item .tab-link").hash;
	document.querySelector(".links-action-list").innerHTML = document.querySelector(activeTab + " .links").innerHTML;
	document.querySelector(".active-link").innerHTML = document.querySelector(".links-action-list .link-item").innerHTML;
	var links = all(".links-action-list .link-item");
	for (var i = 0; i < links.length; i++) 
	{
		links[i].addEventListener("click", function (e) 
		{
			document.querySelector(".active-link").innerHTML = this.innerHTML;
			setFrameLink();
		});
	}

	setFrameLink();
	if (activeTab == "#my-folders" || activeTab == "#my-team-folders") 
	{
		document.querySelector(".links-action-list").innerHTML = "";
	};
	*/
}