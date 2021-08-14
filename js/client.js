var DefaultStyle = JSON.parse(JSON.stringify(Highcharts.getOptions()));
DefaultStyle.chart.style = {};
DefaultStyle.chart.backgroundColor = {color: "#ddd"};
DefaultStyle.chart.style.fontFamily = "var(--font-family)";
var DarkUnica = {
     colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
         '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
     chart: {
         backgroundColor: {
             color: '#555'
         },
         style: {
             fontFamily: "var(--font-family)",
         	 fontSize: '14px'
         },
         plotBorderColor: '#606063'
     },
     title: {
         style: {
             color: '#E0E0E3',
             textTransform: 'uppercase',
             fontSize: '20px'
         }
     },
     subtitle: {
         style: {
             color: '#E0E0E3',
             textTransform: 'uppercase'
         }
     },
     xAxis: {
         gridLineColor: '#707073',
         labels: {
             style: {
                 color: '#E0E0E3'
             }
         },
         lineColor: '#707073',
         minorGridLineColor: '#505053',
         tickColor: '#707073',
         title: {
             style: {
                 color: '#A0A0A3'
             }
         }
     },
     yAxis: {
         gridLineColor: '#707073',
         labels: {
             style: {
                 color: '#E0E0E3'
             }
         },
         lineColor: '#707073',
         minorGridLineColor: '#505053',
         tickColor: '#707073',
         tickWidth: 1,
         title: {
             style: {
                 color: '#A0A0A3'
             }
         }
     },
     tooltip: {
         backgroundColor: 'rgba(0, 0, 0, 0.85)',
         style: {
             color: '#F0F0F0'
         }
     },
     plotOptions: {
         series: {
             dataLabels: {
                 color: '#F0F0F3',
                 style: {
                     fontSize: '13px'
                 }
             },
             marker: {
                 lineColor: '#333'
             }
         },
         boxplot: {
             fillColor: '#505053'
         },
         candlestick: {
             lineColor: 'white'
         },
         errorbar: {
             color: 'white'
         }
     },
     legend: {
         backgroundColor: 'rgba(0, 0, 0, 0.5)',
         itemStyle: {
             color: '#E0E0E3'
         },
         itemHoverStyle: {
             color: '#FFF'
         },
         itemHiddenStyle: {
             color: '#606063'
         },
         title: {
             style: {
                 color: '#C0C0C0'
             }
         }
     },
     credits: {
         style: {
             color: '#666'
         }
     },
     labels: {
         style: {
             color: '#707073'
         }
     },
     drilldown: {
         activeAxisLabelStyle: {
             color: '#F0F0F3'
         },
         activeDataLabelStyle: {
             color: '#F0F0F3'
         }
     },
     navigation: {
         buttonOptions: {
             symbolStroke: '#DDDDDD',
             theme: {
                 fill: '#505053'
             }
         }
     },
     // scroll charts
     rangeSelector: {
         buttonTheme: {
             fill: '#505053',
             stroke: '#000000',
             style: {
                 color: '#CCC'
             },
             states: {
                 hover: {
                     fill: '#707073',
                     stroke: '#000000',
                     style: {
                         color: 'white'
                     }
                 },
                 select: {
                     fill: '#000003',
                     stroke: '#000000',
                     style: {
                         color: 'white'
                     }
                 }
             }
         },
         inputBoxBorderColor: '#505053',
         inputStyle: {
             backgroundColor: '#333',
             color: 'silver'
         },
         labelStyle: {
             color: 'silver'
         }
     },
     navigator: {
         handles: {
             backgroundColor: '#666',
             borderColor: '#AAA'
         },
         outlineColor: '#CCC',
         maskFill: 'rgba(255,255,255,0.1)',
         series: {
             color: '#7798BF',
             lineColor: '#A6C7ED'
         },
         xAxis: {
             gridLineColor: '#505053'
         }
     },
     scrollbar: {
         barBackgroundColor: '#808083',
         barBorderColor: '#808083',
         buttonArrowColor: '#CCC',
         buttonBackgroundColor: '#606063',
         buttonBorderColor: '#606063',
         rifleColor: '#FFF',
         trackBackgroundColor: '#404043',
         trackBorderColor: '#404043'
     }
 };
var commitInfo = [];
function openURL(x){
	if(RunInNwjs)
		nw.Shell.openExternal(x);
	else
		window.open(x);
}


function killSingleTrack(){

}

var rankChart;
function generateRankGraph(rankData){
	Highcharts.setOptions((DarkMode) ? DarkUnica : DefaultStyle);
	var chart = {
		type: 'spline',
		animation: Highcharts.svg, // don't animate in IE < IE 10.
		zoomType: 'x'
	};
	var title = {
		text: null
	};	
	var xAxis = {
		type: 'datetime',
		dateTimeLabelFormats: {
			millisecond: '%H:%M:%S.%L',
			second: '%H:%M:%S',
			minute: '%H:%M',
			hour: '%H:%M',
			day: '%m-%d',
			week: '%m-%d',
			month: '%Y-%m',
			year: '%Y'
		}
	};
	var yAxis = {
		reversed: true,
		title: {
			text: null
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}],
		dateTimeLabelFormats: {
			millisecond: '%H:%M:%S.%L',
			second: '%H:%M:%S',
			minute: '%H:%M',
			hour: '%H:%M',
			day: '%Y-%m-%d',
			week: '%m-%d',
			month: '%Y-%m',
			year: '%Y'
		},
	};
	var tooltip = {
		formatter: function () {
		return `<b><span info="Rank">${languageOption.general.Rank}</span>: ` + Highcharts.numberFormat(this.y, 0) + '</b><br/>' +
			Highcharts.dateFormat('%Y-%m-%d %H:%M', this.x);
		}
	};
	var plotOptions = {
		area: {
			pointStart: 1940,
			marker: {
				enabled: false,
				symbol: 'circle',
				radius: 2,
				states: {
					hover: {
					  enabled: true
					}
				}
			}
		}
	};
	var legend = {
		enabled: false
	};
	var exporting = {
		enabled: false
	};
	var series= [{
		name: 'rankData',
		data: rankData
	}];
	var credits = {
		enabled: false
	}
	var json = {};	
	json.chart = chart; 
	json.title = title;	  
	json.tooltip = tooltip;
	json.xAxis = xAxis;
	json.yAxis = yAxis; 
	json.legend = legend;  
	json.exporting = exporting;	
	json.series = series;
	json.plotOptions = plotOptions;
	json.credits = credits;
	
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});
	rankChart = Highcharts.chart("singleRankGraphContainer", json);
}

var singleLastTimeUpdate = new Date(0);
var singleMemoryUsed = 0, singleLoadTypeLast;
var singleLoadType;
var loadTypeReaction = [
	"",
	" <i class='fas fa-spin fa-sync-alt'></i>",
	" <i class='fas fa-clock red'></i>",
	" <i class='fas fa-unlink red'></i>",
	" <i class='fas fa-check green'></i>",
];
function reloadSingleMemoryUsed(){
	if(singleLoadType == singleLoadTypeLast)
		$(".singleMemoryUsed > span > span").html(toMemoryInfo(singleMemoryUsed));
	else
		$(".singleMemoryUsed").html(`<span><span>`+ toMemoryInfo(singleMemoryUsed) + '</span>' + loadTypeReaction[singleLoadType]+`</span>`);
	singleLoadTypeLast = singleLoadType;
}

