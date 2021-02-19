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
`Backend to frontend:`
```json
```

`Database to routes:`
```json
{
    "success": false,
    "error": {
        "message": "Object check failed."
    }
}
```