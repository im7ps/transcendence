// STATISTICS

import Model from "./model.js";
const TABLE_ELEMENTS = 4;
let INSIGHT_ELEMENTS;
// const INSIGHTS_COL_NAMES = {"p1_hp_win":"HP", "":"",}

export var currentStatisticsIndex = 0

export function increaseCurrStatIndex() {
	currentStatisticsIndex++
	if (currentStatisticsIndex > 3)
		currentStatisticsIndex = 0
}

function getDescription(name) {
    const descriptions = {
        "p1_hp_win": "HP P1",
        "p1_hit_taken": "TANKED P1",
        "p1_box_hit": "BOX HIT P1",
        "p1_box_destroyed": "BOX RIP P1",
        "p1_accuracy": "ACCURACY P1",
        "p1_bullet_total": "SHOTS P1",
        "p2_hp_win": "HP P2",
        "p2_hit_taken": "TANKED P2",
        "p2_box_hit": "BOX HIT P2",
        "p2_box_destroyed": "BOX RIP P2",
        "p2_accuracy": "ACCURACY P2",
        "p2_bullet_total": "SHOTS P2",
	
		"p1_gol": "GOALS",
        "p1_gol_taken": "GOALS TAKEN",
        "p1_paddle_hit": "PADDLE HIT",
        "p1_wall_hit": "WALL HIT",
        "p2_gol": "GOALS",
        "p2_gol_taken": "GOALS TAKEN",
        "p2_paddle_hit": "PADDLE HIT",
        "p2_wall_hit": "WALL HIT"
    };

    return descriptions[name] || "Unknown attribute";
}

function show_graph(stats)
{

	document.getElementById("graph").style.display = "flex";
	document.getElementById("stat_canvas").style.display = "flex";
	const canvas = document.getElementById('stat_canvas');
	const ctx = canvas.getContext('2d');


	function setCanvasResolution() {
		const dpr = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		ctx.scale(dpr, dpr);
	}

	setCanvasResolution();

	let data = [];
	let labels = [];
	if (stats[0].name == "bong")
	{
		data = [window.AppData.user.user.pongWins] //MANCANO STATISTICHE PONG
		labels = ["Wins", "Distance", "Bounces"]
	}
	else
	{
		data = [window.AppData.user.user.spaceInvadersWins, stats[5].value, stats[4].value]
		labels = ["Wins", "Accuracy", "Box destroyed"]
	}


	const chartWidth = canvas.width / (window.devicePixelRatio || 1) - 60;
	const chartHeight = canvas.height / (window.devicePixelRatio || 1) - 60;
	const barWidth = chartWidth / data.length;
	const maxDataValue = 10;
	const scaleFactor = chartHeight / maxDataValue;


	ctx.beginPath();
	ctx.moveTo(30, 10);
	ctx.lineTo(30, chartHeight + 10);
	ctx.lineTo(chartWidth + 30, chartHeight + 10);
	ctx.stroke();


	data.forEach((value, index) => {
		const barHeight = value * scaleFactor;
		const x = 30 + index * barWidth;
		const y = chartHeight + 10 - barHeight;


		ctx.fillStyle = 'rgba(75, 192, 192, 0.2)';
		ctx.fillRect(x, y, barWidth - 5, barHeight);


		ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
		ctx.strokeRect(x, y, barWidth - 5, barHeight);


		ctx.fillStyle = '#000';
		ctx.textAlign = 'center';
		ctx.fillText(labels[index], x + (barWidth / 2) - 2.5, chartHeight + 25);
	});


	for (let i = 0; i <= maxDataValue; i += Math.ceil(maxDataValue / 10)) {
		const y = chartHeight + 10 - (i * scaleFactor);
		ctx.fillStyle = '#000';
		ctx.textAlign = 'right';
		ctx.fillText(i, 25, y + 5);
	}
}

function expandBar(bar, finalHeight, index) {
	let height = 0;
	let value = 0;
	let bar_value = 0;
	bar.element.innerText = 0;

	if (index == 0)
	{
		if (window.AppData.user.user.friends.length >= 2)
		{
			if (stats[0].name == "bong")
				value = window.AppData.user.user.friends.length[1].pongWins;
			else
				value = window.AppData.user.user.friends.length[1].spaceInvadersWins;
				
		}
		else
			value = 0;
	}

	if (index == 1)
	{
		if (window.AppData.user.user.friends.length >= 1)
		{
			if (stats[0].name == "bong")
				value = window.AppData.user.user.friends.length[0].pongWins;
			else
				value = window.AppData.user.user.friends.length[0].spaceInvadersWins;
		}
		else
			value = 0;
	}

	if (index == 2)
	{
		if (stats[0].name == "bong")
			value = window.AppData.user.user.pongWins;
		else
			value = window.AppData.user.user.spaceInvadersWins;
	}

	const interval = setInterval(() => {
		if (height >= finalHeight)
		{
			clearInterval(interval);
		} 
		else
		{
			if (bar_value < value)
			{
				bar_value++;
				bar.element.textContent = bar_value;
			}
			height++;
			bar.element.style.height = height + '%';
		}
	}, 1);
}