function initSinglePage(){
	$(".singleUserAvatar").attr("src", "");
	$(".singleUsernameDisplayer").attr("class", "").addClass("singleUsernameDisplayer").html("");
	$(".singleRatingDisplayer > div:first-child").attr("class", "setInlineBlock").html("");
	$(".currRating").html(""); $(".maxRating").html("");
	$(".singleContestTags").html("");
	$(".singleContestProgressInfo").html("");
	$(".singleContestName").html("");
	$(".singleContestProgressRatingChangesDisplayer > span").html("");
	$(".singleRankLetters").html("");
	$(".singleRankChangesDisplayer").html("");
	$("#singleRankGraphContainer").html("");
	$(".singleContent > div > div > .loadingInterface").css("display", "grid").css("opacity", 1);
	$(".singleContent > div > div > .loadingInterface > div").html('<i class="fas fa-spin fa-sync-alt"></i>');
	$(".singleContestProgressBackground").css("width", 0);
	$(".singleProblemlistlistDisplayGrid").html("");
	$(".singleProblemlistDisplayList").html("");
	$(".singleProblemlistDisplayEvent").html("");
	$(".singleProblemlistBottom").html("");
}
function flushsingleProblemlistDisplayGrid(json, prob){
	if(prob.length == 0){
		prob = [];
		for(var i=0; i<sz; i++)
			prob.push({points: 0, rejectedAttemptCount: 0});
	}
	console.log("GRID", json, prob);
	$(".singleProblemlistlistDisplayGrid").html("");
	for(var i=0; i<json.length; i++){
		var q = $("<div class='singleProblemlistDisplayerGridItem'></div>");
		q.append(`<div class="singleProblemlistDisplayerGridItemIndex">${prob[i].index}</div>`);
		var typ = "";
		if(json[i].points != 0)	typ = "green";
		else if(json[i].rejectedAttemptCount)	typ = "red";
		q.append(`<div class="singleProblemlistDisplayerGridItemVerdict ${typ}">${typ==""?"-":(typ=="green"?'+':'-')+(json[i].rejectedAttemptCount?json[i].rejectedAttemptCount:'')}</div>`);
		if(json[i].bestSubmissionTimeSeconds != undefined)
			q.append(`<div>${getTimeLength(json[i].bestSubmissionTimeSeconds * 1000)}</div>`);
		else
			q.append(`<div>${'--:--'}</div>`);
		$(".singleProblemlistlistDisplayGrid").append(q);
	}
}
function flushsingleProblemlistBottom(json){
	if(JSON.stringify(json) == "[]"){
		$(".singleProblemlistBottom").html(
			`<div><span class="green">${0}</span> | <span class="red">${0}</span> | ${contestJsonProblems.length}</div>`+
			`<div><i class="fas fa-plus-square green"></i> ${0} <i class="fas fa-minus-square red"></i> ${0}</div>`+
			`<div><span class="green">${0}</span>(<span class="red">${0}</span>)</div>`
		)
		return;
	}
	var a=0, b=0, c=0;
	for(var i=0; i<json.problemResults.length; i++){
		if(json.problemResults[i].points != 0)	++a;
		else if(json.problemResults[i].rejectedAttemptCount)	++b;
		else ++c;
	}
	$(".singleProblemlistBottom").html(
		`<div><span class="green">${a}</span> | <span class="red">${b}</span> | ${c}</div>`+
		`<div><i class="fas fa-plus-square green"></i> ${json.successfulHackCount} <i class="fas fa-minus-square red"></i> ${json.unsuccessfulHackCount}</div>`+
		`<div><span class="green">${json.points}</span>(<span class="red">${json.penalty}</span>)</div>`
	)
}
function flushsingleProblemlistDisplayList(sub, prob, pb){
	if(pb == undefined || sub == undefined || prob == undefined || pb.length == 0)
		return;
	var indexToId = {}, sz = pb.length;
	if(prob.length == 0){
		prob = [];
		for(var i=0; i<sz; i++)
			prob.push({points: 0, rejectedAttemptCount: 0});
	}
	console.log("LIST", sub, prob, pb);
	$(".singleProblemlistDisplayList").html("");
	$(".singleProblemlistDisplayEvent").html("");
	console.log("LIST", sub, prob, pb);
	for(var i=0; i<sz; i++)
		indexToId[pb[i].index] = i;
	var jq = [], len = [];
	for(var i=0; i<sz; i++){
		var typ = "";
		if(prob[i].points != 0)	typ = "green";
		else if(prob[i].rejectedAttemptCount)	typ = "red";
		var q = $(`<div class="singleProblemlistDisplayListItem closed"><div class="singleProblemlistDisplayListItemInfo"><div class="singleProblemlistDisplayListItemInfoIndex">${pb[i].index}</div><div class="singleProblemlistDisplayListItemInfoVerdict"><div class="${typ}">${typ==""?"-":(typ=="green"?'+':'-')+(prob[i].rejectedAttemptCount?prob[i].rejectedAttemptCount:'')} (${prob[i].points})</div></div><div class="singleProblemlistDisplayListItemInfoTime"><i class="fa fa-clock"></i> ${prob[i].bestSubmissionTimeSeconds==undefined?"--:--":getTimeLength(prob[i].bestSubmissionTimeSeconds*1000)}</div><div class="singleProblemlistDisplayListItemInfoTimeAttempt"><div class="singleProblemlistVerdictBlock loadingColor">NAN</div></div></div><div class="singleProblemlistDisplayListItemProgress"></div><div class="singleProblemlistDisplayListItemStatus"></div></div>`);
		if(typ == "green")	q.children(".singleProblemlistDisplayListItemProgress").append(`<span class="successColor" style="width:100%"></span>`);
		if(typ == "red")	q.children(".singleProblemlistDisplayListItemProgress").append(`<span class="errorColor" style="width:100%"></span>`);
		$(".singleProblemlistDisplayList").append(q);
		jq.push(q); len.push(0);
	}
	var l = contestEndTime.getTime() - contestStartTime.getTime();
	for(var i=0; i<sub.length; i++){
		var q = sub[i];
		var qT = (q.creationTimeSeconds * 1000 - contestStartTime.getTime());
		var qM = q.memoryConsumedBytes;
		var qR = q.timeConsumedMillis;
		var t = $(`<div class="singleProblemlistDisplayListItemStatusInfo"><div class="singleProblemlistDisplayListItemInfoIndex">${q.problem.index}</div><div class="singleProblemlistDisplayListItemInfoVerdictBlock"><div subId="${q.id}" subContestId="${q.contestId}" subLink="true" class="singleProblemlistVerdictBlock ${judgeToClass(q.verdict)}">${toSmallInfo(q.verdict)}</div></div><div class="singleProblemlistDisplayListItemInfoRuntime">${qR}ms</div><div class="singleProblemlistDisplayListItemInfoMemory">${toMemoryInfo(qM)}</div><div class="singleProblemlistDisplayListItemInfoTimeLarge">${getTimeLength2(qT)}</div></div>`);
		console.log(q.problem.index, indexToId);
		if(settings.problemSubmissionDirection == "Ascending")
			jq[indexToId[q.problem.index]].children(".singleProblemlistDisplayListItemStatus").prepend(t);
		else
			jq[indexToId[q.problem.index]].children(".singleProblemlistDisplayListItemStatus").append(t);
		if(!len[indexToId[q.problem.index]])
			jq[indexToId[q.problem.index]].children(".singleProblemlistDisplayListItemInfo").children(".singleProblemlistDisplayListItemInfoTimeAttempt").html(`<div subId="${q.id}" subContestId="${q.contestId}" subLink="true" class="singleProblemlistVerdictBlock ${judgeToClass(q.verdict)}">${toSmallInfo(q.verdict)}</div>`);
		++ len[indexToId[q.problem.index]];
		if(settings.problemEventDirection == "Ascending")
			$(".singleProblemlistDisplayEvent").prepend(`<div class="singleProblemlistDisplayEventItem"><div class="singleProblemlistDisplayEventItemInfoDetailedTime">${getTimeLength2(qT)}</div><div class="singleProblemlistDisplayEventItemInfoIndex">${q.problem.index}</div><div class="singleProblemlistDisplayEventItemInfoVerdictBlock"><div subId="${q.id}" subLink="true" subContestId="${q.contestId}" class="singleProblemlistVerdictBlock ${judgeToClass(q.verdict)}">${toSmallInfo(q.verdict)} ${toSmallInfo(q.verdict)=="AC"?("("+q.passedTestCount+")"):("on "+(q.passedTestCount+1))}</div></div><div class="singleProblemlistDisplayEventItemInfoTestType">${toSmallTestset(q.testset)}</div></div>`)
		else
			$(".singleProblemlistDisplayEvent").append(`<div class="singleProblemlistDisplayEventItem"><div class="singleProblemlistDisplayEventItemInfoDetailedTime">${getTimeLength2(qT)}</div><div class="singleProblemlistDisplayEventItemInfoIndex">${q.problem.index}</div><div class="singleProblemlistDisplayEventItemInfoVerdictBlock"><div subId="${q.id}" subLink="true" subContestId="${q.contestId}" class="singleProblemlistVerdictBlock ${judgeToClass(q.verdict)}">${toSmallInfo(q.verdict)} ${toSmallInfo(q.verdict)=="AC"?("("+q.passedTestCount+")"):("on "+(q.passedTestCount+1))}</div></div><div class="singleProblemlistDisplayEventItemInfoTestType">${toSmallTestset(q.testset)}</div></div>`)
	}
	for(var i=0; i<sz; i++) if(!len[i])
		jq[i].children(".singleProblemlistDisplayListItemStatus").append($(`<div class="singleProblemlistDisplayListItemStatusInfo"><div class="singleProblemlistDisplayListItemInfoMessage" info="tipNoSubmissionFound">${languageOption.tip.tipNoSubmissionFound}</div></div>`));
	$(".singleProblemlistDisplayListItemInfo").unbind("click").click(function(){
		var q = $(this).parent();
		if(q.hasClass("closed"))	q.removeClass("closed");
		else q.addClass("closed");
	});
	$("[subLink='true']").unbind("click").click(function(){
		event.stopPropagation();
		openURL(settings.mainURL + "/contest/" +$(this).attr("subContestId")+"/submission/"+$(this).attr("subId"));
	})
}


