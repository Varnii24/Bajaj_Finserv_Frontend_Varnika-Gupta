Doctor Search & Filter Web Application-
This web application is designed to help users easily search, filter, and sort a list of doctors based on various parameters. It integrates with an API to fetch doctor data and provides an interactive user interface where users can apply filters, perform searches, and sort doctors according to their preferences. The layout includes a toggleable sidebar that enhances the user experience, and the system supports persistent filter selections through URL query parameters. Additionally, it has been designed with test automation in mind, including specific data attributes to support testing processes.

Features:-
The application offers an autocomplete search bar that allows users to quickly find doctors by typing their names. It includes a filtering feature that lets users narrow down the doctor list based on specialties and consultation modes such as video consult or in-clinic visits. Sorting functionality is also provided, enabling users to sort doctors either by their consultation fees or years of experience. 
The sidebar, which contains the filters, can be toggled between expanded and minimized views, and the display area for doctor cards dynamically adjusts to these changes for a responsive layout. Importantly, any filters or sorting preferences selected by the user are reflected in the URL, allowing the same filters to persist when the user navigates back and forth in the browser.


Setup Instructions:-
To set up this project on a local machine, one would typically begin by ensuring the necessary software is installed, such as Node.js and a package manager. After obtaining the project files, the next step would involve installing dependencies and starting the development server. Once running, the application can be accessed locally in a web browser.


Technology Stack:-
The frontend is built using Next.js, leveraging hooks for state management and the Fetch API to interact with external data sources. The user interface is styled using CSS or SCSS, ensuring a clean and modern look. For testing, tools like Jest and React Testing Library are used to verify the application's functionality and maintain code reliability.

API Documentation:-
The application relies on an API that provides detailed information about each doctor. The data structure typically includes fields like doctor ID, name, photo, introduction, specialty, fees, experience, languages spoken, and consultation modes. It also includes clinic-related details such as the clinic name, location, and address. This information is dynamically fetched and rendered on the frontend based on the user’s interactions.

Frontend Interaction:-
Users interact with the application primarily through the search bar and filter sidebar. The search feature offers autocomplete suggestions based on the user's input. Filters allow users to choose specialties or consultation modes, while sorting options help organize doctors by experience or fees. The sidebar can be expanded or minimized using a toggle button, which dynamically adjusts the layout of the doctor display area to enhance usability and visibility on different screen sizes.

