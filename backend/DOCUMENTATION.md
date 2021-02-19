# Backend Documentation

## Database object orientation
Database objects are stored like so:  
`Registered-Users:`
```json
{

}
```

`ToDos:`
```json
{
    "_id": "4k31k2j39dsl123jj",
    "email": "renatoversianidrakk@gmail.com",
    "title": "My To Do",
    "deadline": "Tomorrow Evening",
    "parent": "My List of To Dos for Tomorrow",
    "isCompleted": false,
    "styles": {
        "isBold": false,
        "isItalic": false
    }
}
```

## Errors
Response errors are returned like so:  
### Backend to Frontend

`Register Unsuccessful`
```json
{
    "success": false,
    "errorCode": 1,
    "message": "Email Already Registered"
}
```

`Register Successful`
```json
{
    "success": true,
    "sessionId": "4k31k2j39dsl123jj"
}
```

Read more on the login file. **src/routes/login.ts**  
`Login Unsuccessful`
```json
{
    "success": false
}
```

`Login Successful`
```json
{
    "success": false,
    "sessionId": "4k31k2j39dsl123jj"
}
```

`Not Successful`
```json
{
    "success": false,
    "sessionId": "4k31k2j39dsl123jj"
}
```

`Successful`
```json
{
    "success": true
}
```