## Title & Description

E-notebook is an online note taking app where you can also store your notes online securely.

## Environments

This is a React Web App which can be accessed on any browser by following this link: https://e-notebook-d52c3.web.app/.

Compatible/Tested environments:
- Chrome Version 84.x
- Firefox Version 72.x.
- Safari Version 13.x

## System Dependencies & Configuration

When running on development using npm start:
- npm 6.14.5
- node 13.11.0
- react 16.8 (This is important as I am using React Hooks!)
- material-ui -- both core and icons (see: https://material-ui.com/)
- react-icons (see: https://react-icons.github.io/react-icons/)

If needed to run on firebase serve:
- firebase 7.17.1 (see: https://www.npmjs.com/package/firebase)

## Overview

// Main functionalities
- Write your notes
Write a title and the content of your note in the provided text fields.

- Saving your notes
It is required to be signed up and logged in before being able to save a note. The application will open the login modal if you are not logged in when clicking the save button. Notes with no title will automatically be saved as 'Untitled'.

- Scapping your note via the new button
When clicking the new button, whatever is written on the title and content field will be gone.

- Saved notes
Your saved notes will appear on the right-hand side of the screen provided that the user is logged in.

- Opening saved notes
Clicking one of the saved notes will show its content on the title and content fields.

- Updating saved notes
After opening an existing note, the user can change its content and resave it.

- Deleting saved notes
A delete button beside a note can be clicked to delete it. A confirmation box will show before the user can finally delete a note.

// Authentication actions
Note: All authentication is provided by firebase

- Signing up
Has a confirm password check before finally signing in. Password fields have a show and hide button. All fields are validated and checked before being submitted to backend. Log in automatically after signing in.

- Logging in
Password field has show and hide button. Has validation before passing parameters to the backend.

- Sign out
Once logged in, an account menu will be available to the user. Opening that then selecting sign out will sign the user out and remove all their notes in the client side.

- Forgot password
On the login modal, the user can switch to the forgot password UI and submit their email. This will send a password reset link to their inbox which they can follow to reset their password.

// Limits
- Title field
Title field has a limit of 1500 characters (or 1.5kB). Reaching this limit will disable the save button.

- Content field
Content field has a limit of 10000000 characters (or 10 MB). Reaching this limit will disable the save button.

## Discussion
This is my first attempt at creating a web application and at the same time using React. Coming from a mobile experience, I've learned a lot -- from setting up the project, to using React and creating my own UI, to using Material UI, and using Firebase. Unlike Mobile applications that you can just plug and play to a device then submit to the appstore, web applications needed to be built and deployed. This process has already been taken away to make it easier for mobile developers. In addition, I've also learned how backend applications work together with client application -- using Firebase Firestore, Auth, and Hosting for my backend needs. I am also massively impressed by react hooks and what can be done with it. I've just scratched the surface and I'm more ready now to play around and understand it.

I do acknowledge that my application is not as flashy and pretty, but this is more focusing on how web applications are created, developed, and deployed to the web. I am proud with what I've accomplished with the amount of time I've been exploring web development. While development I am constantly able to add a bit of expected UX functionalities such as text field validations, showing password, forgot password functionality, etc.

I would also like to learn more about best web development patterns and code structures to improve my code. As such, I have some help from my friends (Shoutout to Joe Ferrer for always helping me when I'm stuck and reviewing whenever he has time!) when they have time. In addition, I also acknowledge the lack of mobile responsiveness of this app. I will, if time and motivation permits, fix that. For now I would like to explore on other functionalities I can do on a web app.

## License
MIT License
