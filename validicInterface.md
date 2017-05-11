# validic interface readme. version 0.1

** used interface **

used function | description | interface | implementation logic
---------------|--------------|-----------|-------------------------------------
getValidicUser | get validic user info in validicUser table, including patient id, validic user id and validic user token | get /api/ValidicUsers/getUserInfo | get validic user by the current user's person_id
provisionUser | used to create a user profile and exchange your User ID (UID) for a Validic ID (_ID) on Validic | post /api/ValidicUsers/provisionUser  params: userId | get validic user's profile by the parameter userId, then convert the userId to patientId, and save the object to the table ValidicUser. Observe the validic user id whether it's null or not before saving, find and refresh it's token if it exists, provisioning user if it doesn't exist.
connectDevice | validate the user token in table ValidicUser before adding devices, return null when it is correct, or return new token when it is invalid | get /api/ValidicUsers/connectDevice params: userToken, validicUserId | validate the token by request the url of the validic marketplace with the parameter useToken, observe the response status code, return null when the code is 200, or refresh, save and return the token with the parameter validicUserId when the code is not 200
getSyncedApp | to sync all the devices which the user has authorized | get /getSyncedApp params: usertoken | get all the authorized apps with the parameter usertoken
pollForUpdates | update the validic user table | post /pollForUpdates | update the validic user by invoking the file of 'server/validic/updateUserInfo'


***

All validic objects -- 'biometrics','diabetes','fitness','nutrition','routine','sleep','user','weight' -- whose pre-provisioning interfaces are available for loopback.

***


** not used interface ** 

interface  |  introduce
------------------------|-------------------------------------------------------
Updating User Records    | Push Notifications(individual user-level) or Latest Endpoint(bulk population-level)
Managing Change   |  Push Notification Service/Authenticating Push Notifications/Validating the Signature  How to prepare for change and manage your version
Working With Users  | Suspend/Updating Users/Delete Users/User Credentials
Validic Connect Partner API |
Mobile  |  Android Documentation/Cordova Documentation
