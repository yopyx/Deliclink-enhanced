# DelicLink APP

The project showcases a food ordering app with smooth responsive user interactions in various screen sizes from choosing
the location, surfing restaurants through filters and dishes search till adding the food to the cart for checkout.

#### Table of Contents

- [Project App Overview](#section1)
- [Key Features](#section2)
- [Screenshots](#section3)
- [Live Demo Link](#section4)
- [Tech Stack](#section5)
- [Challenges Manage](#section6)

<a id="section1"></a>

### Project App Overview

#### The aim is to build an food ordering app that allows detailed responsive experience for the user to:

1. choose the current location for picking regional restaurants.
2. surf infinite list of restaurants with the ability to filter them according to delivery time, rate, price, ...etc.
3. freely search food items via large spectrum of restaurants and dishes results based on user's location.
   **search can be done by:**

- Food Category => surfing restaurants list and fitering the list according to delivery time, rate and price via "/category" path
- Restaurants => scroling infinite list of regional restaurants in "/city" path and search for restaurants in "/search" path
- dishes => search for dishes in "/search" path

---

<a id="section2"></a>

### Key Features

- search by location feature : allow requesting GEO_API by passing search input representing user location to get the restaurants data specific to that location
- list filtering feature : allow filtering and sorting restaurants according to delivery time, rate, price, dish category, veg/non-veg ...etc
- list infinite scrolling : allow render of more restaurant cards upon scrolling down via requesting RES_CARDS_UPDATE_API via proxy server to fetch more data
- cart feature : allow storing added items in "/restaurants" and "/search" paths to one slice via redux store, So that all items added can be shown in the "/cart" path at checkout
- caching feature : allow caching by session (client-side caching) via redux-persist to increase performance and improve user experience

---

<a id="section3"></a>

### Screenshots

![Alt text](</public/app%20photos/2024-10-28%20(9).png>)
![Alt text](</public/app%20photos/2024-10-28%20(2).png>)
![Alt text](</public/app%20photos/2024-10-28%20(5).png>)
![Alt text](</public/app%20photos/2024-10-28%20(8).png>)

Mobile screens
![Alt text](</public/app%20photos/2024-10-28%20(10).png>)
![Alt text](</public/app%20photos/2024-10-28%20(11).png>)
![Alt text](</public/app%20photos/2024-10-28%20(13).png>)

---

<a id="section4"></a>

### Live Demo Link

[Click here](https://deliclink.vercel.app/) to visit the website.

<a id="section5"></a>

### Tech Stack

- Frontend: React, Redux, Tailwind CSS, SASS, TypeScript
- Backend: Node.js, Express.js
- API: Swiggy REST APIs
- Libraries: Redux Toolkit, React Redux, React Router Dom for routing, React Query for handling api requests
- Configuration tools: Vite

---

<a id="section6"></a>

### Challenges Management

#### create data types for swiggy api response data

Problem => The fetched swiggy data structure inconsistencies reflects uncertainity in deciding the data form type, resulting in so many TypeErrors and bad management of data layer structure.
Resolve => good data chaining and ensure maintaining consistent data type form as far as possible via data inspection in detail and allow some prop types to be optional to avoid unnecessary errors.

#### mapping data to be rendered along UI layer

Problem => TypeErrors appear frequently due to
Resolve => Create check-type fucntions in which serve as type guard to help create more robust, error-resistant code by verifying data.

#### CORS blocking requests

- Development phase : Due to CORS blocking requests to swiggy update api, backend proxy is set up by creating express server to avoid CORS request blocking and setting a post request using axios to getListing swiggy api.
- Production phase : use serverless function instead of proxy server for vercel deployment.

#### previous/next page navigation

Problem => when navigate between "/city" paths, the data shown is of the last fetched data which results in unupdated render of the page
Resolve => create a slice for storing all navigated cities data and filtering the data list according to the current path name