function getSingleRatingChanges(currSingleLastTimeUpdate, un, ci){
	if(currSingleLastTimeUpdate != singleLastTimeUpdate)	return;
	if(singleContestUnrated == "Unrated"){
		$(".singleContestProgressRatingChangesDisplayer > span:last-child").html(localize("Unrated"));
		return;
	}
	var reloadIf = function(url, callbacks){
		singleLoadType = 1;
		reloadSingleMemoryUsed();
		$.ajax({
			url: url,
			type: "GET",
			timeout : settings.largeTimeLimit,
			data: {contestId: ci},
			success: function(json){
				if(typeof(json) == "string")
					json = JSON.parse(json);
				console.log(json);
				singleLoadType = 4;
				reloadSingleMemoryUsed();
				json = json.result;
				for(var i=0; i<json.length; i++) if(json[i].handle == un){
					$(".singleContestProgressRatingChangesDisplayer > span:last-child")
						.html(`<span class="${ratingToClass(json[i].oldRating)}">${json[i].oldRating}</span> <span class="${json[i].newRating>=json[i].oldRating?"green":"red"}">${json[i].newRating>=json[i].oldRating?'+':'-'}${Math.abs(Number(json[i].newRating)-Number(json[i].oldRating))}</span> <i class="fas fa-angle-double-right"></i> <span class="${ratingToClass(json[i].newRating)}">${json[i].newRating}</span>`)
					return;
				}
				$(".singleContestProgressRatingChangesDisplayer > span:last-child").html(localize("Unrated"));
			},
			error: function(jqXHR, status, errorThrown){
				console.log(jqXHR, status, errorThrown);
				if(status == "timeout"){
					//Network Timeout
					singleLoadType = 2;
					reloadSingleMemoryUsed();
					callbacks();
					return;
				}
				if(jqXHR.readyState != 4){
					//Network Error
					singleLoadType = 3;
					reloadSingleMemoryUsed();
					callbacks();
					return;
				}
				//Network Error
				singleLoadType = 3;
				reloadSingleMemoryUsed();
				callbacks();
			},
			xhr: function() {
				var xhr = new XMLHttpRequest();
				var q = 0;
				xhr.addEventListener('progress', function (e) {
					 console.log(toMemoryInfo(e.loaded), q);
					 singleMemoryUsed += (e.loaded - q);
					 reloadSingleMemoryUsed();
					 q = e.loaded;
				});
				return xhr;
			}
		});
	}
	reloadIf("https://codeforces.com/api/contest.ratingChanges", function(){
		reloadIf(settings.predictorURL, function(){
			$(".singleContestProgressRatingChangesDisplayer > span:last-child").html("<i class='fas fa-unlink red'></i>");
		});
	})
}
function getAllSingleContestantInfo(currSingleLastTimeUpdate, un, ci, success, error, S, E, loadStandings){
	console.log(loadStandings, "???");
	var s = 0, e = 0, c = 4;
	var Q = 0;
	function loadInfo(u, d, q, id, er){
		if(currSingleLastTimeUpdate != singleLastTimeUpdate)	return;
		singleLoadType = 1;
		reloadSingleMemoryUsed();
		$.ajax({
			url: u,
			type: "GET",
			timeout : id == 5 ? settings.largeTimeLimit : settings.smallTimeLimit,
			data: d,
			success: function(json){
				console.log(json);
				singleLoadType = 4;
				reloadSingleMemoryUsed();
				for(var i=0; i<q.length; i++)
					json = json[q[i]];
				success[id](un, ci, json, Q);
				if(id <= 3)	++s;
				if(s + e == c)	(s == c) ? S() : E();
			},
			error: function(jqXHR, status, errorThrown){
				console.log(jqXHR, status, errorThrown);
				if(status == "timeout"){
					//Network Timeout
					singleLoadType = 2;
					reloadSingleMemoryUsed();
					if(er == true){
						success[id](un, ci, undefined, Q);
						if(id <= 3)	++s; if(s + e == c)	(s == c) ? S() : E();
						return;
					}
					error[id](un, ci);
					if(id <= 3)	++e; if(s + e == c)	(s == c) ? S() : E();
					return;
				}
				if(jqXHR.readyState != 4){
					//Network Error
					singleLoadType = 3;
					reloadSingleMemoryUsed();
					if(er == true){
						success[id](un, ci, undefined, Q);
						if(id <= 3)	++s; if(s + e == c)	(s == c) ? S() : E();
						return;
					}
					error[id](un, ci);
					if(id <= 3)	++e; if(s + e == c)	(s == c) ? S() : E();
					return;
				}
				//Network Error
				singleLoadType = 3;
				reloadSingleMemoryUsed();
				if(er == true){
					success[id](un, ci, undefined, Q);
					if(id <= 3)	++s; if(s + e == c)	(s == c) ? S() : E();
					return;
				}
				error[id](un, ci);
				if(id <= 3)	++e;
				if(s + e == c)	(s == c) ? S() : E();
				reloadOption = true;
			},
			xhr: function() {
				var xhr = new XMLHttpRequest();
				var q = 0;
				xhr.addEventListener('progress', function (e) {
					 console.log(toMemoryInfo(e.loaded), q);
					 singleMemoryUsed += (e.loaded - q);
					 reloadSingleMemoryUsed();
					 q = e.loaded;
				});
				return xhr;
			}
		});
	}
	loadInfo("https://codeforces.com/api/contest.standings", {contestId: ci, handles: un, showUnofficial: false}, ["result"], 0, false);
	loadInfo("https://codeforces.com/api/contest.standings", {contestId: ci, handles: un, showUnofficial: true}, ["result"], 1, false);
	loadInfo("https://codeforces.com/api/user.info", {handles: un}, ["result", "0"], 2, false);
	loadInfo("https://codeforces.com/api/contest.status", {contestId: ci, handle: un}, ["result"], 3, false);
	if(success.length != 4)
		setTimeout(function(){
			getSingleRatingChanges(currSingleLastTimeUpdate, un, ci);
		}, 2000);
	else
		$(".singleContestProgressRatingChangesDisplayer > span:last-child").html(localize("Unrated"));
	console.log(contestStandingLoader, contestStangingLoadTime.getTime() < (new Date()).getTime() - settings.standingsLoadingGap);
	setTimeout(function(){
		loadStandings = loadStandings || (settings.openStandings == 2 || (settings.openStandings == 1 && getContestType($(".singleContestName").html()) == "Div. 1"));
		if(loadStandings && contestStangingLoadTime.getTime() < (new Date()).getTime() - settings.standingsLoadingGap){
			Q = ++contestStandingsIndex;
			contestStandingLoader = 0;
			contestStangingLoadTime = new Date();
			loadInfo("https://codeforces.com/api/contest.hacks", {contestId: ci}, ["result"], 4, true);
			if((inContest == 2 && settings.openRankPredict >= 1) || (inContest >= 1 && settings.openRankPredict == 2))
				setTimeout(function(){loadInfo("https://codeforces.com/api/contest.standings", {contestId: ci, showUnofficial: settings.openRankPredict == 2}, ["result"], 5, false);}, 500);
	}}, 3000);
}
function ratingToClass(x){
	if(x == undefined)	return "user-unrated";
	if(x <= 0)	return "user-unrated";
	if(x < 1200)	return "user-newbie";
	if(x < 1400)	return "user-pupil";
	if(x < 1600)	return "user-specialist";
	if(x < 1900)	return "user-expert";
	if(x < 2100)	return "user-cmaster";
	if(x < 2300)	return "user-master";
	if(x < 2400)	return "user-imaster";
	if(x < 2600)	return "user-grandmaster";
	if(x < 3000)	return "user-igramdmaster";
	return "user-legendary";
}
function ratingToGrade(x){
	if(x == undefined)	return "Unrated";
	if(x <= 0)	return "Unrated";
	if(x < 1200)	return "Newbie";
	if(x < 1400)	return "Pupil";
	if(x < 1600)	return "Specialist";
	if(x < 1900)	return "Expert";
	if(x < 2100)	return "Candidate Master";
	if(x < 2300)	return "Master";
	if(x < 2400)	return "International Master";
	if(x < 2600)	return "Grandmaster";
	if(x < 3000)	return "International Grandmaster";
	return "Legendary Grandmaster";
}
var singleContestType, singleContestUnrated;
var contestEndTime, contestStartTime;
var contestHacks, contestStandingList;
var contestRanks = [0, 0], contestRankLast = [0, 0], contestRankInfo = [[], []], contestCalculatingRank = [false, false], contestRankChosen = 0;
var contestStandingsIndex = 0, contestStandingLoader = 0;
var contestStangingLoadTime = new Date(0);
var contestRunningStatus, contestRunningType;
var contestSubmissionList = [];
var inContest;
var contestProblemResult;

var contesRealStartTime, contestRealEndTime, virtualProvidedStartTime;

function flushRankDisplayer(){
	$(".singleRankLetters").html(contestRanks[contestRankChosen] == 0 ? "?" : contestRanks[contestRankChosen]);
	if(contestRanks[contestRankChosen] == 0)
		$(".singleRankChangesDisplayer").html("<span>-</span>");
	else if(contestRankLast[contestRankChosen] == 0)
		$(".singleRankChangesDisplayer").html("<span>-</span>");
	else if(contestRankLast[contestRankChosen] == contestRanks[contestRankChosen])
		$(".singleRankChangesDisplayer").html("<i class='fas fa-sort'></i><span>-</span>");
	else if(contestRankLast[contestRankChosen] > contestRanks[contestRankChosen])
		$(".singleRankChangesDisplayer").html
			(`<i class='fas fa-caret-up red'></i><span>${contestRankLast[contestRankChosen] - contestRanks[contestRankChosen]}</span>`);
	else
		$(".singleRankChangesDisplayer").html
			(`<i class='fas fa-caret-down green'></i><span>${contestRanks[contestRankChosen] - contestRankLast[contestRankChosen]}</span>`);
	if(contestCalculatingRank[contestRankChosen])
		$("#singleRankGraphContainer").html(`<div class="loadingInterface"><div><i class="fas fa-calculator"></i><span class="popTip" info="tipCalculatingRankGraph">${languageOption.tip.tipCalculatingRankGraph}</span></div></div>`);
	else generateRankGraph(contestRankInfo[contestRankChosen]);
}
function flushContestantProgressBarInner(){
	$(".singleContestProgressInfo").html("");
	var l = contestEndTime.getTime() - contestStartTime.getTime();
	for(var i=0; i<contestSubmissionList.length; i++){
		var q = contestSubmissionList[i];
		var r = $(`<div class="singleContestProgressPart ${judgeToClass(q.verdict)}"></div>`);
		r.css("left", (q.creationTimeSeconds * 1000 - contestStartTime.getTime()) / l * 100 + "%");
		r.attr("sinfo", JSON.stringify([(q.creationTimeSeconds * 1000 - contestStartTime.getTime()) / l
			, q.problem.index, q.verdict, q.memoryConsumedBytes, q.timeConsumedMillis]));
		$(".singleContestProgressInfo").append(r);
	}
	$(".singleContestProgressPart").unbind("mouseover").mouseover(function(){
		$(".singleContestPoptip").removeClass("closed");
		var argv = JSON.parse($(this).attr("sinfo"));
		$(".singleContestPoptip").css("left", 30 * argv[0] + '%');
		$(".singleContestPoptipTail").css("left", `calc(${5 + 90 * argv[0]}% - 10px)`);
		$(".singlePoptipIndex").html(argv[1]);
		$(".singlePoptipVerdictBlock").attr("class", "singlePoptipVerdictBlock " + judgeToClass(argv[2])).html(toSmallInfo(argv[2]));
		$(".singlePoptipTime").html(''+argv[4]+"ms");
		$(".singlePoptipMemory").html(''+toSubmissionMemoryInfo(argv[3]));
	});
	$(".singleContestProgressPart").unbind("mouseout").mouseout(function(){
		$(".singleContestPoptip").addClass("closed");
	});

}

