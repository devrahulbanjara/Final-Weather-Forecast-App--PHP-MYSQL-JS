# Weather Application

## Project Setup Instructions

Follow the steps below to set up and run this project using XAMPP on your local machine.

### Prerequisites

- XAMPP installed on your machine.

### Steps to Run the Project

1. **Download and Install XAMPP:**
   - Go to the [XAMPP website](https://www.apachefriends.org/download.html) and download the latest version for your operating system.
   - Install XAMPP by following the installation instructions for your platform.

2. **Place Files in `htdocs`:**
   - After installation, navigate to the XAMPP `htdocs` directory:
     - On Linux:
       ```bash
       /opt/lampp/htdocs/
       ```
     - On Windows:
       ```
       C:/xampp/htdocs/
       ```
   - Copy all the project files (HTML, PHP, CSS, JS, etc.) into the `htdocs` folder.

3. **Create a Database:**
   - Start the **Apache** and **MySQL** services using the XAMPP Control Panel:
     - On Linux, run the following command:
       ```bash
       sudo /opt/lampp/lampp start
       ```
     - On Windows, open the XAMPP Control Panel and click "Start" next to Apache and MySQL.
   
   - Open your browser and go to:
     ```
     http://localhost/phpmyadmin
     ```
   - In phpMyAdmin, create a new database named **`weather`**.

4. **Import the SQL File:**
   - After creating the database, import the provided SQL file to set up the required tables and data:
     - In phpMyAdmin, select the `weather` database.
     - Go to the "Import" tab.
     - Click "Choose File" and select the provided SQL file ('weather_details.sql`).
     - Click "Go" to import the database structure and data.

5. **Access the Application:**
   - Ensure that Apache and MySQL servers are running.
   - Open your browser and go to:
     ```
     http://localhost/index.html
     ```
   - The project should now be running successfully.

### Troubleshooting

- If you encounter any issues, make sure:
  - Apache and MySQL are running in XAMPP.
  - The files are placed in the correct `htdocs` directory.
  - The database is correctly set up and the SQL file is imported without errors.

---

This project allows you to run a weather application locally using PHP and MySQL through XAMPP.
