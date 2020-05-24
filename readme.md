# Google Classroom SMS Reminders

This Node web application allows teachers using Google Classroom an interface to quickly send SMS reminders to their
students using the [Vonage Messages API](https://developer.nexmo.com/messages/overview).

## Prerequisites

- A Vonage Messages API Account
- A [Google APIs Account](https://console.developers.google.com/) with [OAuth 2.0 Client credentials](https://developers.google.com/identity/protocols/oauth2#1.-obtain-oauth-2.0-credentials-from-the-dynamic_data.setvar.console_name-.)
- A [Google Classroom account](https://classroom.google.com/) with a class having several students in it and at least one assignment
- [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine

## Quick Start

- Clone this repository
- Install the dependencies using npm: `npm i`
- Copy your Vonage private key to a new file called `./.prive_key` in the root directory of the project
- Run the app with all of the following environment variables set in your command line:

```bash
GOOGLE_OAUTH_ID=<YOUR GOOGLE OAUTH ID> \
GOOGLE_OAUTH_SECRET=<YOUR GOOGLE OAUTH SECRET> \
GOOGLE_OAUTH_REDIRECT=http://localhost:3000/ \
SESSION_SECRET=<A SECURE STRING FOR PROTECTING SESSIONS>  \
NEXMO_API_KEY=<YOUR VONAGE MESSAGES API KEY> \
NEXMO_API_SECRET=<YOUR VONAGE MESSAGES API SECRET> \
NEXMO_PHONE_NUMBER=<YOUR VONAGE MESSAGES PHONE NUMBER> \
NEXMO_APP_ID=<YOUR VONAGE MESSAGES APP ID> \
NEXMO_PRIVATE_KEY_PATH=./.private_key \
npm run dev
```

Navigate to `localhost:3000` to log in to the app and use it to send reminders to your students.
