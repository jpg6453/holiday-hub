<h1 align="center">
  <a href="https://jpg6453.github.io/holiday-hub/" target="_blank"><img src="assets/img/hhlogo.png" alt="Holiday Hub logo" width:"300" height:"200"/></a>
</h1>

<h2 align="center">

<a href="https://jpg6453.github.io/holiday-hub/" target="_blank">Holiday Hub</a>
</h2>

<div align="center">

**Search. Discover. Explore**

<br>

[Holiday Hub](https://jpg6453.github.io/holiday-hub/) allows you to search cities all over the world for Hotels, Restaurants and Tourist attractions. 
Whether its for your next holiday, business trip or just to get to know a city a little better, Holiday Hub has everything. 
Contact one of our team and let them do the rest.
</div>



## UX

### Project Goal

To create a single page site that calls upon the Google Maps & Google Places API to allow visitors to:
- search for their next holiday destination
- find information for a business trip
- find out about cities they want to visit

#### User goals
- The ability to select a country
- Search for cities in the chosen country
- Clickable icons to search for different place categories
- View a map
- Visually see where search results are located on the map
- Presentation of information relating to the places found.
- The ability to make an enquiry to book a holiday.

#### Business goals

- The user makes a booking enquiry to book a stay at a given destination.

#### User Groups
 There are 3 main user groups that have been identified:
 - People planning a holiday
 - Business travellers
 - New residents of a city (or country)

#### User Stories

As a user visiting the site, I would like:

- The ability to select a country, so that I can search for places within it.
- To be able to start typing a city and be offered suggestions, so thats its quick and easy.
- To click a button, so that I can search for different place categories.
- Place locations to be plotted on a map, so that I can see where they are in relation to other landmarks.
- The ability to control the map so that I can tailor my search.
- To be able to view search results, so I can see what options there are in a given city
- More details about a place when I click on it, so that I can learn a more about it.
- To change the city and/or country, so that I can search again.
- To make an enquiry, to book venues during my stay.
- Link to social media platforms, to find out more about the company.
- To see which destinations other people are booking on the site, for inspiration.
- To view the site on all my devices, so that I can view it anywhere.

### Design Choices

**Fonts**
- Montserrat was used for headings and open sans for body text and labels. Special font "Kaushan Script" was used for “Holiday hub" for the nav logo to create a branded look.

**Icons**
- place icons chosen as they are consistent with google maps (at the time of writing) and are self explanatory. I selected the "I" icon for attraction as this this is universally accepted to mean “information”.

**Colours** 
- Muted colours were used to allow the map and place icons to command centre stage.

**Hero Image**
- Exotic beach draws the user in and creates longing to be on holiday. Opaque overlay applied to soften image and helps the text to pop off the background.

**Styling**
- All buttons and card elements have rounded corners to fit with Google maps styling.

## Existing Features 

**Navbar**
- Logo conventionally positioned top left and reloads the page
- Search link - scrolls to search bar
- Book now - scrolls to form
- Destinations - links to destination section
- Hidden on small screens as screen height is at a premium when displaying the map.
- The nav has class ```navbar-expand-lg``` applied so the burger menu is displayed on medium screens.

**Search Bar**
<div align="center">
<img src="/assets/img/searchbar.png" alt="Searchbar Screenshot" >
</div>

This has 2 components:
- **Country Selector**
    - The user is able to select a country from a dropdown.
    - The UK is selected by default (the developer's native country)
    - Once selected the map zooms in and centers on that country.
    - The appropriate zoom level is set within the country object in JS
    ```'uk': {
        center: { lat: 54.8, lng: -4.6 },
        zoom: 5
    },
    ```
    - Zoom levels are in the range 1-16, the higher number = closer zoom.
    - lat lng values can be found [here](https://www.mapcoordinates.net/en)

- **Autocomplete**
    - Once the user selects a country an autocomplete object is created, restricting the search to that country, with ```types``` set to ```cities```.
    ```
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (
            document.getElementById('autocomplete')), {
            types: ['(cities)'],
            componentRestrictions: countryRestrict
        });
    ```
    - When the user starts typing the name of a city the autocomplete offers suggestions based on what has been typed.
    


    <div align="center">
    <img src="/assets/img/autocomplete.png" alt="Place Icons Screenshot" >
    </div>



    - The user then selects the desired city.
    - The map zooms in to that city.
    - Onfocus is set to ```' '``` so that any previous value in this field is cleared when clicked by the user, which is great UX.

**Place Type Icons**

<div align="center">
<img src="/assets/img/placeicons.png" alt="Place Icons Screenshot" >
</div>




- The icons are made available after the user selects a city in the ```autocomplete``` element.
- Click the appropriate icon to search for upto 20 places of that type within the map’s viewport. 
- The user is able to drag the map around until the desired area of the city they are searching is in the map viewport.
- Clicking an icon again will perform a search within this revised map viewport because the search object has ```bounds``` as a key. See below:

```
let search = {
        bounds: map.getBounds(),
        types: [type]
```
- Supported place types categories can be found in the [Google Maps Documentation](https://developers.google.com/places/supported_types)

**Map**


<div align="center">
<img src="/assets/img/map.png" alt="Map Screenshot" >
</div>

- The map ```<div>``` has class ```col-lg-6``` and is resized to full width when the user selects a city for the first time.
- For medium screens and mobile the map takes up the full screen width at all times.
- The map controls are configured in the ```initMap``` function and can be set to suit your particular application.
```
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: countries['uk'].zoom,
        center: countries['uk'].center,
        mapTypeControl: false,
        panControl: true,
        zoomControl: true,
        streetViewControl: false
    });
```
- More information can be found in the [Google Maps Docs](https://developers.google.com/maps/documentation/javascript/interaction#pan)

- When the user clicks a **Place Icon** a search is carried out.
- If results are found, numbered markers are plotted on the map which show an info window when clicked.

<div align="center">
<img src="/assets/img/infowindow.png" alt="Map Screenshot" >
</div>

**Search Results**

- Search results are displayed in upto 20 horizontally scrolling cards.

<div align="center">
<img src="/assets/img/resultcard.png" alt="Result Card Screenshot" >
</div>

- If a place image is not available a default **placeholder** is displayed instead.
- Clicking a result card opens the info window above it's marker on the map. 

**Booking Form**
- Each field has a label and placeholder to guide the user.
- All fields have the ```required``` attribute and ```html validation``` is used.
- There is an additional layer of validation in that the ```Send``` button is ```disabled``` by default.
- ```checkForm function``` checks if all fields have ```valid``` input before the send button becomes ```active```. 
    - The ```.trim()``` method removes white space, so preventing a user just entering spaces.
- As this is a front end project the button ```type``` is set to ```button```. 
- Future dev could be to handle this as a true submit event to either popultae a data base or connect up to emailJS.

**Booking Modal**

- When the user clicks the ```send``` button a user modal appears confirming that the form has been submitted (this is simulated for this project).

<div align="center">
<img src="/assets/img/modal.png" alt="Modal Screenshot" >
</div>

On closing the modal the form fields are cleared using the ```reset()``` function.

**Popular Destinations**

- 3 ```cards``` showing popular destinations with a mix of city/ exotic/longhaul to showcase the range of destinations being booked by Holiday Hub clients.
- The cards have ```opacity:0.75``` which increases to 1 on hover and the the card scales by ```5%``` to make it stand out.

**Call to Action**

- This is located above the footer and serves as a final attempt to convert the browsing user into an enquiry.
- The ```book now``` button takes the user to the booking form.

**Floating Back to Top Button**

- A floating scroll to top button appears after the window is scrolled down ```500px```. 
- It has a hover effect and takes the user to the top of the window when clicked.

**Footer**

- Features social media icons. 
- The links have the ```target=_blank``` property to open these platforms in a new window. 
- The links point to the homepage of each platform at this time.

**Features left to implement**

- Rank results by rating
- Show additional information for search results, such as **opening hours** and **customer reviews**.

**Features for the future**

- Provide the ability to conduct a search around a single marker.
- **User profiles** to enable users to save previous searches.
- Use the [Routes](https://cloud.google.com/maps-platform/routes/?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_397052992496-ADGP_Hybrid+%7C+AW+SEM+%7C+SKWS+~+Routes+%7C+BMM+%7C+Directions+API-KWID_43700049595992169-kwd-445998650286-userloc_9040164&utm_term=KW_%2Bdirections%20%2Bapi-ST_%2Bdirections+%2Bapi&gclid=Cj0KCQjw9IX4BRCcARIsAOD2OB2z9Zy61IndjJ0LBKIvLo0-_WDMUsj4lOfTMJhLHuf3A9gH4Y6aR1MaAg3dEALw_wcB) service to help users plan trips more effectively.
- Include a ```Book Now``` button on result cards which populates the form with ```Place Name/City ``` to help route the enquiry.
- Provide access to more **place types**.
- Expand the number of **countries** that can be searched.

## Technologies Used


- This project was built with HTML, CSS and JavaScript programming languages.
- [jQuery](https://jquery.com/)
    - Used for responsive navbar and template literals to build search result elements.
- [Popper.js](https://popper.js.org/)
    - Also used for the responsive, collapsible navbar & form modal.
- [Google Maps Platform](https://cloud.google.com/maps-platform/products)
    - Used to render the map, plot markers and retrieve place data.
- [Gitpod](https://www.gitpod.io/)
    - The developer chose this IDE to compile all code for this project.
- [GitHub](https://github.com/)
    - Used for version control and to host the site on **Github Pages**.
- [Bootstrap](https://getbootstrap.com/)
    - This was used to provide a structured layout and ease of making the site responsive.
- [Google Fonts](https://fonts.google.com)
    - Text elements were styled using **Google fonts**.
- [Fontawesome](https://fontawesome.com/)
    - The source for all iconography.
- [Autoprefixer](https://autoprefixer.github.io/)
    - The CSS file was passed through **Autoprefixer** to ensure browser pre-fixes were the most upto date.

## Testing

### Code Validation

Validation tools were used to check that the website code was valid:
    - [W3C Mark Up Validation](https://validator.w3.org) for HTML.
    - [W3C CSS Validation](https://jigsaw.w3.org/css-validator/) for CSS.
    - [JSHint](https://jshint.com/) for JavaScript.

### User Stories Testing

**The ability to select a country, so that I can search for places within it.**

- Navigate to the country section of the search bar.
- Click the country selector and verify a list of countries are displayed.
- Select a country and confirm that the map zooms in on that country.
- Repeat for all countries in the list.

**To be able to start typing a city and be offered suggestions, so thats its quick and easy.**

- After selecting a country, click **Enter a City** in the search bar and begin typing the name of a city. 
- Select an autocomplete suggestion and confirm the map zooms in on that city.
- A **panel** with an image and anme of the city will overlay the map on **medium** screens upwards.
- Repeat for all coutries listed.

**To click a button, so that I can search for different place categories.**

- Click on a place icon and a search for that place **type** will be carried out.
- Repeat for all icons.
- Confirm that previous search results are cleared.


**Place locations to be plotted on a map, so that I can see where they are in relation to other landmarks.**
- After clicking a place icon, numbered red markers are plotted on the map.

**The ability to control the map so that I can tailor my search.**
- The map can be zoomed in and out and dragged around in the viewport to change the area that will be searched.

**To be able to view search results, so I can see what options there are in a given city.**
- A search result total is displayed in the **lozenge** (to the left of the icons on dektop and above the icons on all other screens).
- Result **cards** are displayed under the place icons and can be scrolled horizontally.

**More details about a place when I click on it, so that I can learn a more about it.**
- Click on a marker to display an info-window above that marker. 
- Clicking a result card also opens the info window for the corresponding marker.

**To change the city and/or country, so that I can search again.**

- Click the **New City** icon to clear the existing search results and markers.
- Amend either the city or country or **both** and perform an new search as before.
- Access to the search bar can also be acieved by simply scrolling up.
- On mobile the **New City** icon is not available. However the search fields are always avilable via the **sticky** search bar.

**To make an enquiry, to book venues during my stay.**
- Fill out the contact farm and click send.
- All feilds must have valid input before the send button becomes avtive.

**Link to social media platforms, to find out more about the company.**

- Click on the social media links located in the footer.
- Confirm that the homepage for each platform opens up in a new window.
- These links would redirect to real profiles in the future.


**To see which destinations other people are booking on the site, for inspiration.**
- Navigate to the **Popular Destinations** sections by clicking the **Destinations** link in the nav bar.
- The latest trending destinations will be displayed.

**To view the site on all my devices, so that I can view it anywhere.**

- View Holiday Hub on all your devices so that you can keep searching wherever you are.

### Manual Functionality Testing

**Navigation**

- On desktop, go to the landing page.
- Reduce the browser size down to tablet to verify that the navbar is responsive and switches from the expanded, inline menu to burger menu at this screen size.
- Verify that the logo alt text (brand logo) appears on hover.
- Click on the logo in the top left of the navbar and confirm that it links to the home page **(page will reload when clicked)**.
- Click on each navigation menu element and confirm that it links to the correct section.
- Confirm that there is a subtle colour change when hovering over the navbar links.
- Reduce the screen down to small and confirm the burger menu drops down when clicked.
- All above functionality and checks carried out on tablet and mobile.

**Hero Image and Text**

- Check all screen sizes and confirm that the background image and text font size look good.

**Search Bar**

**Country Dropdown**
- Verify the value on loading is UK and the map is centred on UK.
- Click on selector arrows and confirm a list of countries to select from is displayed.
- Select a country and confirm the map changes and zooms in on that country.
- All functionality checked on all screen sizes.

**Autocomplete**
- Verify the value on loading is ```Enter a City``` placeholder text.
- Commence typing into the field and confirm suggestions appear in a dropdown.
- Select a city and confirm the map resizes to full width **(desktop only)**.
- Confirm the map scrolls to the top of the window on all screens.
- Verify that a panel with image and city name overlays the map in the top left corner **(not on mobile)**.
- Confirm the 5 place type icons have appeared under the map.

**General**

- The search bar becomes ```sticky``` when scrolling the page on **mobile only** and becomes hidden when the booking section is reached.
- All functionality checked on all screen sizes, noting the **special cases** above.

**Place Search**
- Click the **Hotels** icon and confirm that:
    - Numbered red markers are plotted on the map.
    - ```"X" Hotels found``` appears in the "lozenge" to the left of the icons **(desktop)** and above on all other screen sizes.**(X = number of results)**.
    - Horizontal scrolling result "cards" are displayed below the icons.
        - Card anatomy:
            - Place image at the top. If no image available from Google, a greyscale **placeholder** is displayed.
            - A number corresponding to its marker on the map.
            - Place Name.
            - Customer rating.
            - Address **(not displayed on mobile)**.
    
    - The **New City** icon appears to the right of the **Attractions** icon. This remains hidden on **mobile** as the **sticky** searchbar is always available when viewing the map.

- Click the **New City** icon on available screen sizes and confirm that:
    - The markers and image panel(if present) are cleared from the map.
    - The result cards are cleared.
    - The page scrolls up to make the searchbar available.
    - The ```autocomplete``` displays the **Enter a city** placeholder text.
    - The map remains on the city just searched.
    - The place icons are hidden to prevent another search of the same city.
    
- Manually scroll to the search bar (or use **sticky** search bar on mobile) and verify that the markers and result cards remain in place until either a city or country are selected.
- Confirm that the autocomplete value becomes empty when clicked leaving **Enter a city** placeholder text.
- Reload the page and repeat the above for the **4 remaining** place icons.
- Repeat the above on all screen sizes.

**Map**

- Click a marker and confirm that the info window appears above it.
- Click a result card and confirm that this also opens the corresponding marker.
- Check across all place types.
- Verify for each screen size.
- Click on the map controls and confirm zoom and full screen function correctly **(Desktop only)**

**Contact Form**

- Try to submit the form empty and verify that the send button does not become active.
- Try to enter text or special characters in the phone number field and verify that this is not possible.
- Enter valid inputs for 3 fields and just enter spaces into the remianing field. Verify that the send button does not become active.
- Resize the browser and check that the form is responsive and looks good on all screen sizes.

**Popular Destinations**

- Hover on each card in turn and confirm that their opacity increases to 1 and the card scales up slightly.
- Confirm the scale and opacity are reduced to the start point when the hover is removed.
- Resize the browser and verify the section looks good on all screen sizes.

**Call to Action**

- Click the **Book Now** button and confirm the page scrolls to the contact form.
- Resize the browser and check the font size and alignment look good on all screen sizes.

**Footer**

- Check each social media icon in turn and verify that the icon and background colours reverse out on hover.
- Click each icon and verify it links to the correct social media site in a separate tab.
- Check the responsiveness of the footer across all screen sizes and check that the layout looks good.

**Floating To Top Button**

- Scroll down and confirm the floating button appears on the right hand side of the page.
- Hover on the button and verify that the background colour becomes dark grey.
- Click the button and confirm the window scrolls to the top.
- Scroll down again until the button appears then scroll back up and confirm it becomes hidden.
- Check all screen sizes and verfiy that the size and position of the button look good.

## Bugs Fixed

- If, during a search, there was no ```result.photo``` available from Google for a given place, the marker would be plotted on the map but a result card would not be built for that search result.
    - This was fixed by creating a fall back to a default placeholder image with the following code:
        ```javascript
        ${photo && photo.length ? photo[0].getUrl() : defaultPhoto}
        ```

- If there were no results to return for a search, no markers would be plotted on the map and of course no result cards would be built.
    - The following code informs the user that there are no results for that particular search:
        ```javascript
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            clearResults();
            clearMarkers();

            const noResults = `
                <div class="total error">NO RESULTS FOUND</div>
                `;
            document.getElementById('result-total').innerHTML = noResults;
        ```
    - Zero results can be achieved for the following search:
        ```
            Country - South Africa
            City - Lydenburg
            Place type - bars
        ```

- While remaining in the same city, if a second place icon is clicked following a previous search and the result cards have been scrolled to the right, the results for the second search will be displayed from the same index in the results arrray (i.e scrolled to the **right**).
    - This was fixed with the following function:
        ```javascript
        function firstCard() {
            const resultCards = document.getElementById('results');
            resultCards.scrollTo(0, 0);
        } 
        ```   
## Bugs Left to Fixed

- **IE 11**
    - A user reported that:
        -  the ```hero-text``` was pushed over to the **right**
        - 2 small arrows appear at either end of the horizontal ```scrolling-wrapper```.

- **Microsoft Edge**
    - A user reported that:
        - 2 small arrows appear at either end of the horizontal ```scrolling-wrapper```.

The developer does not have access to any machines running windows and attempts to replicate the errors within **Safari Dev tools** failed.

## Deployment

**Hosting On GitHub Pages**

This website was committed to git and pushed to GitHub via the terminal built into the **Gitpod** IDE.
The project was deployed to GitHub Pages from this [GitHub](https://github.com/jpg6453/holiday-hub) repository by doing the following:

1.	Log into GitHub.
2.	From the list of repositories on the left side of the screen, select **jpg6453/holiday-hub**
3.	From the toolbar at the top of the page, select **Settings**.
4.	Scroll down to **GitHub Pages**.
5.	Under Source change the drop down menu from **None** to **Master Branch**
6.	On selecting Master Branch the website is now deployed and the page refreshes.
7.  Scroll back down to the **GitHub Pages** section to find the link to the deployed site.

The site is published at **https://jpg6453.github.io/holiday-hub/**

At the time of submission there is no difference between the master branch and the deployed version of the project.

**To run the project locally**

The website can be cloned from GitHub as follows:
    
1. Follow this link to the [Holiday Hub repository](https://github.com/jpg6453/holiday-hub/). 
2.	Click the green **Code** button.
3.	A Clone with HTTPs modal appears on screen, copy the clone URL for the repository.
4.	Within your chosen IDE launch a terminal session
5.	Ensure the current working directory is the location where you want the cloned directory to be made. Change this if necessary.
6.	Type ```git clone```, and then paste the URL copied in Step 3.
```
git clone https://github.com/jpg6453/holiday-hub
```
7.	Press **Enter** and a clone will be created locally. This could take a few minutes.




**Google Maps API Key**

- For your own project you will need a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) 


You will then need to replace ```YOUR_API_KEY``` with your **own API key** in the following script at the bottom of the index.html file. 

```
<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap">
</script>
```

Please pay particular attention to the **Restrict the ApI key** section as this is **STRONGLY** recommended.


## Credits

**Content**

- All text was written by the developer except:

    - Destination cards:
        - **New York** taken from [nycgo](https://www.nycgo.com/)
        - **Africa** taken from [go2africa](https://discover.go2africa.com/africa-safari-tours/?gclid=Cj0KCQjwoub3BRC6ARIsABGhnya9OICxdqW4LF4ClLxHmS9imYjSEmUkjxPHPQMYcXL3ONcvp1TGX58aAsGWEALw_wcB)
        - **Sydney** taken from [lonely planet](https://www.lonelyplanet.com/australia/sydney)
	

**Media**

**Images**

All featured images sourced from [Pixabay](https://pixabay.com/)
- [Brand logo](https://pixabay.com/vectors/sun-water-yellow-sunset-dawn-309821/)
- [Hero & CTA](https://pixabay.com/photos/beach-sandy-beach-paradise-1824855/)
- [Booking Section](https://pixabay.com/photos/vacation-holidays-equipment-travel-691364/)
- Destinations Cards:
    - [New York](https://pixabay.com/photos/taxi-cab-traffic-cab-new-york-381233/)
    - [African Safari](https://pixabay.com/photos/giraffe-sunset-yellow-sky-2233366/)
    - [Sydney](https://pixabay.com/photos/sydney-opera-house-night-harbor-1169155/)


-  Panel and result card images – [Google Maps Places Library](https://cloud.google.com/maps-platform/places). **Charges may apply**

**Code**

- Floating to top button – [W3Schools](https://www.w3schools.com/howto/howto_js_scroll_to_top.asp)
- Form submit button inactive until all inputs valid - [Academind](https://www.youtube.com/watch?v=8cb4auJt1TA)
- Horizontal scrolling container – [Colin Lord](https://codeburst.io/how-to-create-horizontal-scrolling-containers-d8069651e9c6)

## Acknowledgements

A big thank you to my Code Institute Mentor, Maranatha Ilesanmi, for demonstrating concepts which helped me overcome problems in the functionality of the site.



## Disclaimer

This project was developed for educational purposes and all images are licence free.

