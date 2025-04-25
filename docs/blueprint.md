# **App Name**: VarClinic

## Core Features:

- Doctor Listing: Display a list of doctors with their details fetched from the API.
- Filtering: Allow filtering by specialty and consultation mode (Video Consult, In Clinic).
- Sorting: Implement sorting by fees (ascending) and experience (descending).
- Search and Autocomplete: Implement an autocomplete search box for doctors by name, displaying a maximum of 3 suggestions.

## Style Guidelines:

- Primary Color: Light blue (#E0F7FA) – Use for main backgrounds, headers, and overall layout.
- Secondary Color: White (#FFFFFF) – Use for content areas, doctor cards, and to ensure readability.
- Accent Color: Teal (#000066) – Use for interactive elements like buttons, links, and highlights to indicate selection or focus.
- Use a grid-based layout (e.g., CSS Grid or a library like Material UI's Grid) for the doctor listing to ensure responsiveness across different screen sizes. The images show a 2-column layout on larger screens; adapt this to a single-column layout on smaller screens (mobile).
- Doctor Cards: Use white backgrounds for doctor cards to ensure readability. Incorporate subtle shadows for a card-like appearance. Display the doctor's photo, name, specialty/specialties, experience, and fees. Include a "Book Appointment" button (use the teal accent color).  This button doesn't need to be functional for the prototype but should be present.
- Filtering & Sorting Interface: Place filters (Specialty, Consultation Mode) in a sidebar on the left (as shown in the reference images). Use clear and simple icons next to specialties and consultation modes for visual clarity. Consider using icons from a library like Font Awesome or Material Icons. The "Sort by" options (Fees, Experience) can be placed at the top (as shown in the images).
- Search Bar: Place the search bar at the top of the page for easy access.
- Responsiveness: The design must be fully responsive and adapt to different screen sizes (desktop, tablet, mobile).

## Original User Request:
You are a highly skilled React developer tasked with building a doctor listing interface. The application should fetch data from a provided API, implement filtering, searching, and sorting functionalities on the frontend, and ensure the filter states are reflected in the URL as query parameters. You should also make sure data-testid attributes for test automation are properly implemented.

**1. Data Fetching:**

*   Fetch doctor data from the API endpoint: `https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json`.
*   On initial load, display all doctors.

**2. Search Component (Autocomplete Input):**

*   Implement an autocomplete input box (`data-testid="autocomplete-input"`) that allows users to search for doctors by name.
*   As the user types, display a maximum of 3 suggestions (`data-testid="suggestion-item"`) based on matching doctor names from the fetched data.
*   When a user selects a suggestion, filter the doctor list to show only the selected doctor.

**3. Doctor Card Component:**

*   Create a DoctorCard component (`data-testid="doctor-card"`) to display doctor information. Each card should include:
    *   Doctor's name (`data-testid="doctor-name"`)
    *   Doctor's specialty/specialties (`data-testid="doctor-specialty"`)
    *   Doctor's experience (`data-testid="doctor-experience"`)
    *   Doctor's fee (`data-testid="doctor-fee"`)

**4. Filtering Components:**

*   **Specialty Filter:**
    *   Create a filter section with the header "Speciality" (`data-testid="filter-header-speciality"`).
    *   Display checkboxes for each specialty available in the dataset: "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist", "ENT", "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist", "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist", "Dietitian-Nutritionist", "Psychologist", "Sexologist", "Nephrologist", "Neurologist", "Oncologist", "Ayurveda", "Homeopath".
    *   Each checkbox should have the correct `data-testid` attribute (e.g., `data-testid="filter-specialty-General-Physician"`).
*   **Consultation Mode Filter:**
    *   Create a filter section with the header "Consultation Mode" (`data-testid="filter-header-moc"`).
    *   Include radio buttons for "Video Consult" (`data-testid="filter-video-consult"`) and "In Clinic" (`data-testid="filter-in-clinic"`).
*   **Sort Filter:**
    *   Create a sort section with the header "Sort" (`data-testid="filter-header-sort"`).
    *   Include options to sort by fees (ascending) (`data-testid="sort-fees"`) and experience (descending) (`data-testid="sort-experience"`).

**5. Filtering and Sorting Logic:**

*   Implement filtering and sorting on the frontend using JavaScript.
*   **Specialty Filter:** When one or more specialty checkboxes are selected, the doctor list should only display doctors with the selected specialties.
*   **Consultation Mode Filter:** When "Video Consult" or "In Clinic" is selected, the doctor list should only display doctors who offer the selected consultation mode.
*   **Sort Filter:**
    *   "Sort by Fees" should sort the doctors in ascending order of their fees.
    *   "Sort by Experience" should sort the doctors in descending order of their experience.
*   Filters should work in combination. For example, if a user selects "Video Consult" and "Dentist," the list should only show dentists who offer video consultations.

**6. URL Query Parameters:**

*   Update the URL with query parameters to reflect the selected filters. For example:
    *   `?specialty=Dentist,Cardiologist&mode=video&sort=fees`
*   When the page loads, read the query parameters from the URL and apply the corresponding filters.
*   Ensure that when the user navigates back or forward, the filters remain applied based on the URL query parameters.

**7. Data-testid Attributes:**

*   Ensure that all specified `data-testid` attributes are correctly implemented for test automation. Do not reuse the same data-testid for different elements unless specified.

**8. API Data Structure:**

*   Be aware of the API data structure and use it appropriately when displaying and filtering data.
    *   id (String): Unique identifier for the doctor.
    *   name (String): Full name of the doctor.
    *   name\_initials (String): Initials of the doctor.
    *   photo (String): URL of the doctor's profile photo.
    *   doctor\_introduction (String): A brief introduction of the doctor, including qualifications, experience, and current practice.
    *   specialities (Array of Objects): A list of specialties the doctor practices. Each object contains a name (String) for the specialty.
    *   fees (String): Consultation fee for the doctor.
    *   experience (String): Total years of experience the doctor has.
    *   languages (Array of Strings): List of languages the doctor speaks.
    *   clinic (Object):
        *   clinic.name (String): Name of the clinic.
        *   clinic.address (Object): Contains the address details of the clinic.
            *   address.locality (String): Locality of the clinic.
            *   address.city (String): City where the clinic is located.
            *   address.address\_line1 (String): First line of the clinic's address.
            *   address.location (String): Geolocation (latitude, longitude) of the clinic.
        *   address.logo\_url (String): URL of the clinic's logo.
    *   video\_consult (Boolean): Whether the doctor offers video consultations.
    *   in\_clinic (Boolean): Whether the doctor offers in-clinic consultations.

**Example Implementation Notes:**

*   You can use libraries like `axios` or `fetch` to make API requests.
*   Use the `useState` hook to manage the state of the doctor list, filters, and search input.
*   Use the `useEffect` hook to fetch data from the API and to update the filters based on the URL query parameters.
*   Utilize `URLSearchParams` to handle URL query parameters.
*   Consider using functional components and hooks for a modern React approach.

**Deliverables:**

*   A fully functional React component that fetches data from the API, implements filtering, searching, and sorting, and updates the URL with query parameters.
*   Well-structured and commented code.
*   Correct implementation of `data-testid` attributes for all specified elements.
  