function show_podium()
{
	const bars = [
        { element: document.getElementById('bar1'), value: 0 },
        { element: document.getElementById('bar3'), value: 0 },
        { element: document.getElementById('bar2'), value: 0 },
    ]
	
	let finalHeight = 10;
	bars.forEach((bar, index) => {
        setTimeout(() => {
			finalHeight += 20;
            expandBar(bar, finalHeight, index);
        }, index * 1000); // Stagger the start of each bar's animation
    });
}

function removeDynamicElements() {
    const dynamicElements = document.querySelectorAll('.dynamic-element');
    dynamicElements.forEach(element => {
        element.remove();
    });
}

function show_progress(stats)
{
	removeDynamicElements();

	if (stats[0] == "bong")
		INSIGHT_ELEMENTS = 8
	else
	{
		stats[11].value = Math.ceil(stats[1].value / stats[12].value); // accuracy p2 = hp p1 / bullet p2
		stats[5].value = Math.ceil(stats[7].value / stats[6].value); // accuracy p1 = hp p2 / bullet p1
		INSIGHT_ELEMENTS = 12
	}

	let i = 1
	while (i < INSIGHT_ELEMENTS)
	{
		if (stats[i].value > 10)
			stats[i].value = 10;

		const progressContainer = document.createElement("div");
		progressContainer.classList.add('progress-bar-container', 'dynamic-element');
		progressContainer.setAttribute("id", "progress-container");
		progressContainer.setAttribute("height", "70%", 'important');
	
		const progressBar = document.createElement("div");
		progressBar.classList.add('progress-bar');
		progressBar.setAttribute('role', 'progressbar');
		progressBar.setAttribute('aria-valuenow', stats[i].value * 10 + "%");
		progressBar.setAttribute('aria-valuemin', '0%');
		progressBar.setAttribute('aria-valuemax', '100%');
		progressBar.setAttribute('border-radius', '4px');
		progressBar.style.height = '100%';
	
		const statName = document.createElement("div");
		statName.classList.add('progress-bar-text', 'dynamic-element'); // Added 'dynamic-element' class
		statName.style.fontSize = "10px";
		statName.textContent = getDescription(stats[i].name);
		statName.style.width = '100%';
		statName.style.height = '10%';

		let it = 0;
		const maxProgress = stats[i].value * 10;
		
		function frame() {
			if (it >= maxProgress) {
				clearInterval(id);
			} else {
				it++;
				progressBar.style.setProperty('width', `${it}%`);
			}
		}
		
		const id = setInterval(frame, 1);

		progressContainer.appendChild(progressBar);
		Model.insights.insights.appendChild(statName);
		Model.insights.insights.appendChild(progressContainer);
		i++
	}
}

function show_insights(stats)
{
	show_progress(stats);
	show_graph(stats);
	show_podium();
}

function insights()
{
	Model.statistics.stat_table.style.display = "none";
	Model.statistics.statistics.style.display = "flex";
	document.getElementById("insights-right").style.display = "flex";
	console.log("Insights initialized!");
	

	if (Statistics.stats.length !== 0)
	{
		if (Statistics.stats[0].name === "bong" || Statistics.stats[0].name === "space_invaders")
			show_insights(Statistics.stats);
		else
		{
			console.error("Insights are available for bong and space invaders only!");
			return ;
		}
	}
}

function init()
{
	Model.statistics.stat_table.style.display = "block";
	Model.insights.insights.style.display = "none";
	document.getElementById("insights-right").style.display = "none";

	console.log(Statistics.stats);

	//show only the buttons with a result
	let i = 0;
	let table = document.getElementsByClassName("stat_square");

	while ( i < TABLE_ELEMENTS)
	{
		if (table[i].querySelector("button").innerText == "")
			table[i].querySelector("button").style.display = "none";
		else
			table[i].querySelector("button").style.display = "block";
		i++;
	}
	console.log("Statistics initialized!");
}

const Statistics = 
{
	stats: [],
	init: init,
	insights: insights,
};

export default Statistics;