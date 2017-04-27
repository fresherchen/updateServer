# Points and badges test cases readme

Tips: Use newman cli to run those test cases, remember to add localhost.newman_environment, '--delay-request' params and the delay time(10000).

## Test cases 1 "exercise":

```
clear data
post 0 /resetData

	input : {
	    type: exercise
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!"); 
	}

get 1 /exercises

	input : {}
	output: {
	  "returnRes": {
	    all exercises
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody.recommended.exercises.length > 0"] = jsonData.recommended.exercises.length > 0;
	}

1...7
put x /exercises

	input :{
	    increment_exercise_ids: [exercise.id]
	}
	output:{
	  "returnRes": {
	    "results": "You're doing great, keep it up!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'You're doing great, keep it up!'"] = responseBody.has("You're doing great, keep it up!"); 
	}

get 1st /badges:
 
	input:{}
	output:
	[
	  {
	    "badges": [
	      {
	        "badgeTitle": "Exercise Mover and Shaker",
	        "date": "Jul 3rd",
	        "badgeDescription": "Earn badges for recording your exercises consistently",
	        "badge_image_url": "https://assets-cdn.clarifyhealth.com/CHS_Badge_Mover&Shaker.png",
	        "level": "Earned",
	        "type": "streakBadge"
	      }
	    ],
	    "level": "Badges"
	  },
	  {
	    "badges": [
	      {
	        "badgeTitle": "Exercise Amateur Athlete",
	        "date": "",
	        "badgeDescription": "Earn badges for recording your exercises consistently",
	        "badge_image_url": "https://assets-cdn.clarifyhealth.com/CHS_Badge_Limber.png",
	        "level": "Unearned",
	        "type": "streakBadge"
	      },
	      {
	        "badgeTitle": "Exercise Professional Athlete",
	        "date": "",
	        "badgeDescription": "Earn badges for recording your exercises consistently",
	        "badge_image_url": "https://assets-cdn.clarifyhealth.com/CHS_Badge_Athletic.png",
	        "level": "Unearned",
	        "type": "streakBadge"
	      },
	      {
	        "badgeTitle": "Exercise Fit",
	        "date": "",
	        "badgeDescription": "Earn badges for recording your exercises consistently",
	        "badge_image_url": "https://assets-cdn.clarifyhealth.com/CHS_Badge_Fit.png",
	        "level": "Unearned",
	        "type": "instanceBadge"
	      },
	      {
	        "badgeTitle": "Exercise Olympian",
	        "date": "",
	        "badgeDescription": "Earn badges for recording your exercises consistently",
	        "badge_image_url": "https://assets-cdn.clarifyhealth.com/CHS_Badge_Olympian.png",
	        "level": "Unearned",
	        "type": "instanceBadge"
	      }
	    ],
	    "level": "Unearned Badges"
	  }
	]
	testcase: {
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level1;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	                for (var j in jsonData[i].badges) {
	                    if (jsonData[i].badges[j].badgeTitle) {
	                        if (jsonData[i].badges[j].badgeTitle === 'Exercise Mover and Shaker'){
	                            level1 = jsonData[i].badges[j].level;
	                        }
	                    }
	                }
	            }
	        }
	    }
	    tests["'Exercise Mover and Shaker' badge is earned"] = level1 === 'Earned';
	}

8...14
put x /exercises

get 2nd /badges

	testcase: {
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level2;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	                for (var j in jsonData[i].badges) {
	                    if (jsonData[i].badges[j].badgeTitle) {
	                        if (jsonData[i].badges[j].badgeTitle === 'Exercise Amateur Athlete') {
	                           level2 = jsonData[i].badges[j].level;
	                        }
	                    }
	                }
	            }
	        }
	    }
	    tests["'Exercise Amateur Athlete' badge is earned"] = level2 === 'Earned';
	}

15...21
put x /exercises

get 3rd /badges

	testcase: {
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level3;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	                for (var j in jsonData[i].badges) {
	                    if (jsonData[i].badges[j].badgeTitle) {
	                        if (jsonData[i].badges[j].badgeTitle === 'Exercise Professional Athlete') {
	                            level3 = jsonData[i].badges[j].level;
	                        }
	                    }
	                }
	            }
	        }
	    }
	    tests["'Exercise Professional Athlete' badge is earned"] = level3 === 'Earned';
	}

22...30
put x /exercises

get 4th /badges

	testcase: {
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level4;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	               for (var j in jsonData[i].badges) {
	                    if (jsonData[i].badges[j].badgeTitle) {
	                        if (jsonData[i].badges[j].badgeTitle === 'Exercise Fit') {
	                            level4 = jsonData[i].badges[j].level;
	                        }
	                    }
	                }
	            }
	        }
	    }
	    tests["'Exercise Fit' badge is earned"] = level4 === 'Earned';
	}

30...60
put x /exercises

get 5th /badges

	testcase: {
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level5;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	                for (var j in jsonData[i].badges) {
	                   if (jsonData[i].badges[j].badgeTitle) {
	                       if (jsonData[i].badges[j].badgeTitle === 'Exercise Olympian') {
	                            level5 = jsonData[i].badges[j].level;
	                        }
	                    }
	                }
	            }
	        }
	    }
	    tests["'Exercise Olympian' badge is earned"] = level5 === 'Earned';
	}

clear data
post 61 /resetData

	input: {
	    type: exercise,
	    status: 2
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase: {
	    tests["Status code is 200 "] = responseCode.code === 200; 
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!");
	}

```

