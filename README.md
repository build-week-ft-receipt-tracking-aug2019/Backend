# Receipt Tracker API
## Below are the endpoints with their expected body/headers and responses:

    | Method | URL |  Success Response | Failure Response(s)
    | --- | --- | --- | --- | --- |
    | POST | /register | 201 - [ *idOfSuccessfullyCreatedUser* ] | 400 - { error: "That username or email is already in use." }, 400 - { error: "Please provide username, email, and password. }