<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->

<div align = "center">

# [Annapurna 🙌](https://project-annapurna.azurewebsites.net/)
![project-annapurna](https://socialify.git.ci/subhashis2204/project-annapurna/image?description=1&descriptionEditable=A%20Food%20Donation%20Application%20that%20connects%20NGOs%20and%20restaurants&font=Jost&forks=1&issues=1&language=1&logo=https%3A%2F%2Fwww.nicepng.com%2Fpng%2Ffull%2F14-145168_plate-knife-and-fork-png-clipart-plate-and.png&name=1&owner=1&pattern=Solid&pulls=1&stargazers=1&theme=Dark)

![License](https://img.shields.io/github/license/subhashis2204/project-annapurna.svg?style=for-the-badge&logo=unlicense&logoColor=white)
![Downloads](https://img.shields.io/github/downloads/subhashis2204/project-annapurna/total.svg?style=for-the-badge&logo=githubsponsors&logoColor=white)
![Followers](https://img.shields.io/github/followers/subhashis2204.svg?style=for-the-badge&label=Follow&maxAge=2592000&logo=github&logoColor=white)
![Forks](https://img.shields.io/github/forks/subhashis2204/project-annapurna.svg?style=for-the-badge&logo=justeat&logoColor=white)
![Stars](https://img.shields.io/github/stars/subhashis2204/project-annapurna.svg?style=for-the-badge&logo=coveralls&logoColor=white)
![Issues Open](https://img.shields.io/github/issues/subhashis2204/project-annapurna.svg?style=for-the-badge&logo=jabber&logoColor=white)
![Issues Closed](https://img.shields.io/github/issues-closed/subhashis2204/project-annapurna.svg?style=for-the-badge&logo=hackthebox&logoColor=white)
![PR Open](https://img.shields.io/github/issues-pr/subhashis2204/project-annapurna.svg?style=for-the-badge&logo=eclipseche&logoColor=white)
![PR Closed](https://img.shields.io/github/issues-pr-closed/subhashis2204/project-annapurna.svg?style=for-the-badge&logo=dynatrace&logoColor=white)
<br><br> 
This is a **food donation application** that connects NGOs and restaurants. 
<br><br>
The purpose of this platform is to enable restaurants to donate surplus food to people in need through partnering NGOs. <br><br>The application includes features such as <br>
Google geocoding 🌍 • Email OTP notifications ✉️ • Contact Us page 📞
<br><br>
  
[Features](#features) • [How To Contribute](#how-to-contribute) • [Getting Started](#getting-started) • [Setup Guidelines](#setup-guidelines)
  • [Tech Stacks](#tech-stacks) • [Contributors](#contributors) 
</div>

## Features

**Features** | **Details**
| :--- | :--- 
 **Restaurant Donation** | Restaurants can donate surplus food to NGOs through the platform. 
 **NGO Partnership** | NGOs can receive food donations from restaurants and distribute them to people in need 
 **Google Geocoding** | Integration with Google Geocoding API for accurate location services. 
 **Email OTP Notifications** | Users receive One-Time Password (OTP) notifications via email for secure authentication. 
 **Contact Us Page** | Users can contact the support team or administration through the contact us page. 
 **Authentication** | Implement authentication functionality to ensure secure access to the application's features and user data. This can include user registration, login, and session management, using techniques such as username/password or social media authentication. Authentication adds an extra layer of security and allows personalized user experiences within the platform. 
 
<hr>

##  How to contribute

This can be done in 8 simple steps - 

- Step 1: Fork the repo and go to your git terminal and clone it on your machine
    ```sh
    git clone https://github.com/<your_github_username>/project-annapurna.git
    cd project-annapurna
    ```
  
- Step 2: Add an upstream link to the main branch in your cloned repo
    ```sh
    git remote add upstream https://github.com/<your_github_username>/project-annapurna.git
    ```
- Step 3: Keep your cloned repo up to date by pulling from upstream
   This will also avoid any merge conflicts while committing new changes.
    ```sh
    git pull upstream main
    ```
- Step 4: Create your feature branch
   This is a necessary step, so don't skip it
    ```sh
    git checkout -b <branch-name>
    ```
- Step 5: Track and stage your changes
    ```sh
    # Track the changes
    git status
    # After adding required changes
    git add .
    ```
- Step 6: Commit all the changes
    Write commit message as "Small Message"
    ```sh
    git commit -m "<your-commit-message>"
    ```
- Step 7: Push the changes for review
    ```sh
    git push origin <branch-name>
    ```
- Step 8: Create a PR on Github
    ```sh
    Don't just hit the create a pull request button, you must write a PR message to clarify why and what are you contributing
    ```

<hr>

## Getting started 

The following environment variable are necessary for configuring the project in your local - 

### **1. Azure** 

- Step 1: Create an Azure account
> You must have an azure storage account for the project.
> <br>
> Images are stored as a **blob** in azure. So we need to have a blob container which we would access through our **access keys**
> <br>
> If you are a student then you can sign up for a $100 free credit on azure [here](https://azure.microsoft.com/en-in/free/students/)
> <br><br>
> ![azure_sa_img](https://github.com/subhashis2204/project-annapurna/assets/76895635/1bd490ac-cf36-42df-ae52-091ff8e6bcc3)

- Step 2: Creating a new resource
> After selecting the storage account. We need to create a new resource.
> <br><br>
> ![azure_sa_create](https://github.com/subhashis2204/project-annapurna/assets/76895635/8b68b18f-b0eb-4fc4-8aed-60e092920ae9)

- Step 3: Fill the form
> A form is displayed. You only need to fill in the type of subscription and the name of storage account. 
> <br>
> Leave rest to default. Then go to the resource and search for access keys.
> <br><br>
> ![azure_sa_aks](https://github.com/subhashis2204/project-annapurna/assets/76895635/1acef25e-a733-4c3c-806d-67a7451bda58)

- Step 4: Choose connnection string
> After clicking the *access keys*, we can see our **storage account name** and **connection string** (there are two of them, choose anyone)

- Step 5: Setting up container
> As a last step in the resource page, you have to set up the container where we would store the images.
> <br>
> In your newly created storage acc dashboard, click on the blob storag
> <br>
> You must see a page where you can create a new container. **Remember this name as we need it**
> <br>
> Environment variables to configure azure storage:
> ```sh
> CONTAINER_NAME = <BLOB STORAGE CONTAINER NAME>
> CONNECTION_STRING = <CONNECTION STRING FOR STORAGE ACCOUNT>
> ```
  
<br>

### **2. Sendgrid email notification**

Sendgrid is a bulk emailing service. This project uses Sendgrid along with nodemailer to send transactional emails.
  
Follow these steps to enable sendgrid email notification - 
- Step 1: To get started you must have a sendgrid account. You can create one [here](https://sendgrid.com/). You can opt for the free tier. It does not require any credit card.
- Step 2: After signup you need to create an API key. **copy the api key and save it somewhere since you won't be able to see it again**.
- Step 3: Since, we have reached this far. One final step is that we have to setup an email which would be authorized to send emails using sendgrid.


<details>
<summary>What's next ?</summary>
  <pre>
  Go to the dashboard and on the left pane go to <b>_settings_</b> → <b>_sender authentication_</b> → <b>_single sender verification_</b> → click on <b>_create new sender_</b> <br>
  Fill in the necessary details and then you can start sending email using sendgrid. <br>
  <img src = "https://github.com/subhashis2204/project-annapurna/assets/76895635/b8a52663-6c70-4ec6-b73a-a3eb62c52409">
  </pre>
</details>

> Environment variables to configure azure storage:
> ```sh
> CONTACTS_EMAIL_NAME = <CONTACT RECEIPIENT NAME>
> CONTACTS_EMAIL = <CONTACT US PAGE EMAIL>
> SENDER_MAIL = <SENDGRID VERIFIED EMAIL>
> SENDGRID_API_KEY = <YOUR API KEY>
> ```
  
<br>

### **3. MongoDB**

> For running our application we need a DB. This project uses mongodb as the database. You can create a free account on the mongodb website and create a db in the cloud.

- Step 1: First you have to create a **project**, then after creating a project you can create a DB.

- Step 2: Go to the dashboard and on the **left pane** search **deployments**, then click **Build a database**
> ![db_deploy](https://github.com/subhashis2204/project-annapurna/assets/76895635/9f4386b6-4f03-4dfd-8721-d728e00f7252)

- Step 3: You would be redirected to a page where you have to choose the config of database. Choose **free tier** and choose a cloud provider and **any region of your choice** and **choose a cluster name**>

- Step 4: You would be provided a **username** and **password**. Note them down somewhere.

- Step 5: Scroll down to the IP access list. Add **0.0.0.0** as the ip. This would enable global access to your db. Click on **close**
> ![ip_access](https://github.com/subhashis2204/project-annapurna/assets/76895635/86e4a223-170f-4d32-ab7b-6551104a9a30)
> A typical mongodb url string looks like this : 
> ```sh
> _mongodb+srv://\<username\>:\<password\>@cluster345.hy4gkmn.mongodb.net/_
> ```
> The **username** is already given. You need to replace the **password** in the connection string. This gives the full connection string.
> ```sh
> MONGODB_URL = <DB CONNECTION STRING>
> ```
  
<br>

### **4. Google Maps API (OPTIONAL)**

> To show the google maps in the profile pages of restaurants and NGO we need to sign up for a google map API. This project specifically uses **GOOGLE maps Javascript API**.<br>
> ```sh
> GOOGLEMAP_TOKEN = <YOUR API KEY GOES HERE>
> ```
  
<hr>
  
## Setup Guidelines
  
To set up and deploy the application, follow these steps:
  
- Clone the repository: `git clone <repository-url>`      
- Install dependencies: `npm install`      
- Configure environment variables for APIs and services.      
- Start the application: `nodemon index.js`      
- Access the application in a web browser at `http://localhost:3000`.    
<br>
If you have any questions or need further clarification, please feel free to reach out. We appreciate your contribution to making the Food Donation Application a success!
  
<hr>
  
## Tech stacks

<div align = "center">
  <img src = "https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" height = "50px">
  <img src = "https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" height = "50px">
  <img src = "https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" height = "50px">
  <img src = "https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" height = "50px">
  <img src = "https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" height = "50px">
  <img src = "https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" height = "50px">
  <img src = "https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" height = "50px">
  <img src = "https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" height = "50px">
</div>  
  
<hr>

## Contributors
<div align="center">
  <a href="https://github.com/subhashis2204/project-annapurna/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=subhashis2204/project-annapurna" alt="Contributors" />
  </a>

**Thanks for the contribution** 
</div>

