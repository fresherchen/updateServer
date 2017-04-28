# Test cases readme of points and badges

Tips: Use newman cli to run those test cases, remember to add localhost.newman_environment, '--delay-request' params and the delay time(10000).

## Test cases 1 ---"exercise":

```
clear 0 data
post /resetData

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

get 0 exercises
get /exercises

    input : {}
    output: {
      "returnRes": {
        all exercises
      }
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        if (jsonData.recommended.exercises && jsonData.recommended.exercises.length) {
            postman.setEnvironmentVariable(\"exercise.id\", jsonData.recommended.exercises[0].id);
        }
        tests[\"Status code is 200\"] = responseCode.code === 200;
        tests[\"responseBody.recommended.exercises.length > 0\"] = jsonData.recommended.exercises.length > 0;
    }

update 1...7 exercises
put /exercises

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

get 1st badges
get /badges
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

update 8...14 exercises
put /exercises

    same as 'update 1...7 exercises'

get 2nd badges
get /badges

    input:{}
    output: {
        'Exercise Mover and Shaker' and 'Exercise Amateur Athlete' are earned, the other are not.
    }
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

update 15...21 exercises
put /exercises

    same as 'update 1...7 exercises'

get 3rd badges
get /badges

    input:{}
    output: {
        'Exercise Mover and Shaker', 'Exercise Amateur Athlete' and 'Exercise Professional Athlete' are earned, the other are not.
    }
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

update 22...30 exercises
put /exercises

    same as 'update 1...7 exercises'

get 4th badges
get /badges

    input:{}
    output: {
        'Exercise Mover and Shaker', 'Exercise Amateur Athlete', 'Exercise Professional Athlete' and 'Exercise Fit' are earned, the other are not.
    }
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

update 30...60 exercises
put /exercises

    same as 'update 1...7 exercises '

get 5th badges
get /badges

    input:{}
    output: {
        'Exercise Mover and Shaker', 'Exercise Amateur Athlete', 'Exercise Professional Athlete', 'Exercise Fit', 'Exercise Olympian' are all earned.
    }
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

clear 61 data
post /resetData

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

## Test cases 2 ---"read":

```
clear 0 data
post /resetData

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

get 0 user
get /user

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