## Test cases 2 "read":

```
clear data
post 0 /resetData

	input : {
	    type: read
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!"); 
	}

get 1 /user

	input : {}
	output: {
	  "returnRes": {
	    user info
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody.patientGuide is not undefined"] = jsonData.patientGuide !== undefined; 
	}

get 2 /guide

	input : {}
	output: {
	  "returnRes": {
	    guide info
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["subItemsIncludedInProgressCount = 33"] = ids2.length === 33;
	}


put 1 /patientGuideProgress

	input :{
		patientGuideProgress: {completedSubItems: completedSubItems,
						subItemsExcludedFromProgress: subItemsExcludedFromProgress,
						subItemsIncludedInProgressCompletedCount: subItemsIncludedInProgressCompletedCount,
						subItemsIncludedInProgressCount: subItemsIncludedInProgressCount
					}
	}
	output:{
	  "returnRes": {
	    "completedSubItems": [
	      "using_the_guide"
	    ],
	    "subItemsIncludedInProgressCompletedCount": 1,
	    "subItemsIncludedInProgressCount": 33
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    var jsonData = JSON.parse(responseBody);
	    tests["responseBody.subItemsIncludedInProgressCompletedCount is 1"] = jsonData.returnRes.subItemsIncludedInProgressCompletedCount === 1;
	}

get 1st points 
get /points

	input :{}
	output:{
	  "points": 10,
	  "history": [
	    {
	      "subtitle": "Jan 3rd - Jan 7th",
	      "title": "Week 1",
	      "items": [
	        {
	          "value": "+10",
	          "label": "Read Guide Section points"
	        }
	      ]
	    }
	  ]
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var readPoints = 0;
	    if (jsonData.history && jsonData.history.length) {
	        for (var i in jsonData.history) {
	            if (jsonData.history[i].items && jsonData.history[i].items.length) {
	                for (var j in jsonData.history[i].items) {
	                    if (jsonData.history[i].items[j].label === 'Read Guide Section points') {
	                        readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
	                    }
	                }
	            }
	        }
	    }
	    tests["Read Guide Section points is 10"] = readPoints === 10;
	}

2...33
put x /patientGuideProgress

	input :{
		patientGuideProgress: {completedSubItems: completedSubItems,
						subItemsExcludedFromProgress: subItemsExcludedFromProgress,
						subItemsIncludedInProgressCompletedCount: subItemsIncludedInProgressCompletedCount,
						subItemsIncludedInProgressCount: subItemsIncludedInProgressCount
					}
	}
	output:{
	  "returnRes": {
	    "completedSubItems": [
	      "xxx1",
	      "xxx2",
	      ...
	    ],
	    "subItemsIncludedInProgressCompletedCount": index,
	    "subItemsIncludedInProgressCount": allCount
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    var jsonData = JSON.parse(responseBody);
	    tests["responseBody.subItemsIncludedInProgressCompletedCount is index"] = jsonData.returnRes.subItemsIncludedInProgressCompletedCount === index;
	}

get 2nd /points

	input :{}
	output:{
	  "points": 106,
	  "history": [
	    {
	      "subtitle": "Jan 3rd - Jan 7th",
	      "title": "Week 1",
	      "items": [
	        {
	          "value": "+106",
	          "label": "Read Guide Section points"
	        }
	      ]
	    }
	  ]
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var readPoints = 0;
	    if (jsonData.history && jsonData.history.length) {
	        for (var i in jsonData.history) {
	            if (jsonData.history[i].items && jsonData.history[i].items.length) {
	                for (var j in jsonData.history[i].items) {
	                    if (jsonData.history[i].items[j].label === 'Read Guide Section points') {
	                        readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
	                    }
	                }
	            }
	        }
	    }
	    tests["Read Guide Section points is 106"] = readPoints === 106;
	}

get 3rd /badges

	input :{}
	output:[
	  {
	    "badges": [
	      {
	        "badgeTitle": "Patient Guide Graduate",
	        "date": "Aug 18th",
	        "badgeDescription": "You earned the Patient Guide Graduate badge for reading the entire guide!",
	        "badge_image_url": "https://assets-cdn.clarifyhealth.com/img/CHS_Badge_Graduate.png",
	        "level": "Earned",
	        "type": "instanceBadge"
	      }
	    ],
	    "level": "Badges"
	  }
	]
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	                for (var j in jsonData[i].badges) {
	                    if (jsonData[i].badges[j].badgeTitle && jsonData[i].badges[j].badgeTitle === 'Patient Guide Graduate'){
	                        level = jsonData[i].badges[j].level;
	                    }
	                }
	            }
	        }
	    }
	    tests["Patient Guide Graduate is earned"] = level === 'Earned';
	}

clear data
post 0 /resetData

	input : {
	    type: read,
	    status: 2
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!"); 
	}

```