function getContestType(x){
	if(x.indexOf("Div. 1 + Div. 2") >= 0)	return "Div. 1+2";
	if(x.indexOf("Rated for Div. 2") >= 0)	return "Rated for Div. 2";
	for(var i=1; i<=4; i++)
		if(x.indexOf("Div. " + i) >= 0)	return "Div. " + i;
	return undefined;
}
function singleContestantTimeCountdown(){
	setTimeout(singleContestantTimeCountdown, 500);
	var d = contestEndTime.getTime() - (new Date()).getTime();
	if(d < 0)	return;
	d = getTimeLength2(d);
	$(".singleContestProgressRatingChangesDisplayer > span:first-child")
		.attr("info", "contestRunning").attr("argv", `['${d}']`)
		.html(languageOption.general.contestRunning.format(d));
	var p = (new Date()).getTime() - contestStartTime.getTime();
	var q = contestEndTime.getTime() - contestStartTime.getTime();
	$(".singleContestProgressBackground").css("width", `${p/q*100}%`);
}
function singleContestantSyncOfficialSettings(un, ci, json, p){
	console.log("Official", json);
	$(".singleContestTags").html("");
	var nam = $(`<div class="singleContestTag primaryColor"><i class="fas fa-calendar"></i>#${ci}</div>`);
	$(".singleContestTags").append(nam);
	var dur = $(`<div class="singleContestTag warningColor"><i class="fas fa-clock"></i>${getTimeLength3(json.contest.durationSeconds*1000)}</div>`);
	$(".singleContestTags").append(dur);
	singleContestType = getContestType(json.contest.name);
	$(".singleContestName").html(json.contest.name);
	if(json.rows.length != 0)
		contestProblemResult = json.rows[0].problemResults;
	contestStartTime = new Date(json.contest.startTimeSeconds * 1000);
	contestEndTime = new Date((json.contest.startTimeSeconds + json.contest.durationSeconds) * 1000);
	contestRunningStatus = json.contest.phase;
	contestRunningType = json.contest.type;
	contestJsonProblems = json.problems;
	flushsingleProblemlistDisplayList(contestSubmissionList, contestProblemResult, contestJsonProblems);
	if(json.rows.length != 0){
		contestRankLast[0] = contestRanks[0];
		contestRanks[0] = json.rows[0].rank;
		if(json.contest.phase == "CODING" || contestRankInfo[0].length == 0)
			contestRankInfo[0].push([(new Date).getTime(), json.rows[0].rank]);
		flushsingleProblemlistDisplayGrid(json.rows[0].problemResults, json.problems);
		flushsingleProblemlistBottom(json.rows[0]);
	}
	else{
		flushsingleProblemlistDisplayGrid([], json.problems);
		flushsingleProblemlistBottom([]);
	}
	flushRankDisplayer();
	if(json.contest.phase == "CODING"){singleContestantTimeCountdown();}
	else if(json.contest.phase == "PENDING_SYSTEM_TEST")
		$(".singleContestProgressRatingChangesDisplayer > span:first-child")
			.attr("info", "contestPendingSystemTest")
			.html(languageOption.general.contestPendingSystemTest),
		$(".singleContestProgressBackground").css("width", "100%");
	else if(json.contest.phase == "SYSTEM_TEST")
		$(".singleContestProgressRatingChangesDisplayer > span:first-child")
			.attr("info", "contestSystemTest")
			.html(languageOption.general.contestSystemTest),
		$(".singleContestProgressBackground").css("width", "100%");
	else if(json.contest.phase == "FINISHED")
		$(".singleContestProgressRatingChangesDisplayer > span:first-child")
			.attr("info", "contestFinished")
			.html(languageOption.general.contestFinished),
		$(".singleContestProgressBackground").css("width", "100%");
	if(singleContestType != undefined){
		var sct = $(`<div class="singleContestTag successColor"><i class="fas fa-book"></i>${singleContestType}</div>`);
		$(".singleContestTags").append(sct);
	}
	if(singleContestUnrated != undefined){
		var unk = $(`<div class="singleContestTag dangerColor"><i class="fas fa-user-secret"></i>${localize("tag"+singleContestUnrated)}</div>`);
		$(".singleContestTags").append(unk);
	}
}
function singleContestantSyncUnofficialSettings(un, ci, json, p){
	console.log("Unofficial", json);
	$(".singleContestTags").html("");
	var nam = $(`<div class="singleContestTag primaryColor"><i class="fas fa-calendar"></i>#${ci}</div>`);
	$(".singleContestTags").append(nam);
	var dur = $(`<div class="singleContestTag warningColor"><i class="fas fa-clock"></i>${getTimeLength3(json.contest.durationSeconds*1000)}</div>`);
	$(".singleContestTags").append(dur);
	singleContestType = getContestType(json.contest.name);
	$(".singleContestName").html(json.contest.name);
	contestStartTime = new Date(json.contest.startTimeSeconds * 1000);
	contestEndTime = new Date((json.contest.startTimeSeconds + json.contest.durationSeconds) * 1000);
	contestRunningStatus = json.contest.phase;
	contestRunningType = json.contest.type;
	contestJsonProblems = json.problems;
	if(json.contest.phase == "CODING"){singleContestantTimeCountdown();}
	else if(json.contest.phase == "PENDING_SYSTEM_TEST")
		$(".singleContestProgressRatingChangesDisplayer > span:first-child")
			.attr("info", "contestPendingSystemTest")
			.html(languageOption.general.contestPendingSystemTest),
		$(".singleContestProgressBackground").css("width", "100%");
	else if(json.contest.phase == "SYSTEM_TEST")
		$(".singleContestProgressRatingChangesDisplayer > span:first-child")
			.attr("info", "contestSystemTest")
			.html(languageOption.general.contestSystemTest),
		$(".singleContestProgressBackground").css("width", "100%");
	else if(json.contest.phase == "FINISHED")
		$(".singleContestProgressRatingChangesDisplayer > span:first-child")
			.attr("info", "contestFinished")
			.html(languageOption.general.contestFinished),
		$(".singleContestProgressBackground").css("width", "100%");
	if(singleContestType != undefined){
		var sct = $(`<div class="singleContestTag successColor"><i class="fas fa-book"></i>${singleContestType}</div>`);
		$(".singleContestTags").append(sct);
	}
	singleContestUnrated = "Unranked";
	inContes = false;
	for(var i=0; i<json.rows.length; i++)
		if(json.rows[i].party.participantType == "CONTESTANT"){
			contestProblemResult = json.rows[i].problemResults;
			flushsingleProblemlistDisplayList(contestSubmissionList, contestProblemResult, contestJsonProblems);
			contestRankLast[1] = contestRanks[1];
			contestRanks[1] = json.rows[i].rank;
			singleContestUnrated = "Contestant";
			if(json.contest.phase == "CODING" || contestRankInfo[1].length == 0)
				contestRankInfo[1].push([(new Date).getTime(), json.rows[i].rank]);
			inContest = 2;
			flushsingleProblemlistBottom(json.rows[i]);
			flushsingleProblemlistDisplayGrid(json.rows[i].problemResults, json.problems);
		}
		else if(json.rows[i].party.participantType == "OUT_OF_COMPETITION"){
			contestProblemResult = json.rows[i].problemResults;
			flushsingleProblemlistDisplayList(contestSubmissionList, contestProblemResult, contestJsonProblems);
			contestRankLast[1] = contestRanks[1];
			contestRanks[1] = json.rows[i].rank;
			singleContestUnrated = "Unrated";
			if(json.contest.phase == "CODING" || contestRankInfo[1].length == 0)
				contestRankInfo[1].push([(new Date).getTime(), json.rows[i].rank]);
			inContest = 1;
			flushsingleProblemlistBottom(json.rows[i]);
			flushsingleProblemlistDisplayGrid(json.rows[i].problemResults, json.problems);
		}
	if(!inContest){
		flushsingleProblemlistDisplayList(contestSubmissionList, [], contestJsonProblems);
		flushsingleProblemlistBottom([]);
		flushsingleProblemlistDisplayGrid([], json.problems);
	}
	flushRankDisplayer();
	if(singleContestUnrated != undefined){
		var unk = $(`<div class="singleContestTag dangerColor"><i class="fas fa-user-secret"></i>${localize("tag"+singleContestUnrated)}</div>`);
		$(".singleContestTags").append(unk);
	}
}
function singleVirtualSyncUnofficialSettings(un, ci, json, p){
	console.log("Unofficial - Virtual", json);
	$(".singleContestTags").html("");
	var nam = $(`<div class="singleContestTag primaryColor"><i class="fas fa-calendar"></i>#${ci}</div>`);
	$(".singleContestTags").append(nam);
	var dur = $(`<div class="singleContestTag warningColor"><i class="fas fa-clock"></i>${getTimeLength3(json.contest.durationSeconds*1000)}</div>`);
	$(".singleContestTags").append(dur);
	singleContestType = getContestType(json.contest.name);
	$(".singleContestName").html(json.contest.name);
	contestStartTime = new Date(virtualProvidedStartTime.getTime());
	contestEndTime = new Date(virtualProvidedStartTime.getTime() + json.contest.durationSeconds * 1000);
	contestRunningStatus = ((new Date()).getTime() <= contestEndTime.getTime()) ? "CODING" : "FINISHED";
	contestRunningType = json.contest.type;
	contestJsonProblems = json.problems;
	contestRealStartTime = new Date(json.contest.startTimeSeconds * 1000);
	contestRealEndTime = new Date((json.contest.startTimeSeconds + json.contest.durationSeconds) * 1000);
	if(contestRunningStatus == "CODING"){singleContestantTimeCountdown();}
	else if(contestRunningStatus == "FINISHED")
		$(".singleContestProgressRatingChangesDisplayer > span:first-child")
			.attr("info", "contestFinished")
			.html(languageOption.general.contestFinished),
		$(".singleContestProgressBackground").css("width", "100%");
	if(singleContestType != undefined){
		var sct = $(`<div class="singleContestTag successColor"><i class="fas fa-book"></i>${singleContestType}</div>`);
		$(".singleContestTags").append(sct);
	}
	singleContestUnrated = "Virtual";
	inContes = false;
	for(var i=0; i<json.rows.length; i++){
		if(json.rows[i].party.participantType == "VIRTUAL" && json.rows[i].party.startTimeSeconds * 1000 == virtualProvidedStartTime.getTime()){
			console.log("VIRTUAL INFO", json.rows[i]);
			contestProblemResult = json.rows[i].problemResults;
			flushsingleProblemlistDisplayList(contestSubmissionList, contestProblemResult, contestJsonProblems);
			contestRankLast[0] = contestRanks[0];
			contestRankLast[1] = contestRanks[1];
			contestRanks[0] = getPredictedRank(json.rows[i].points, json.rows[i].penalty, ((new Date()).getTime() - contestStartTime.getTime()) / 1000, contestStandingList.rows, contestHacks, false);
			contestRanks[1] = getPredictedRank(json.rows[i].points, json.rows[i].penalty, ((new Date()).getTime() - contestStartTime.getTime()) / 1000, contestStandingList.rows, contestHacks, true);
			if(contestRunningStatus == "CODING" || contestRankInfo[0].length == 0)
				contestRankInfo[0].push([(new Date).getTime(), contestRanks[0]]),
				contestRankInfo[1].push([(new Date).getTime(), contestRanks[1]]);
			inContest = 1;
			flushsingleProblemlistBottom(json.rows[i]);
			flushsingleProblemlistDisplayGrid(json.rows[i].problemResults, json.problems);
		}
	}
	if(!inContest){
		contestRankLast[0] = contestRanks[0];
		contestRankLast[1] = contestRanks[1];
		contestRanks[0] = getPredictedRank(0, 0, ((new Date()).getTime() - contestStartTime.getTime()) / 1000, contestStandingList.rows, contestHacks, false);
		contestRanks[1] = getPredictedRank(0, 0, ((new Date()).getTime() - contestStartTime.getTime()) / 1000, contestStandingList.rows, contestHacks, true);
		if(contestRunningStatus == "CODING" || contestRankInfo[0].length == 0)
			contestRankInfo[0].push([(new Date).getTime(), contestRanks[0]]),
			contestRankInfo[1].push([(new Date).getTime(), contestRanks[1]]);
		inContest = 1;
		flushsingleProblemlistDisplayList(contestSubmissionList, [], contestJsonProblems);
		flushsingleProblemlistBottom([]);
		flushsingleProblemlistDisplayGrid([], json.problems);
	}
	flushRankDisplayer();
	if(singleContestUnrated != undefined){
		var unk = $(`<div class="singleContestTag dangerColor"><i class="fas fa-user-secret"></i>${localize("tag"+singleContestUnrated)}</div>`);
		$(".singleContestTags").append(unk);
	}
}
function singleContestantSyncUserInfo(un, ci, json, p){
	console.log("User", json);
	var c = ratingToClass(json.rating);
	$(".singleUserAvatar").attr("src", json.titlePhoto);
	$(".singleUsernameDisplayer").attr("class", "singleUsernameDisplayer");
	$(".singleUsernameDisplayer").addClass(c);
	$(".singleUsernameDisplayer").html(un);
	$(".singleRatingDisplayer > div:first-child").addClass(c).html(ratingToGrade(json.rating));
	$(".currRating").attr("class", "currRating setInlineBlock");
	$(".currRating").addClass(c).html(json.rating);
	$(".maxRating").attr("class", "maxRating setInlineBlock");
	$(".maxRating").addClass(ratingToClass(json.maxRating)).html(json.maxRating);
}
function singleContestantSyncProblemStatus(un, ci, json, p){
	contestSubmissionList = [];
	for(var i=0; i<json.length; i++){
		if(json[i].author.participantType == "CONTESTANT"
		|| json[i].author.participantType == "OUT_OF_COMPETITION")
			contestSubmissionList.push(json[i]);
	}
	flushsingleProblemlistDisplayList(contestSubmissionList, contestProblemResult, contestJsonProblems);
}
function singleVirtualSyncProblemStatus(un, ci, json, p){
	contestSubmissionList = [];
	for(var i=0; i<json.length; i++){
		if(json[i].author.participantType == "VIRTUAL"
		&& json[i].author.startTimeSeconds == virtualProvidedStartTime.getTime() / 1000)
			contestSubmissionList.push(json[i]);
	}
	flushsingleProblemlistDisplayList(contestSubmissionList, contestProblemResult, contestJsonProblems);
}






