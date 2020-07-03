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


