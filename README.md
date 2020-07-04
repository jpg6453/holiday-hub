<div align="center">
  <a href="https://jpg6453.github.io/holiday-hub/" target="_blank"><img src="assets/img/navlogo.png" alt="Holiday Hub logo" width:"300" height:"200"/></a>
</div>

<div align="center">
<a href="https://jpg6453.github.io/holiday-hub/" target="_blank">Holiday Hub</a>

[Holiday Hub]("https://jpg6453.github.io/holiday-hub/") is a valuable resource for all your travel needs. Etc...

<br>

[Discover Holiday Hub here]("https://jpg6453.github.io/holiday-hub/")
</div>



## UX

Project Goals, business goals and dev goals.

User Stories
- User story 1
- User story 2
- User story 3
- User story 4
- User story 5
- User story 6
- User story 7
- User story 8
- User story 9
- User story 10

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
<img src="assets/img/map.png" alt="Map Screenshot" >
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

**(To Do)**


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