function hlMask(hl){
	var ret = {};
	for(var i=0; i<hl.length; i++)
		if(hl[i].creationTimeSeconds * 1000 <= contestEndTime){
			var from = hl[i].hacker.members[0].handle;
			if(ret[from] == undefined)	ret[from] = [];
			ret[from].push([(hl[i].creationTimeSeconds*1000)-(contestStartTime).getTime(), hl[i].verdict == "HACK_SUCCESSFUL" ? 100 : -50]);
		}
	return ret;
}
function getPredictedRank(points, penalty, time, sl, hl, uno){
	if(penalty==undefined)	penalty = 0;
	var returnValue = 1;
	for(var i=0;i<sl.length;i++){
		var _points = 0, _penalty = 0;
		for(var j=0;j<sl[i].problemResults.length;j++){
			if(sl[i].party.participantType != "CONTESTANT" &&
				(!uno || sl[i].party.participantType != "OUT_OF_COMPETITION"))	continue;
			if(sl[i].problemResults[j].bestSubmissionTimeSeconds!=undefined
			&& sl[i].problemResults[j].bestSubmissionTimeSeconds<=time){
				_points += sl[i].problemResults[j].points;
				var _dalta = sl[i].problemResults[j].penalty;
				if(contestRunningType == "ICPC")
					_dalta = Math.floor(sl[i].problemResults[j].bestSubmissionTimeSeconds/60)
						+sl[i].problemResults[j].rejectedAttemptCount*10;
				_penalty += (_dalta == undefined ? 0 : _dalta);
			}
		}
		if(contestRunningType == "CF" && hl[sl[i].party.members[0].handle]!=undefined){
			for(var j=0;j<hl[sl[i].party.members[0].handle].length;j++){
				if(hl[sl[i].party.members[0].handle][j][0]>time)	break;
				_points += hl[sl[i].party.members[0].handle][j][1];
			}
		}
		if(points < _points || (points == _points && penalty > _penalty))
			++ returnValue;
	}
	return returnValue;
}
function getOverallPredictedRank(pr, sl, un, hl, uno){
	var currT = contestStartTime;
	var Step = settings.reloadTime;
	var returnValue = [];
	var p = new Date();
	var NoteNumber = (contestEndTime).getTime() - (contestStartTime).getTime();
	NoteNumber = Math.floor(NoteNumber / Step) + 1;
	var T = 0;
	while(currT <= contestEndTime){
		var currS = 0, currP = 0;
		var time = (currT.getTime()-contestStartTime.getTime())/1000;
		for(var j=0;j<pr.length;j++){
			if(pr[j].bestSubmissionTimeSeconds!=undefined
			&& pr[j].bestSubmissionTimeSeconds<=time){
				currS += pr[j].points;
				var _dalta = pr[j].penalty;
				if(contestRunningType == "ICPC")
					_dalta = Math.floor(pr[j].bestSubmissionTimeSeconds/60)+pr[j].rejectedAttemptCount*10;
				currP += (_dalta == undefined ? 0 : _dalta);
			}
		}
		if(contestRunningType == "CF" && hl != undefined){
			for(var j=0;j<hl.length;j++){
				if(hl[un][j][0]>time)	break;
				currS += hl[un][j][1];
			}
		}
		returnValue.push([(currT).getTime(),  getPredictedRank(currS, currP, time, sl, hl, uno)]);
		currT = new Date((currT).getTime() + Step);
	}
	return returnValue;
}
function loadStandingsService(un, ci, forced){
	if(forced == true || (settings.openRankPredict >= 1 && inContest == 2)){
		contestCalculatingRank[0] = true;
		flushRankDisplayer();
		var g = function(ret){
			var q = getOverallPredictedRank(contestProblemResult, contestStandingList.rows, un, contestHacks, false);
			ret(q);
		}
		g(function(json){
			contestRankInfo[0] = json;
			contestCalculatingRank[0] = false;
			flushRankDisplayer();
		});
	}
	if(forced == true || (settings.openRankPredict == 2 && inContest >= 1)){
		contestCalculatingRank[1] = true;
		flushRankDisplayer();
		var g = function(ret){
			var q = getOverallPredictedRank(contestProblemResult, contestStandingList.rows, un, contestHacks, true);
			ret(q);
		}
		g(function(json){
			contestRankInfo[1] = json;
			contestCalculatingRank[1] = false;
			flushRankDisplayer();
		})
	}

}
function singleContestantSyncHacks(un, ci, json, p){
	if(p != contestStandingsIndex)	return;
	++contestStandingLoader;
	if(json == undefined)
		contestHacks = {};
	else contestHacks = hlMask(json);
	if(contestStandingLoader == 2)
		loadStandingsService(un, ci, false);
}
function singleContestantSyncStandings(un, ci, json, p){
	if(p != contestStandingsIndex)	return;
	contestStandingList = json;
	++contestStandingLoader;
	if(contestStandingLoader == 2)
		loadStandingsService(un, ci, false);
}
function singleContestantMainTrack(currSingleLastTimeUpdate, un, ci){
	contestRanks = [0, 0];
	contestRankDelta = [0, 0];
	contestRankInfo = [[], []];
	contestStangingLoadTime = new Date(0);
	contestProblemResult = [];
	contestSubmissionList = [];
	contestJsonProblems = [];
	contestStartTime = contestEndTime = new Date(0);
	singleContestUnrated = undefined;
	singleContestType = "";
	contestHacks = contestStandingList = undefined;
	contestCalculatingRank = [false, false];
	contestStandingsIndex = 0, contestStandingLoader = 0;
	contestStangingLoadTime = new Date(0);
	contestRunningStatus = "", contestRunningType = "";
	contestSubmissionList = [];
	inContest = false;
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > i").css("opacity", 0);
		$(".singleContent > div > div > .loadingInterface > div > .popTip").addClass("closed").css("max-height", 0);
	}, 300);
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > .popTip").remove();
	}, 800);
	var q;
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > i")
			.removeClass("fa-spin").addClass("fa-sync-alt").removeClass("fa-clock").addClass("fa-spin").css("opacity", 1);
		q = $(`<div class='popTip closed'></div>`);
		q.html(`<span info="tipLaoding">${languageOption.tip.tipLoading}</span>`);
		$(".singleContent > div > div > .loadingInterface > div").append(q);
	}, 900);
	setTimeout(function(){
		q.removeClass("closed");
	}, 1100);
	function func(){
		if(currSingleLastTimeUpdate != singleLastTimeUpdate)	return;
		getAllSingleContestantInfo(currSingleLastTimeUpdate, un, ci, [singleContestantSyncOfficialSettings, singleContestantSyncUnofficialSettings, singleContestantSyncUserInfo, singleContestantSyncProblemStatus, singleContestantSyncHacks, singleContestantSyncStandings], [function(){}, function(){}, function(){}, function(){}, function(){}, function(){}]
			, function(){
				if(currSingleLastTimeUpdate != singleLastTimeUpdate)	return;
				flushContestantProgressBarInner();
				$(".singleContent > div > div > .loadingInterface").css("opacity", 0);
				setTimeout(function(){
					$(".singleContent > div > div > .loadingInterface").css("display", "none");
				}, 200);
				if(contestRunningStatus == "CODING")
					setTimeout(func, settings.reloadTime);
			}, function(){
				if(currSingleLastTimeUpdate != singleLastTimeUpdate)	return;
				setTimeout(func, settings.smallReloadTime);
			}, false);
	}
	func();
}


