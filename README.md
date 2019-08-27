# Receipt Tracker API

`POST` to `/register` expects a body of..

```
{ 
     username: "some-username", 
     email: "someemail@email.com", 
     password: "someP4ssw0rd" 
}
```

Success - 201 Status Code
> Response: [ idOfCreatedUser ]

Failure - 400 Status Code (When attempting to register a user that already exists)
> Response: { error: "That username or email is already in use." }

Failure - 400 Status Code (When leaving out any of the required fields) 
> Response: { error: "Please provide username, email, and password." }


`POST` to `/login` expects a body of:

```
{ 
     username: "some-username", 
     email: "someemail@email.com", 
     password: "someP4ssw0rd" 
}
```

Success - 201 Status Code
> Response: { message: "User *username* successfully logged in!", token: "superLongTokenString" }

Failure - 400 Status Code (When attempting to login with wrong credentials)
> Response: { error: "Invalid credentials!" }


`POST` to `/users/receipts` expects a body of:

```
{
     date: "Aug 26, 2019 1:25 PM",
     amount_spent: 1337.28,
     category: "Electronics",
     merchant: "Dell",
     user_username: "some-username"
}
```

Success - 201 Status Code
> Response: [ idOfCreatedReceipt ]

Failure - 401 Status Code (When missing required fields)
> Response: { error: "Please provide all required fields." }


`GET` to `/users/receipts` expects no body, but a header key/value pair of:

`{ authorization: "superLongTokenString" }`

Success - 200 Status Code
> Response: [ { receipt }, { receipt }, { receipt } ]

Failure - 401 Status Code (When user is not logged in)
> Response: { error: "You need to log in first" }