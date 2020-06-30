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