function singleVirtualMainTrack(currSingleLastTimeUpdate, un, ci, tm){
	virtualProvidedStartTime = tm;
	contestRanks = [0, 0];
	contestRankDelta = [0, 0];
	contestRankInfo = [[], []];
	contestStangingLoadTime = new Date(0);
	contestProblemResult = [];
	contestSubmissionList = [];
	contestJsonProblems = [];
	contestStartTime = contestEndTime = new Date(0);
	singleContestUnrated = undefined;
	singleContestType = "";
	contestCalculatingRank = [false, false];
	contestStandingsIndex = 0, contestStandingLoader = 0;
	contestStangingLoadTime = new Date(0);
	contestRunningStatus = "", contestRunningType = "";
	contestSubmissionList = [];
	inContest = false;
	contestRealEndTime = contestRealEndTime = new Date(0);
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > i").css("opacity", 0);
		$(".singleContent > div > div > .loadingInterface > div > .popTip").addClass("closed").css("max-height", 0);
	}, 300);
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > .popTip").remove();
	}, 800);
	var q;
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > i")
			.removeClass("fa-spin").addClass("fa-sync-alt").removeClass("fa-clock").addClass("fa-spin").css("opacity", 1);
		q = $(`<div class='popTip closed'></div>`);
		q.html(`<span info="tipLaoding">${languageOption.tip.tipLoading}</span>`);
		$(".singleContent > div > div > .loadingInterface > div").append(q);
	}, 900);
	setTimeout(function(){
		q.removeClass("closed");
	}, 1100);
	function func(){
		if(currSingleLastTimeUpdate != singleLastTimeUpdate)	return;
		getAllSingleContestantInfo(currSingleLastTimeUpdate, un, ci, [function(){}, singleVirtualSyncUnofficialSettings, singleContestantSyncUserInfo, singleVirtualSyncProblemStatus], [function(){}, function(){}, function(){}, function(){}]
			, function(){
				if(currSingleLastTimeUpdate != singleLastTimeUpdate)	return;
				flushContestantProgressBarInner();
				$(".singleContent > div > div > .loadingInterface").css("opacity", 0);
				setTimeout(function(){
					$(".singleContent > div > div > .loadingInterface").css("display", "none");
				}, 200);
				if(contestRunningStatus == "FINISHED")
					setTimeout(function(){loadStandingsService(un, ci, true);}, 1000);
				if(contestRunningStatus == "CODING")
					setTimeout(func, settings.reloadTime);
			}, function(){
				if(currSingleLastTimeUpdate != singleLastTimeUpdate)	return;
				setTimeout(func, settings.smallReloadTime);
			}, false);
	}
	func();
}


function singleContestantWaitToStart(currLastTimeUpdate, un, ci){
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > .popTip").addClass("closed").css("max-height", 0);
		$(".singleContent > div > div > .loadingInterface > div > i").css("opacity", 0);
	}, 300);
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > .popTip").remove();
	}, 800);
	var q, r;
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > i")
			.removeClass("fa-spin").removeClass("fa-sync-alt").addClass("fa-clock").css("opacity", 1);
		q = $(`<div class='popTip closed'></div>`);
		q.html(`<span info="tipContestNotStarted">${languageOption.tip.tipContestNotStarted}</span>`);
		$(".singleContent > div > div > .loadingInterface > div").append(q);
		r = $(`<div class='popTip closed small'></div>`);
		r.html(`<span info="tipHaveARest">${languageOption.tip.tipHaveARest}</span>`);
		$(".singleContent > div > div > .loadingInterface > div").append(r);
	}, 900);
	setTimeout(function(){
		q.removeClass("closed");
	}, 1100);
	setTimeout(function(){
		r.removeClass("closed");
	}, 1350);
	var startTime = undefined;
	var u;
	var reloadTimeCount = function(){
		if(startTime <= (new Date()).getTime()){
			singleContestantMainTrack(currLastTimeUpdate, un, ci);
			return;
		}
		q.html(`<span info="tipContestStartIn" argv='["${getTimeLength2(startTime - (new Date()).getTime())}"]'>${languageOption.tip.tipContestStartIn.format(getTimeLength2(startTime - (new Date()).getTime()))}</span>`);
		u = setTimeout(reloadTimeCount, 500);
	}
	var reloadMonitor = function(){
		q.css("opacity", 0);
		setTimeout(function(){
			if(u)	killTimeout(u);
			q.html(`<span info="tipContestStartIn">${languageOption.tip.tipContestStartIn.format(getTimeLength2(startTime - (new Date()).getTime()))}</span>`);
			q.css("opacity", 1); u = reloadTimeCount();
		}, 500)
	}
	var reloadStartTime = function(){
		if(currLastTimeUpdate != singleLastTimeUpdate)	return;
		singleLoadType = 1;
		reloadSingleMemoryUsed();
		$.ajax({
			url: "https://codeforces.com/api/contest.list",
			type: "GET",
			timeout : settings.smallTimeLimit,
			data: {gym: ci >= 100000},
			success: function(json){
				console.log(json);
				singleLoadType = 4;
				setTimeout(reloadStartTime, settings.reloadTime);
				reloadSingleMemoryUsed();
				for(var i=0; i<json.result.length; i++)
					if(json.result[i].id == ci){
						if(startTime == undefined)
							reloadMonitor();
						startTime = json.result[i].startTimeSeconds * 1000;
					}
			},
			error: function(jqXHR, status, errorThrown){
				console.log(jqXHR, status, errorThrown);
				if(status == "timeout"){
					//Network Timeout
					singleLoadType = 2;
					reloadSingleMemoryUsed();
					setTimeout(reloadStartTime, settings.reloadTime);
					return;
				}
				if(jqXHR.readyState != 4){
					//Network Error
					singleLoadType = 3;
					reloadSingleMemoryUsed();
					setTimeout(reloadStartTime, settings.reloadTime);
					return;
				}
				//Network Error
				singleLoadType = 3;
				reloadSingleMemoryUsed();
				setTimeout(reloadStartTime, settings.reloadTime);
				reloadOption = true;
			},
			xhr: function() {
				var xhr = new XMLHttpRequest();
				var q = 0;
				xhr.addEventListener('progress', function (e) {
					 console.log(toMemoryInfo(e.loaded), q);
					 singleMemoryUsed += (e.loaded - q);
					 reloadSingleMemoryUsed();
					 q = e.loaded;
				});
				return xhr;
			}
		});
	}
	setTimeout(reloadStartTime, 1500);
}
function loadSingleContestantAll(un, ci){
	var currLastTimeUpdate = singleLastTimeUpdate;
	var q = $(`<div class='popTip closed'></div>`);
	q.html(`<span info="tipInitializing">${languageOption.tip.tipInitializing}</span>`);
	$(".singleContent > div > div > .loadingInterface > div").append(q);
	setTimeout(function(){
		q.removeClass("closed");
	}, 300);
	var reloadIf = function(){
		if(currLastTimeUpdate != singleLastTimeUpdate)	return;
		singleLoadType = 1;
		reloadSingleMemoryUsed();
		$.ajax({
			url: "https://codeforces.com/api/contest.standings",
			type: "GET",
			timeout : settings.smallTimeLimit,
			data: {contestId: ci, from: 1, count: 1, showUnofficial: true},
			success: function(json){
				console.log(json);
				singleLoadType = 4;
				reloadSingleMemoryUsed();
				singleContestantMainTrack(currLastTimeUpdate, un, ci);
			},
			error: function(jqXHR, status, errorThrown){
				console.log(jqXHR, status, errorThrown);
				if(status == "timeout"){
					//Network Timeout
					singleLoadType = 2;
					reloadSingleMemoryUsed();
					setTimeout(reloadIf, settings.reloadTime);
					return;
				}
				if(jqXHR.readyState != 4){
					//Network Error
					singleLoadType = 3;
					reloadSingleMemoryUsed();
					setTimeout(reloadIf, settings.reloadTime);
					return;
				}
				var ec = jqXHR.responseJSON.comment;
				if(ec == `contestId: Contest with id ${ci} has not started`){
					singleLoadType = 4;
					reloadSingleMemoryUsed();
					singleContestantWaitToStart(currLastTimeUpdate, un, ci);
					return;
				}
				//Network Error
				singleLoadType = 3;
				reloadSingleMemoryUsed();
				setTimeout(reloadIf, settings.reloadTime);
				reloadOption = true;
			},
			xhr: function() {
				var xhr = new XMLHttpRequest();
				var q = 0;
				xhr.addEventListener('progress', function (e) {
					 console.log(toMemoryInfo(e.loaded), q);
					 singleMemoryUsed += (e.loaded - q);
					 reloadSingleMemoryUsed();
					 q = e.loaded;
				});
				return xhr;
			}
		});
	}
	reloadIf();
}