## Test cases 3 "send":

```
clear data
post 0 /resetData

	input : {
	    type: send
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!");
	}


post 1 /messages

	input :{
	    text: 'Are you ok?'
	}
	output:{
	  "returnRes": {
	    "messageId": "f90705c0-1383-11e7-821e-c5781c0f76bd"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	}

get 1th /points

	input :{}
	output:{
	  "points": 10,
	  "history": [
	    {
	      "subtitle": "Jan 3rd - Jan 7th",
	      "title": "Week 1",
	      "items": [
	        {
	          "value": "+10",
	          "label": "Send Message Points"
	        }
	      ]
	    }
	  ]
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var readPoints = 0;
	    if (jsonData.history && jsonData.history.length) {
	        for (var i in jsonData.history) {
	            if (jsonData.history[i].items && jsonData.history[i].items.length) {
	                for (var j in jsonData.history[i].items) {
	                    if (jsonData.history[i].items[j].label === 'Send Message Points') {
	                        readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
	                    }
	                }
	            }
	        }
	    }
	    tests["Send Message Points is 10"] = readPoints === 10;
	}

clear data
post 2 /resetData

	input : {
	    type: send,
	    status: 2,
	    message: messageId
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!"); 
	}

```

## Test cases 4 "checkIn":

```
clear data
post 0 /resetData

	input : {
	    type: checkIn
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!");
	}

get 0 /user

	input : {}
	output: {
	  get endUser, including journeyId
	}
	testcase:{
	    tests["Status code is 200"] = responseCode.code === 200;
	    var jsonData = JSON.parse(responseBody);
	    var journeyId;
	    if (jsonData && jsonData.journeyId) {
	        journeyId = jsonData.journeyId;
	    }
	    postman.setEnvironmentVariable("journeyId", journeyId);
	}

get 0 /TaskDefinitions?filter[where][name]=Pre-op Check-In

	input : {
	    name: Pre-op Check-In
	}
	output: {
	  get TaskDefinitions by name
	}
	testcase:{
	    tests["Status code is 200"] = responseCode.code === 200;
	    var jsonData = JSON.parse(responseBody);
	    var journeyPathTaskId;
	    if (jsonData && jsonData.length) {
	        journeyPathTaskId = jsonData[0].id;
	    }
	    postman.setEnvironmentVariable("journeyPathTaskId", journeyPathTaskId);
	}

get 0 /JourneyPathTasks?filter[where][journeyId]={{journeyId}}&filter[where][taskDefinitionId]={{taskDefinitionId}}

	input : {
	    journeyId: journeyId
	    taskDefinitionId: taskDefinitionId
	}
	output: {
	  get JourneyPathTasks by journeyId and taskDefinitionId
	}
	testcase:{
	    tests["Status code is 200"] = responseCode.code === 200;
	    var jsonData = JSON.parse(responseBody);
	    var journeyPathTaskId;
	    if (jsonData && jsonData.length) {
	        journeyPathTaskId = jsonData[0].id;
	    }
	    postman.setEnvironmentVariable("journeyPathTaskId", journeyPathTaskId);
	}

post 1 /Tasks

	input : {
	    {journeyId: journeyId,
	    journeyPathTaskId: journeyPathTaskId,
	    taskDefinitionId: taskDefinitionId,
	    startDate: startDate,
	    endDate: endDate,
	    dueDate: dueDate,
	    status: "Active",
	    details: details}
	}
	output: {
	  create Tasks
	}
	testcase:{
	    tests["Status code is 200"] = responseCode.code === 200;
	    var jsonData = JSON.parse(responseBody);
	    var id;
	    if (jsonData.id) {
	        id = jsonData.id;
	    }
	    postman.setEnvironmentVariable("taskId1", id);
	}

get 1 /{{taskId1}}/survey

	input : {}
	output: {
	   get survey Tasks, including questions
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    if (jsonData && jsonData.questionnaires) {
	        if (jsonData.questionnaires.length) {
	            for (var i in jsonData.questionnaires) {
	                if (jsonData.questionnaires[i].type === "ten-slider") {
	                    postman.setEnvironmentVariable("questionId1", jsonData.questionnaires[i].id);
	                } else if (jsonData.questionnaires[i].type === "temperature") {
	                    postman.setEnvironmentVariable("questionId2", jsonData.questionnaires[i].id);
	                } else if (jsonData.questionnaires[i].type === "multiple-choice") {
	                    postman.setEnvironmentVariable("questionId3", jsonData.questionnaires[i].id);
	                }
	            }
	        }
	    }
	    tests["Status code is 200"] = responseCode.code === 200;
	    tests["responseBody.questionnaires.length > 0"] = jsonData.questionnaires.length > 0;
	}

post 1 /{{taskId1}}/survey

	input : {
	    {"answers": [{"id":questionId1,"value":4},
	    {"id":questionId2,"value":100}, {"id":questionId3,"value":["Motivated"]}]}
	}
	output: {
	   update survey Tasks
	}
	testcase:{
	    tests["Status code is 200"] = responseCode.code === 200;
	}

get 1 /JourneyMetrics?filter[where][taskId]={{taskId1}}

	input : {
		taskId: taskId
	}
	output: {
	   journeyMetric create by updating Tasks
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var journeyMetric1, journeyMetric2;
	    if (jsonData && jsonData.length && jsonData.length ===2) {
	        journeyMetric1 = jsonData[0].id;
	            journeyMetric2 = jsonData[1].id;
	    }
	    postman.setEnvironmentVariable("journeyMetric1", journeyMetric1);
	    postman.setEnvironmentVariable("journeyMetric2", journeyMetric2);
	}

delete 1st /JourneyMetrics/{{journeyMetric1}}

	input : {}
	output: {
	   journeyMetric create by updating Tasks
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	}

delete 2nd /JourneyMetrics/{{journeyMetric2}}

	input : {}
	output: {
	   journeyMetric create by updating Tasks
	}
	testcase:{
	    tests["Status code is 200"] = responseCode.code === 200;
	}

delete 1 /tasks/{{taskId1}}

	input : {}
	output: {
	   journeyMetric create by updating Tasks
	}
	testcase:{
	    tests["Status code is 200"] = responseCode.code === 200;
	}

2...10
post /createTask, get /survey, post /survey, get /journeyMetric, delete /journeyMetric1, ..., delete /tasks

get 3rd /badges

	input : {}
	output: {
	  "earned_points": {
	    "text": "You completed your checkin and earned xxx points.",
	    "points": xxx,
	    "total": xxx
	  }
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level1;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	                for (var j in jsonData[i].badges) {
	                    if (jsonData[i].badges[j].badgeTitle) {
	                        if (jsonData[i].badges[j].badgeTitle === 'Check-in Dedicated badge') {
	                            level1 = jsonData[i].badges[j].level;
	                        }
	                    }
	                }
	            }
	        }
	    }
	    tests["'Check-in Dedicated badge' is earned"] = level1 === 'Earned';
	}

get 4th /points

post 11 /resetData


```