get 0 guide
get /guide

    input : {}
    output: {
      "returnRes": {
        guide info
      }
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        if (jsonData.patientGuide) {
            postman.setEnvironmentVariable(\"guide.patientGuide\", jsonData.patientGuide);
        }
        tests[\"Status code is 200\"] = responseCode.code === 200;
        tests[\"responseBody.patientGuide is not undefined\"] = jsonData.patientGuide !== undefined;
    }

update 1 patientGuideProgress
put /patientGuideProgress

    input :{
        patientGuideProgress: { completedSubItems: completedSubItems,
            subItemsExcludedFromProgress: subItemsExcludedFromProgress,
            subItemsIncludedInProgressCompletedCount: subItemsIncludedInProgressCompletedCount,
            subItemsIncludedInProgressCount: subItemsIncludedInProgressCount
        }
    }
    output:{
      "returnRes": {
        "completedSubItems": completedSubItems,
        "subItemsIncludedInProgressCompletedCount": subItemsIncludedInProgressCompletedCount,
        "subItemsIncludedInProgressCount": subItemsIncludedInProgressCount
      }
    }
    testcase:{
        tests["Status code is 200 "] = responseCode.code === 200;
        var jsonData = JSON.parse(responseBody);
        tests["responseBody.subItemsIncludedInProgressCompletedCount is subItemsIncludedInProgressCompletedCount"] = jsonData.returnRes.subItemsIncludedInProgressCompletedCount === subItemsIncludedInProgressCompletedCount;
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


update 2...33 patientGuideProgress
put /patientGuideProgress

    same as 'update 1 patientGuideProgress'

get 2nd points
get /points

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

get 3rd badges
get /badges

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

clear 0 data
post /resetData

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

## Test cases 3 ---"send":

```
clear 0 data
post /resetData

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

create 1 messages
post /messages

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
        var jsonData = JSON.parse(responseBody);
        var messageId;
        if (jsonData && jsonData.messageId) {
            messageId = jsonData.messageId;
        }
        postman.setEnvironmentVariable(\"messageId\", messageId);
    }

get 1th points
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

clear 2 data
post /resetData

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

## Test cases 4 ---"checkIn":

```
clear 0 data
post /resetData

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

get 0 endUser
get /user

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

get 0 TaskDefinitions
get /TaskDefinitions?filter[where][name]=Pre-op Check-In

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
            taskDefinitionId = jsonData[0].id;
        }
        postman.setEnvironmentVariable(\"taskDefinitionId\", taskDefinitionId);
    }

get 0 JourneyPathTasks
get /JourneyPathTasks?filter[where][journeyId]={{journeyId}}&filter[where][taskDefinitionId]={{taskDefinitionId}}

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

create 1 task
post /Tasks

    input : {
        { journeyId: journeyId,
        journeyPathTaskId: journeyPathTaskId,
        taskDefinitionId: taskDefinitionId,
        startDate: startDate,
        endDate: endDate,
        dueDate: dueDate,
        status: "Active",
        details: checkInDetails }
    }
    output: {
      create task about Check-In
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

get 1 task(survey) by id
get /{{taskId1}}/survey

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

update 1 task(survey) by id
post /{{taskId1}}/survey

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

get 1 JourneyMetrics by task id
get /JourneyMetrics?filter[where][taskId]={{taskId1}}

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

delete 1st JourneyMetrics by id
delete /JourneyMetrics/{{journeyMetric1}}

    input : {}
    output: {}
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

delete 2nd JourneyMetrics by id
delete /JourneyMetrics/{{journeyMetric2}}

    input : {}
    output: {}
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

delete 1 tasks by id
delete /tasks/{{taskId1}}

    input : {}
    output: {}
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

create 2...5 task and delete the task

    same as 'create 1 task'...

    create task
    post /Tasks,

    get task(survey) by id
    get /survey,

    update task(survey) by id
    post /survey,

    get JourneyMetrics by task id
    get /journeyMetric,

    delete JourneyMetrics by task id
    delete /journeyMetric1,
    ...,

    delete tasks by id
    delete /tasks


get 1st badges
get /badges

    input : {}
    output: {}
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

create 6...10 task and delete task

    same as 'create 1 task'...

    create task
    post /Tasks,

    get task(survey) by id
    get /survey,

    update task(survey) by id
    post /survey,

    get JourneyMetrics by task id
    get /journeyMetric,

    delete JourneyMetrics by task id
    delete /journeyMetric1,
    ...,

    delete tasks by id
    delete /tasks

    get 2nd points
    get /points

    input : {}
    output: {}
    testcase:{
        var jsonData = JSON.parse(responseBody);
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var readPoints = 0;
        if (jsonData.history && jsonData.history.length) {
            for (var i in jsonData.history) {
                if (jsonData.history[i].items && jsonData.history[i].items.length) {
                    for (var j in jsonData.history[i].items) {
                        if (jsonData.history[i].items[j].label === 'Check-in points') {
                            readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
                        }
                    }
                }
            }
        }
        tests[\"Check-in points is 375\"] = readPoints === 375;
    }

get 3rd badge
get /badges

    input : {}
    output: {}
    testcase:{
        var jsonData = JSON.parse(responseBody);
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var level1;
        if (jsonData && jsonData.length) {
            for (var i in jsonData) {
                if (jsonData[i].level === 'Badges' && jsonData[i].badges && jsonData[i].badges.length) {
                    for (var j in jsonData[i].badges) {
                        if (jsonData[i].badges[j].badgeTitle) {
                            if (jsonData[i].badges[j].badgeTitle === 'Check-in Reliable badge') {
                                level1 = jsonData[i].badges[j].level;
                            }
                        }
                    }
                }
            }
        }
        tests[\"'Check-in Reliable badge' is earned\"] = level1 === 'Earned';
    }

clear 11 data
post /resetData

    input : {
        type: checkIn,
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

## Test cases 5 ---"login":

```
clear 0 data
post /resetData

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

get 1...7 user
get /user

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

get 1th points
get /points

    input :{}
    output:{
      "points": 19,
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

get 2th badges
get /badges

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

get 8...30 user
get /user

    same as 'get 1...7 user'

get 3rd points
get /points

    input: {}
    output:{
      "points": 134,
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

get 4rd badges
get /badges

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

clear 0 data
post /resetData

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

## Test cases 6 ---"assessment":

```
clear 0 data
post /resetData

    input : {
        type: assessment
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

get 0 endUser
get /user

    input : {}
    output: {
        user object
    }
    testcase:{
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var jsonData = JSON.parse(responseBody);
        var journeyId;
        if (jsonData && jsonData.journeyId) {
            journeyId = jsonData.journeyId;
        }
        postman.setEnvironmentVariable(\"journeyId\", journeyId);
    }

get 0 taskDefinition
get /TaskDefinitions?filter[where][name]=Knee Assessment

    input : {
        name: Knee Assessment
    }
    output: {
        get taskDefinition by name
    }
    testcase:{
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var jsonData = JSON.parse(responseBody);
        var taskDefinitionId;
        if (jsonData && jsonData.length) {
            taskDefinitionId = jsonData[0].id;
        }
        postman.setEnvironmentVariable(\"taskDefinitionId\", taskDefinitionId);
    }

get 0 journeyPathTask
get /JourneyPathTasks?filter[where][journeyId]={{journeyId}}&filter[where][taskDefinitionId]={{taskDefinitionId}}

    input : {
        journeyId: journeyId,
        taskDefinitionId: taskDefinitionId,
    }
    output: {
        get JourneyPathTasks by journeyId and taskDefinitionId
    }
    testcase:{
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var jsonData = JSON.parse(responseBody);
        var journeyPathTaskId;
        if (jsonData && jsonData.length) {
            journeyPathTaskId = jsonData[0].id;
        }
        postman.setEnvironmentVariable(\"journeyPathTaskId\", journeyPathTaskId);
    }

create 1 task about assessment
post /Tasks

    input : {
        { journeyId: journeyId,
        journeyPathTaskId: journeyPathTaskId,
        taskDefinitionId: taskDefinitionId,
        startDate: startDate,
        endDate: endDate,
        dueDate: dueDate,
        status: "Active",
        details: assessmentDetails }
    }
    output: {
        create task
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

get 1 task(survey) by id
get /{{taskId1}}/survey

    input : {}
    output: {
        get survey Tasks, including questions
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        if (jsonData && jsonData.questionnaires) {
            if (jsonData.questionnaires.length) {
                for (var i in jsonData.questionnaires) {
                    if (jsonData.questionnaires[i].title === \"Stiffness\") {
                        postman.setEnvironmentVariable(\"questionId1\", jsonData.questionnaires[i].id);
                    } else if (jsonData.questionnaires[i].title === \"Pain during twisting/pivoting\") {
                        postman.setEnvironmentVariable(\"questionId2\", jsonData.questionnaires[i].id);
                    } else if (jsonData.questionnaires[i].title === \"Pain when straightening knee\") {
                        postman.setEnvironmentVariable(\"questionId3\", jsonData.questionnaires[i].id);
                    } else if (jsonData.questionnaires[i].title === \"Pain when going up or down stairs\") {
                        postman.setEnvironmentVariable(\"questionId4\", jsonData.questionnaires[i].id);
                    } else if (jsonData.questionnaires[i].title === \"Pain when standing upright\") {
                        postman.setEnvironmentVariable(\"questionId5\", jsonData.questionnaires[i].id);
                    } else if (jsonData.questionnaires[i].title === \"Pain when rising from sitting\") {
                        postman.setEnvironmentVariable(\"questionId6\", jsonData.questionnaires[i].id);
                    } else if (jsonData.questionnaires[i].title === \"Pain when bending to floor\") {
                        postman.setEnvironmentVariable(\"questionId7\", jsonData.questionnaires[i].id);
                    }
                }
            }
        }
        tests["Status code is 200"] = responseCode.code === 200;
        tests["responseBody.questionnaires.length > 0"] = jsonData.questionnaires.length > 0;
    }

update 1 task(survey) by id
post /{{taskId1}}/survey

    input : {
        {"answers": [{"id":questionId1,"value":4},
        {"id":questionId2,"value":4}, {"id":questionId3,"value":4},
        {"id":questionId4,"value":4}, {"id":questionId5,"value":4},
        {"id":questionId6,"value":4}, {"id":questionId7,"value":4}]}
    }
    output: {
        update survey Tasks
    }
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

get 1 JourneyMetrics by task id
get /JourneyMetrics?filter[where][taskId]={{taskId1}}

    input : {
        taskId: taskId
    }
    output: {
        journeyMetric create by updating Tasks
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        tests["Status code is 200"] = responseCode.code === 200;
        var journeyMetric1;
        if (jsonData && jsonData.length && jsonData.length ===1) {
            journeyMetric1 = jsonData[0].id;
        }
        postman.setEnvironmentVariable("journeyMetric1", journeyMetric1);
    }

delete 1st JourneyMetrics by id
delete /JourneyMetrics/{{journeyMetric1}}

    input : {}
    output: {}
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

delete 1 tasks by id
delete /tasks/{{taskId1}}

    input : {}
    output: {}
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

create 2...4 task and delete the task

    same as 'create 1 task'...

    create task
    post /Tasks,

    get task(survey) by id
    get /survey,

    update task(survey) by id
    post /survey,

    get JourneyMetrics by task id
    get /journeyMetric,

    delete JourneyMetrics by task id
    delete /journeyMetric1,
    ...,

    delete tasks by id
    delete /tasks

get 1st points
get /points

    input: {}
    output:{
      "points": 435,
      "history": [
        {
          "subtitle": "Jan 3rd - Jan 7th",
          "title": "Week 1",
          "items": [
            {
              "value": "+435",
              "label": "Assessment Points"
            }
          ]
        }
      ]
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var readPoints = 0;
        if (jsonData.history && jsonData.history.length) {
            for (var i in jsonData.history) {
                if (jsonData.history[i].items && jsonData.history[i].items.length) {
                    for (var j in jsonData.history[i].items) {
                        if (jsonData.history[i].items[j].label === 'Assessment points') {
                            readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
                        }
                    }
                }
            }
        }
        tests[\"Assessment points is 435\"] = readPoints === 435;
    }

create 5 task and delete the task

    same as 'create 1 task'...

    create task
    post /Tasks,

    get task(survey) by id
    get /survey,

    update task(survey) by id
    post /survey,

    get JourneyMetrics by task id
    get /journeyMetric,

    delete JourneyMetrics by task id
    delete /journeyMetric1,
    ...,

    delete tasks by id
    delete /tasks

get 2nd points
get /points

    input: {}
    output:{
        "points": 550,
        "history": [
            {
              "subtitle": "Jan 3rd - Jan 7th",
              "title": "Week 1",
              "items": [
                {
                  "value": "+550",
                  "label": "Assessment Points"
                }
              ]
            }
        ]
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var readPoints = 0;
        if (jsonData.history && jsonData.history.length) {
            for (var i in jsonData.history) {
                if (jsonData.history[i].items && jsonData.history[i].items.length) {
                    for (var j in jsonData.history[i].items) {
                        if (jsonData.history[i].items[j].label === 'Assessment points') {
                            readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
                        }
                    }
                }
            }
        }
        tests[\"Assessment points is 550\"] = readPoints === 550;
    }

clear 0 data
post /resetData

    input: {
        type: assessment,
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


## Test cases 7 ---"feedback":

```
clear 0 data
post /resetData

    input : {
        type: feedback
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

get 0 endUser
get /user

    input : {}
    output: {
        user object
    }
    testcase:{
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var jsonData = JSON.parse(responseBody);
        var journeyId;
        if (jsonData && jsonData.journeyId) {
            journeyId = jsonData.journeyId;
        }
        postman.setEnvironmentVariable(\"journeyId\", journeyId);
    }

get 0 taskDefinition
get /TaskDefinitions?filter[where][name]=Office Visit Feedback

    input : {
        name: Office Visit Feedback
    }
    output: {
      get taskDefinition by name
    }
    testcase:{
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var jsonData = JSON.parse(responseBody);
        var taskDefinitionId;
        if (jsonData && jsonData.length) {
            taskDefinitionId = jsonData[0].id;
        }
        postman.setEnvironmentVariable(\"taskDefinitionId\", taskDefinitionId);
    }

get 0 journeyPathTask
get /JourneyPathTasks?filter[where][journeyId]={{journeyId}}&filter[where][taskDefinitionId]={{taskDefinitionId}}

    input : {
        journeyId: journeyId,
        taskDefinitionId: taskDefinitionId,
    }
    output: {
      get JourneyPathTasks by journeyId and taskDefinitionId
    }
    testcase:{
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var jsonData = JSON.parse(responseBody);
        var journeyPathTaskId;
        if (jsonData && jsonData.length) {
            journeyPathTaskId = jsonData[0].id;
        }
        postman.setEnvironmentVariable(\"journeyPathTaskId\", journeyPathTaskId);
    }

create 1 task about feedback
post /Tasks

    input : {
        { journeyId: journeyId,
        journeyPathTaskId: journeyPathTaskId,
        taskDefinitionId: taskDefinitionId,
        startDate: startDate,
        endDate: endDate,
        dueDate: dueDate,
        status: "Active",
        details: feedbackDetails }
    }
    output: {
      create task
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

get 1 task(survey) by id
get /{{taskId1}}/survey

    input : {}
    output: {
        get survey Tasks, including questions
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        if (jsonData && jsonData.questionnaires) {
            if (jsonData.questionnaires.length) {
                for (var i in jsonData.questionnaires) {
                    if (jsonData.questionnaires[i].text === \"How was your last visit with Dr. Curry?\") {
                        postman.setEnvironmentVariable(\"questionId1\", jsonData.questionnaires[i].id);
                    } else if (jsonData.questionnaires[i].text === \"We're sorry to hear that you had a poor experience.\") {
                        postman.setEnvironmentVariable(\"questionId2\", jsonData.questionnaires[i].id);
                    }
                }
            }
        }
        tests["Status code is 200"] = responseCode.code === 200;
        tests["responseBody.questionnaires.length > 0"] = jsonData.questionnaires.length > 0;
    }

update 1 task(survey) by id
post /{{taskId1}}/survey

    input : {
        {"answers": [{"id":questionId1,"value":4},
        {"id":questionId2,"value":[\"Explanations\"]}]}
    }
    output: {
        update survey Tasks
    }
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

get 1 JourneyMetrics by task id
get /JourneyMetrics?filter[where][taskId]={{taskId1}}

    input : {
        taskId: taskId
    }
    output: {
        journeyMetric create by updating Tasks
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        tests["Status code is 200"] = responseCode.code === 200;
        var journeyMetric1;
        if (jsonData && jsonData.length && jsonData.length ===1) {
            journeyMetric1 = jsonData[0].id;
        }
        postman.setEnvironmentVariable("journeyMetric1", journeyMetric1);
    }

delete 1st JourneyMetrics by id
delete /JourneyMetrics/{{journeyMetric1}}

    input : {}
    output: {}
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

delete 1 tasks by id
delete /tasks/{{taskId1}}

    input : {}
    output: {}
    testcase:{
        tests["Status code is 200"] = responseCode.code === 200;
    }

create 2...4 task and delete the task

    same as 'create 1 task'...

create task
post /Tasks,

    get task(survey) by id
    get /survey,

    update task(survey) by id
    post /survey,

    get JourneyMetrics by task id
    get /journeyMetric,

    delete JourneyMetrics by task id
    delete /journeyMetric1,
    ...,

    delete tasks by id
    delete /tasks

get 1st points
get /points

    input: {}
    output:{
      "points": 235,
      "history": [
        {
          "subtitle": "Jan 3rd - Jan 7th",
          "title": "Week 1",
          "items": [
            {
              "value": "+235",
              "label": "Feedback Points"
            }
          ]
        }
      ]
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var readPoints = 0;
        if (jsonData.history && jsonData.history.length) {
            for (var i in jsonData.history) {
                if (jsonData.history[i].items && jsonData.history[i].items.length) {
                    for (var j in jsonData.history[i].items) {
                        if (jsonData.history[i].items[j].label === 'Feedback points') {
                            readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
                        }
                    }
                }
            }
        }
        tests[\"Feedback points is 235\"] = readPoints === 235;
    }


create 5 task and delete the task

    same as 'create 1 task'...

    create task
    post /Tasks,

    get task(survey) by id
    get /survey,

    update task(survey) by id
    post /survey,

    get JourneyMetrics by task id
    get /journeyMetric,

    delete JourneyMetrics by task id
    delete /journeyMetric1,
    ...,

    delete tasks by id
    delete /tasks

get 2nd points
get /points

    input: {}
    output:{
      "points": 300,
      "history": [
        {
          "subtitle": "Jan 3rd - Jan 7th",
          "title": "Week 1",
          "items": [
            {
              "value": "+300",
              "label": "Feedback Points"
            }
          ]
        }
      ]
    }
    testcase:{
        var jsonData = JSON.parse(responseBody);
        tests[\"Status code is 200\"] = responseCode.code === 200;
        var readPoints = 0;
        if (jsonData.history && jsonData.history.length) {
            for (var i in jsonData.history) {
                if (jsonData.history[i].items && jsonData.history[i].items.length) {
                    for (var j in jsonData.history[i].items) {
                        if (jsonData.history[i].items[j].label === 'Feedback points') {
                            readPoints += parseInt((jsonData.history[i].items[j].value).substring(1));
                        }
                    }
                }
            }
        }
        tests[\"Feedback points is 300\"] = readPoints === 300;
    }

clear 0 data
post /resetData

    input: {
        type: feedback,
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