function singleVirtualWaitToStart(currLastTimeUpdate, un, ci, tm){
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > .popTip").addClass("closed").css("max-height", 0);
		$(".singleContent > div > div > .loadingInterface > div > i").css("opacity", 0);
	}, 300);
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > .popTip").remove();
	}, 800);
	var q, r;
	setTimeout(function(){
		$(".singleContent > div > div > .loadingInterface > div > i")
			.removeClass("fa-spin").removeClass("fa-sync-alt").addClass("fa-clock").css("opacity", 1);
		q = $(`<div class='popTip closed'></div>`);
		q.html(`<span info="tipContestNotStarted">${languageOption.tip.tipContestNotStarted}</span>`);
		$(".singleContent > div > div > .loadingInterface > div").append(q);
		r = $(`<div class='popTip closed small'></div>`);
		r.html(`<span info="tipHaveARest">${languageOption.tip.tipHaveARest}</span>`);
		$(".singleContent > div > div > .loadingInterface > div").append(r);
	}, 900);
	setTimeout(function(){
		q.removeClass("closed");
	}, 1100);
	setTimeout(function(){
		r.removeClass("closed");
	}, 1350);
	var startTime = tm;
	var u;
	var reloadTimeCount = function(){
		if(startTime <= (new Date()).getTime()){
			singleVirtualMainTrack(currLastTimeUpdate, un, ci, tm);
			return;
		}
		q.html(`<span info="tipContestStartIn" argv='["${getTimeLength2(startTime - (new Date()).getTime())}"]'>${languageOption.tip.tipContestStartIn.format(getTimeLength2(startTime - (new Date()).getTime()))}</span>`);
		u = setTimeout(reloadTimeCount, 500);
	}
	var reloadMonitor = function(){
		q.css("opacity", 0);
		setTimeout(function(){
			if(u)	killTimeout(u);
			q.html(`<span info="tipContestStartIn">${languageOption.tip.tipContestStartIn.format(getTimeLength2(startTime - (new Date()).getTime()))}</span>`);
			q.css("opacity", 1); u = reloadTimeCount();
		}, 500)
	}
	setTimeout(reloadMonitor, 2500);
}

function loadSingleVirtualAll(un, ci, tm){
	var currLastTimeUpdate = singleLastTimeUpdate;
	var q = $(`<div class='popTip closed'></div>`);
	q.html(`<span info="tipInitializing">${languageOption.tip.tipInitializing}</span>`);
	$(".singleContent > div > div > .loadingInterface > div").append(q);
	r = $(`<div class='popTip closed small'></div>`);
	r.html(`<span info="tipFetchingStandings">${languageOption.tip.tipFetchingStandings}</span>`);
	$(".singleContent > div > div > .loadingInterface > div").append(r);
	setTimeout(function(){
		q.removeClass("closed");
	}, 500);
	setTimeout(function(){
		r.removeClass("closed");
	}, 750);
	var reloadIf = function(U, D, C){
		if(currLastTimeUpdate != singleLastTimeUpdate)	return;
		singleLoadType = 1;
		reloadSingleMemoryUsed();
		$.ajax({
			url: U,
			type: "GET",
			data: D,
			success: C,
			error: function(jqXHR, status, errorThrown){
				console.log(jqXHR, status, errorThrown);
				if(status == "timeout"){
					//Network Timeout
					singleLoadType = 2;
					reloadSingleMemoryUsed();
					setTimeout(function(){reloadIf(U, D, C)}, settings.reloadTime);
					return;
				}
				if(jqXHR.readyState != 4){
					//Network Error
					singleLoadType = 3;
					reloadSingleMemoryUsed();
					setTimeout(function(){reloadIf(U, D, C)}, settings.reloadTime);
					return;
				}
				//Network Error
				singleLoadType = 3;
				reloadSingleMemoryUsed();
				setTimeout(function(){reloadIf(U, D, C)}, settings.reloadTime);
				reloadOption = true;
			},
			xhr: function() {
				var xhr = new XMLHttpRequest();
				var q = 0;
				xhr.addEventListener('progress', function (e) {
					 console.log(toMemoryInfo(e.loaded), q);
					 singleMemoryUsed += (e.loaded - q);
					 reloadSingleMemoryUsed();
					 q = e.loaded;
				});
				return xhr;
			}
		});
	}
	reloadIf("https://codeforces.com/api/contest.standings"
		, {contestId: ci, showUnofficial: true}, function(json){
		console.log(json);
		contestStandingList = json.result;
		singleLoadType = 4;
		reloadSingleMemoryUsed();
		r.addClass("closed");
		setTimeout(function(){
			r.html(`<span info="tipFetchingHacks">${languageOption.tip.tipFetchingHacks}</span>`);
			r.removeClass("closed");
			reloadIf("https://codeforces.com/api/contest.hacks"
				, {contestId: ci}, function(json){
				console.log(json);
				singleLoadType = 4;
				reloadSingleMemoryUsed();
				contestHacks = hlMask(json.result);
				if(tm.getTime() <= (new Date()).getTime())
					singleVirtualMainTrack(currLastTimeUpdate, un, ci, tm);
				else
					singleVirtualWaitToStart(currLastTimeUpdate, un, ci, tm);
			});
		}, 500);
	},);
}







function loadSingleInformation(type, un, ci, tm, started){
	singleLastTimeUpdate = new Date();
	console.log(type, un, ci, tm, started);
	$(".contentRowInfo").eq(0).css("left", "-620px");
	$(".singleTypeChosen").removeClass("singleTypeChosen");
	initSinglePage();
	if(type == 0)	loadSingleContestantAll(un, ci);
	else
		loadSingleVirtualAll(un, ci, tm);
}
function verifySingleInformation(type, un, ci, tm){
	var forButton = "." + (type == 0 ? "singleContestantButton" : "singleVirtualButton");
	$(forButton).html(`<i class="fas fa-spin fa-sync-alt"></i><span info="singleCheckExist">${languageOption.general.singleCheckExist}</span>`);
	$(forButton).attr("disabled", true);
	$.ajax({
		url: "https://codeforces.com/api/user.info",
		type: "GET",
		timeout : settings.smallTimeLimit,
		data: {handles: un},
		success: function(json){
			console.log(json);
			var isGym = Number(ci) >= 100000;
			$.ajax({
				url: "https://codeforces.com/api/contest.standings",
				type: "GET",
				timeout : settings.smallTimeLimit,
				data: {contestId: ci, handles: un, showUnofficial: true},
				success: function(json){
					json = json.result;
					if(type == 0){
						if(json.contest.phase == "CODING"){
							$(forButton).html(`<i class="fas fa-check"></i><span info="alertLoadSuccess">${languageOption.general.alertLoadSuccess}</span>`);
							$(forButton).removeClass("primaryColor").addClass("successColor").attr("disabled", true);
							setTimeout(function(){
								$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
								$(forButton).addClass("primaryColor").removeClass("successColor").attr("disabled", false);
								loadSingleInformation(type, un, ci, tm, true);
							}, 1000);
							return;
						}
						for(var i=0; i<json.rows.length; i++)
							if(json.rows[i].party.participantType == "CONTESTANT" || json.rows[i].party.participantType == "OUT_OF_COMPETITION"){
								$(forButton).html(`<i class="fas fa-check"></i><span info="alertLoadSuccess">${languageOption.general.alertLoadSuccess}</span>`);
								$(forButton).removeClass("primaryColor").addClass("successColor").attr("disabled", true);
								setTimeout(function(){
									$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
									$(forButton).addClass("primaryColor").removeClass("successColor").attr("disabled", false);
									loadSingleInformation(type, un, ci, tm, true);
								}, 1000);
								return;
							}
						$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorNotInTheContest">${languageOption.error.errorNotInTheContest}</span>`);
						$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
						setTimeout(function(){
							$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
							$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
						}, 1000);
					}
					if(type == 1){
						if(tm == "auto"){
							for(var i=json.rows.length-1; i>=0; i--)
								if(json.rows[i].party.participantType == "VIRTUAL"){
									$(forButton).html(`<i class="fas fa-check"></i><span info="alertLoadSuccess">${languageOption.general.alertLoadSuccess}</span>`);
									$(forButton).removeClass("primaryColor").addClass("successColor").attr("disabled", true);
									setTimeout(function(){
										$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
										$(forButton).addClass("primaryColor").removeClass("successColor").attr("disabled", false);
										loadSingleInformation(type, un, ci, new Date(json.rows[i].party.startTimeSeconds * 1000), true);
									}, 1000);
									return;
								}
							$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorVirtualInfoNotFound">${languageOption.error.errorVirtualInfoNotFound}</span>`);
							$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
							setTimeout(function(){
								$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
								$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
							}, 1000);
							return;
						}
						for(var i=json.rows.length-1; i>=0; i--)
							if(json.rows[i].party.participantType == "VIRTUAL" && tm.getTime() == json.rows[i].party.startTimeSeconds * 1000){
								$(forButton).html(`<i class="fas fa-check"></i><span info="alertLoadSuccess">${languageOption.general.alertLoadSuccess}</span>`);
								$(forButton).removeClass("primaryColor").addClass("successColor").attr("disabled", true);
								setTimeout(function(){
									$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
									$(forButton).addClass("primaryColor").removeClass("successColor").attr("disabled", false);
									loadSingleInformation(type, un, ci, new Date(json.rows[i].party.startTimeSeconds * 1000), true);
								}, 1000);
								return;
							}
						if(tm.getTime() + json.contest.durationSeconds * 1000 < (new Date()).getTime()){
							$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorVirtualInfoNotFound">${languageOption.error.errorVirtualInfoNotFound}</span>`);
							$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
							setTimeout(function(){
								$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
								$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
							}, 1000);
							return;
						}
						$(forButton).html(`<i class="fas fa-check"></i><span info="alertLoadSuccess">${languageOption.general.alertLoadSuccess}</span>`);
						$(forButton).removeClass("primaryColor").addClass("successColor").attr("disabled", true);
						setTimeout(function(){
							$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
							$(forButton).addClass("primaryColor").removeClass("successColor").attr("disabled", false);
							loadSingleInformation(type, un, ci, tm, true);
						}, 1000);
						return;
					}
					return;
				},
				error: function(jqXHR, status, errorThrown){
					console.log(jqXHR, status, errorThrown);
					if(status == "timeout"){
						$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorLoadTimeout">${languageOption.error.errorLoadTimeout}</span>`);
						$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
						setTimeout(function(){
							$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
							$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
						}, 1000);
						return;
					}
					if(jqXHR.readyState != 4){
						$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorNetworkError">${languageOption.error.errorNetworkError}</span>`);
						$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
						setTimeout(function(){
							$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
							$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
						}, 1000);
						return;
					}
					var ec = jqXHR.responseJSON.comment;
					if(type == 0 && ec == `contestId: Contest with id ${ci} has not started`){
						$(forButton).html(`<i class="fas fa-check"></i><span info="alertLoadSuccess">${languageOption.general.alertLoadSuccess}</span>`);
						$(forButton).removeClass("primaryColor").addClass("successColor").attr("disabled", true);
						setTimeout(function(){
							$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
							$(forButton).addClass("primaryColor").removeClass("successColor").attr("disabled", false);
							loadSingleInformation(type, un, ci, tm, false);
						}, 1000);
						return;
					}
					if(type == 0){
						$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorContestNotFound">${languageOption.error.errorContestNotFound}</span>`);
						$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
						setTimeout(function(){
							$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
							$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
						}, 1000);
					}
					else{
						$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorContestNotStarted">${languageOption.error.errorContestNotStarted}</span>`);
						$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
						setTimeout(function(){
							$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
							$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
						}, 1000);
					}
				},
				xhr: function() {
						var xhr = new XMLHttpRequest();
						xhr.addEventListener('progress', function (e) {
							 console.log(toMemoryInfo(e.loaded));
						});
						return xhr;
				  }
			 });
		},
		error: function(jqXHR, status, errorThrown){
			console.log(jqXHR, status, errorThrown);
			if(status == "timeout"){
				$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorLoadTimeout">${languageOption.error.errorLoadTimeout}</span>`);
				$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
				setTimeout(function(){
					$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
					$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
				}, 1000);
				return;
			}
			if(jqXHR.readyState != 4){
				$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorNetworkError">${languageOption.error.errorNetworkError}</span>`);
				$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
				setTimeout(function(){
					$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
					$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
				}, 1000);
				return;
			}
			$(forButton).html(`<i class="fas fa-exclamation-triangle"></i><span info="errorUserNotFound">${languageOption.error.errorUserNotFound}</span>`);
			$(forButton).removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
			setTimeout(function(){
				$(forButton).html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
				$(forButton).addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
			}, 1000);
		},
		xhr: function() {
				var xhr = new XMLHttpRequest();
				xhr.addEventListener('progress', function (e) {
					 console.log(toMemoryInfo(e.loaded));
				});
				return xhr;
		  }
	 });
}