## Test cases 5 "login":

```
clear data
post 0 /resetData

	input : {
	    type: login
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!");
	}

1...7
get x /user

	input : {}
	output: {
	  "returnRes": {
	    "results": "Login successful, user is not undefined!"
	  }
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    var userId;
	    if (jsonData && jsonData.user_uid) {
	        userId = jsonData.user_uid;
	    }

	    tests["Status code is 200"] = responseCode.code === 200;
	    tests["Login successful, user is not undefined!"] = userId !== undefined;
	}

get 1th /points

	input :{}
	output:{
	  "points": 10,
	  "history": [
	    {
	      "subtitle": "Jan 3rd - Jan 7th",
	      "title": "Week 1",
	      "items": [
	        {
	          "value": "+19",
	          "label": "Login Points"
	        }
	      ]
	    }
	  ]
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var readPoints = 0;
	    if (jsonData.history && jsonData.history.length) {
	        for (var i in jsonData.history) {
	            if (jsonData.history[i].items && jsonData.history[i].items.length) {
	                for (var j in jsonData.history[i].items) {
	                    if (jsonData.history[i].items[j].label === 'Login Points') {
	                        readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
	                    }
	                }
	            }
	        }
	    }
	    tests["Login Points is 19"] = readPoints === 19;
	}

get 2th /badges

	input :{}
	output:[
	  {
	    "badges": [
	      {
	        "badgeTitle": "Login Dedicated badge",
	        "date": "Aug 18th",
	        "badgeDescription": "Earn badges for logging in consistently",
	        "badge_image_url": "https://assets-cdn.clarifyhealth.com/img/CHS_Badge_Dedicated.png",
	        "level": "Earned",
	        "type": "instanceBadge"
	      }
	    ],
	    "level": "Badges"
	  }
	]
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	                for (var j in jsonData[i].badges) {
	                    if (jsonData[i].badges[j].badgeTitle && jsonData[i].badges[j].badgeTitle === 'Login Dedicated badge'){
	                        level = jsonData[i].badges[j].level;
	                    }
	                }
	            }
	        }
	    }
	    tests["Login Dedicated badge is earned"] = level === 'Earned';
	}

8...30
get x /user ...

get 3rd /points

	input: {}
	output:{
	  "points": 10,
	  "history": [
	    {
	      "subtitle": "Jan 3rd - Jan 7th",
	      "title": "Week 1",
	      "items": [
	        {
	          "value": "+134",
	          "label": "Login Points"
	        }
	      ]
	    }
	  ]
	}
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var readPoints = 0;
	    if (jsonData.history && jsonData.history.length) {
	        for (var i in jsonData.history) {
	            if (jsonData.history[i].items && jsonData.history[i].items.length) {
	                for (var j in jsonData.history[i].items) {
	                    if (jsonData.history[i].items[j].label === 'Login Points') {
	                        readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
	                    }
	                }
	            }
	        }
	    }
	    tests["Login Points is 134"] = readPoints === 134;
	}

get 4rd /badges

	input: {}
	output:[
	  {
	    "badges": [
	      {
	        "badgeTitle": "Login Dedicated badge",
	        "date": "Aug 18th",
	        "badgeDescription": "Earn badges for logging in consistently",
	        "badge_image_url": "https://assets-cdn.clarifyhealth.com/img/CHS_Badge_Dedicated.png",
	        "level": "Earned",
	        "type": "instanceBadge"
	      }
	    ],
	    "level": "Badges"
	  }
	]
	testcase:{
	    var jsonData = JSON.parse(responseBody);
	    tests["Status code is 200"] = responseCode.code === 200;
	    var level;
	    if (jsonData && jsonData.length) {
	        for (var i in jsonData) {
	            if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
	                for (var j in jsonData[i].badges) {
	                    if (jsonData[i].badges[j].badgeTitle && jsonData[i].badges[j].badgeTitle === 'Login Devoted badge'){
	                        level = jsonData[i].badges[j].level;
	                    }
	                }
	            }
	        }
	    }
	    tests["Login Devoted badge is earned"] = level === 'Earned';
	}

clear data
post 0 /resetData

	input: {
	    type: login,
	    status: 2
	}
	output: {
	  "returnRes": {
	    "results": "Okey, resetData successfully!"
	  }
	}
	testcase:{
	    tests["Status code is 200 "] = responseCode.code === 200;
	    tests["responseBody is 'Okey, resetData successfully!'"] = responseBody.has("Okey, resetData successfully!"); 
	}

```

## Test cases 6 "assessment":

Same to "checkIn"

## Test cases 7 "feedback":

Same to "checkIn"
