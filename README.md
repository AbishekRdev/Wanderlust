# Wanderlust

Wanderlust is a web application that allows users to explore and create travel listings. Users can post listings for various destinations, view details of those listings, and leave reviews. The app also supports geolocation integration for addresses and image management for each listing via Cloudinary. The application features user authentication, and it's built using the MERN stack (MongoDB, Express, React, Node.js), along with several other useful libraries and APIs.

**Check out the live version of Wanderlust here:** [Wanderlust Live](https://wanderlust-vtw3.onrender.com)
## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Listing Management**: Users can create, update, and delete travel listings.
- **Reviews**: Users can post, edit, and delete reviews on listings.
- **Geolocation**: Locations for listings are geocoded using the MapTiler API.
- **Image Upload**: Users can upload images for their listings, managed through Cloudinary.
- **Session Management**: Sessions are managed using MongoDB and Express sessions.
- **Flash Messages**: Flash messages display success or error notifications throughout the app.
  
## Technologies Used

- **Node.js** and **Express.js** for backend development
- **MongoDB** for database management, using **Mongoose** for object data modeling (ODM)
- **Passport.js** for local user authentication
- **Cloudinary** for image storage and management
- **Axios** for making HTTP requests (geocoding locations)
- **EJS** for rendering dynamic views on the frontend
- **Multer** for handling file uploads
- **Connect-flash** for showing flash messages (e.g., success, error notifications)
- **Method-Override** to support HTTP verbs like PUT and DELETE in forms
- **dotenv** for managing environment variables
- **MapTiler API** for geolocation (getting longitude and latitude based on a given address)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.
- A MongoDB database (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution).
- A Cloudinary account to manage images (optional for image management).

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/wanderlust.git
    ```

2. **Navigate into the project directory**:
    ```bash
    cd wanderlust
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the root of your project and add the following keys:
    ```env
    ATLASTDB_URL=mongodb://yourdburl
    SECRET=yoursecretkey
    MAP_API_KEY=yourmaptilerapi_key
    CLOUDINARY_CLOUD_NAME=yourcloudname
    CLOUDINARY_API_KEY=yourapikey
    CLOUDINARY_API_SECRET=yourapisecret
    ```

5. **Run the application**:
    ```bash
    npm start
    ```

    The app will now be running at `http://localhost:8080`.