var queryUsrename = /^[a-zA-Z0-9_.-]*$/;
var queryNumber = /^[0-9]+$/;
var queryTime = new RegExp("^([0-9]{4,4})/([0-9]{1,2})/([0-9]{1,2})\\s([0-9]{1,2}):([0-9]{1,2})$");
$(".singleContestantButton").click(function(){
	singleLastTimeUpdate = new Date();
	var un = $(".singleContestantUsernameInput").val();
	if(un.length < 3 || un.length > 24 || !queryUsrename.test(un)){
		$(".singleContestantButton").html(`<i class="fas fa-exclamation-triangle"></i><span info="errorUsernameError">${languageOption.error.errorUsernameError}</span>`);
		$(".singleContestantButton").removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
		setTimeout(function(){
			$(".singleContestantButton").html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
			$(".singleContestantButton").addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
		}, 1000);
		return;
	}
	var ci = $(".singleContestantContestIdInput").val();
	if(!queryNumber.test(ci)){
		$(".singleContestantButton").html(`<i class="fas fa-exclamation-triangle"></i><span info="errorContestIdError">${languageOption.error.errorContestIdError}</span>`);
		$(".singleContestantButton").removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
		setTimeout(function(){
			$(".singleContestantButton").html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
			$(".singleContestantButton").addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
		}, 1000);
		return;
	}
	verifySingleInformation(0, un, ci, Date(0));
})
function isLoopYear(x) {
	return (new Date(x, 1, 29).getDate() == 29);
}
$(".singleVirtualButton").click(function(){
	singleLastTimeUpdate = new Date();
	var un = $(".singleVirtualUsernameInput").val();
	if(un.length < 3 || un.length > 24 || !queryUsrename.test(un)){
		$(".singleVirtualButton").html(`<i class="fas fa-exclamation-triangle"></i><span info="errorUsernameError">${languageOption.error.errorUsernameError}</span>`);
		$(".singleVirtualButton").removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
		setTimeout(function(){
			$(".singleVirtualButton").html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
			$(".singleVirtualButton").addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
		}, 1000);
		return;
	}
	var ci = $(".singleVirtualContestIdInput").val();
	if(!queryNumber.test(ci)){
		$(".singleVirtualButton").html(`<i class="fas fa-exclamation-triangle"></i><span info="errorContestIdError">${languageOption.error.errorContestIdError}</span>`);
		$(".singleVirtualButton").removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
		setTimeout(function(){
			$(".singleVirtualButton").html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
			$(".singleVirtualButton").addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
		}, 1000);
		return;
	}
	var q1 = $(".singleVirtualTimeInput").val();
	if(q1 == "auto"){
		verifySingleInformation(1, un, ci, q1);
		return;
	}
	q1 = queryTime.exec(q1);
	console.log(q1);
	if(q1 == null){
		$(".singleVirtualButton").html(`<i class="fas fa-exclamation-triangle"></i><span info="errorTimeFormatError">${languageOption.error.errorTimeFormatError}</span>`);
		$(".singleVirtualButton").removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
		setTimeout(function(){
			$(".singleVirtualButton").html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
			$(".singleVirtualButton").addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
		}, 1000);
		return;
	}
	var q = [parseInt(q1[1], 10), parseInt(q1[2], 10), parseInt(q1[3], 10), parseInt(q1[4], 10), parseInt(q1[5], 10)];
	var d = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(isLoopYear(q[0]))	++d[2];
	var flg = true;
	if(q[1] < 1 || q[1] > 12 || d[q[1]] < q[2] || q[2] < 1)
		flg = false;
	if(q[3] == 24 && q[4] != 0)	flg = false;
	if(q[3] != 24 && (q[3] < 0 || q[4] < 0 || q[4] >= 60))	flg = false;
	if(!flg){
		$(".singleVirtualButton").html(`<i class="fas fa-exclamation-triangle"></i><span info="errorTimeFormatError">${languageOption.error.errorTimeFormatError}</span>`);
		$(".singleVirtualButton").removeClass("primaryColor").addClass("dangerColor").attr("disabled", true);
		setTimeout(function(){
			$(".singleVirtualButton").html(`<i class="fas fa-paper-plane"></i><span info="singleContestantButton">${languageOption.general.singleContestantButton}</span>`);
			$(".singleVirtualButton").addClass("primaryColor").removeClass("dangerColor").attr("disabled", false);
		}, 1000);
		return;
	}
	verifySingleInformation(1, un, ci, new Date(q[0], q[1]-1, q[2], q[3], q[4]));
})

var foldSingleRank, foldSingleProblem;
var foldButtonLocker;
$(".singleRankButton").click(function(){
	if(foldButtonLocker)	return;
	foldButtonLocker = true;
	if(foldSingleRank){
		$(".blockManager").css("width", "");
		$(".singleRankButton > i").removeClass("fa-angle-left").addClass("fa-angle-right");
	}
	else{
		$(".singleRankGraphDisplayer").css("width", "calc(100% - 10px)");
		$(".singleProblemDisplayer").css("width", "0px");
		$(".singleRankButton > i").removeClass("fa-angle-right").addClass("fa-angle-left");
	}
	foldSingleRank = !foldSingleRank;
	setTimeout(function(){foldButtonLocker = false;}, 200);
});
$(".singleProblemButton").click(function(){
	if(foldButtonLocker)	return;
	foldButtonLocker = true;
	if(foldSingleProblem){
		$(".blockManager").css("width", "");
		$(".singleProblemButton > i").removeClass("fa-angle-right").addClass("fa-angle-left");
	}
	else{
		$(".singleProblemDisplayer").css("width", "calc(100% - 10px)");
		$(".singleRankGraphDisplayer").css("width", "0px");
		$(".singleProblemButton > i").removeClass("fa-angle-left").addClass("fa-angle-right");
	}
	foldSingleProblem = !foldSingleProblem;
	setTimeout(function(){foldButtonLocker = false;}, 200);
});
$(".singleParticipateTypeContainer > div > div").click(function(){
	$(".singleParticipateTypeContainer > div > .selectButton.selected").removeClass("selected");
	$(this).addClass("selected");
	contestRankChosen = Number($(this).attr("for"));
	flushRankDisplayer();
})
$(".singleProblemlistTypeContainer > div > div").click(function(){
	$(".singleProblemlistTypeContainer > div > .selectButton.selected").removeClass("selected");
	$(this).addClass("selected");
	$(".singleProblemlistDisplayer > div").addClass("closed");
	$(".singleProblemlistDisplayer > div").eq(Number($(this).attr("for"))).removeClass("closed");
})



function openURL(x){
	if(RunInNwjs)
		nw.Shell.openExternal(x);
	else
		window.open(x);
}
var timeLoader, ifInObserve;
$(".singleHeadBack > span").mousedown(function(e){
	console.log("YES!!");
	$(".singleHeadBackProgress").addClass("selected");
	timeStart = new Date();
	ifInObserve = true;
	var x = e.clientX;
	var y = e.clientY;
	$(".singleHeadBackProgress").css("top", y).css("left", x);
 	window.onmousemove = function(evt){
		var x = evt.clientX;
		var y = evt.clientY;
		$(".singleHeadBackProgress").css("top", y).css("left", x);
	}
	timeLoader = setInterval(function(){
		timeEnd = new Date();
		if(timeEnd.getTime() - timeStart.getTime() > 600){
			clearInterval(timeLoader);
			$(".singleContent > div").css("left", "0px");
			$(".singleHeadBackProgress").removeClass("selected");
			$("body").attr("onmouseup", "");
			ifInObserve = false;
			singleLastTimeUpdate = new Date();
			setTimeout(function(){
				if(!ifInObserve)	window.onmousemove = function(){}
			}, 300);
		}
	},100);
	$("body").attr("onmouseup", "singleButtonMouseUp()");
});
function singleButtonMouseUp(){
	 clearInterval(timeLoader);
	 console.log("NO!!");
	 ifInObserve = false;
	 $("body").attr("onmouseup", "");
	 $(".singleHeadBackProgress").removeClass("selected");
	 setTimeout(function(){
		if(!ifInObserve)	window.onmousemove = function(){}
	}, 300);
}