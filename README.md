

# Annapurna 🙌
Website: [Annapurna](https://project-annapurna.azurewebsites.net/)

<div align="center">
  <br>
  <img src="https://img.shields.io/github/repo-size/subhashis2204/project-annapurna?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues/subhashis2204/project-annapurna?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues-closed-raw/subhashis2204/project-annapurna?style=for-the-badge" />
  <br>
  <img src="https://img.shields.io/github/forks/subhashis2204/project-annapurna?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues-pr/subhashis2204/project-annapurna?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues-pr-closed-raw/subhashis2204/project-annapurna?style=for-the-badge" />
  <br>
  <img src="https://img.shields.io/github/stars/subhashis2204/project-annapurna?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/subhashis2204/project-annapurna?style=for-the-badge" />
  <img src="https://img.shields.io/github/commit-activity/y/subhashis2204/project-annapurna?style=for-the-badge" />
</div>


# Food Donation Application 🤝

## Overview 🌟

This is a food donation application that connects NGOs and restaurants. The purpose of this platform is to enable restaurants to donate surplus food to people in need through partnering NGOs. The application includes features such as Google geocoding for location services 🌍, email OTP notifications ✉️ for secure authentication, and a contact us page 📞 for users to reach out with any inquiries or concerns.

Features 🚀

- **Restaurant Donation:** Restaurants can donate surplus food to NGOs through the platform.
- **NGO Partnership:** NGOs can receive food donations from restaurants and distribute them to people in need
- **Google Geocoding:** Integration with Google Geocoding API for accurate location services.
- **Email OTP Notifications:** Users receive One-Time Password (OTP) notifications via email for secure authentication. 
- **Contact Us Page:** Users can contact the support team or administration through the contact us page.
- **Authentication:** Implement authentication functionality to ensure secure access to the application's features and user data. This can include user registration, login, and session management, using techniques such as username/password or social media authentication. Authentication adds an extra layer of security and allows personalized user experiences within the platform.

## 🔖Steps to Contribute

Following are the steps to guide you:

Step 1: Fork the repo and Go to your Git terminal and clone it on your machine.
```
git clone https://github.com/<your_github_username>/project-annapurna.git
cd project-annapurna
```

Step 2: Add an upstream link to the main branch in your cloned repo
```
git remote add upstream https://github.com/<your_github_username>/project-annapurna.git
```

Step 3: Keep your cloned repo up to date by pulling from upstream (this will also avoid any merge conflicts while committing new changes)
```
git pull upstream main
```

Step 4: Create your feature branch (This is a necessary step, so don't skip it)
```
git checkout -b <branch-name>
```

Step 5: Track and stage your changes.
```
# Track the changes
 git status

 # After adding required changes
 git add .
```

Step 6: Commit all the changes (Write commit message as "Small Message")
```
git commit -m "<your-commit-message>"
```

Step 7: Push the changes for review
```
git push origin <branch-name>
```

Step 8: Create a PR on Github. (Don't just hit the create a pull request button, you must write a PR message to clarify why and what are you contributing)


## Configuring the .env file 

The following environment variable are necessary for configuring the project on your local - 

- ### **Azure** 

1. You must have an azure storage account for the project. Images are stored as a **blob** in azure. So we need to have a blob container which we would access through our **access keys**

> If you are a student then you can sign up for a $100 free credit on azure [here](https://azure.microsoft.com/en-in/free/students/)

![azure_sa_img](https://github.com/subhashis2204/project-annapurna/assets/76895635/1bd490ac-cf36-42df-ae52-091ff8e6bcc3)

2. After selecting the storage account. We need to create a new resource.

![azure_sa_create](https://github.com/subhashis2204/project-annapurna/assets/76895635/8b68b18f-b0eb-4fc4-8aed-60e092920ae9)

3. A form is displayed. You only need to fill in the type of subscription and the name of storage account. Leave rest to default. Then go to the resource and search for access keys.

![azure_sa_aks](https://github.com/subhashis2204/project-annapurna/assets/76895635/1acef25e-a733-4c3c-806d-67a7451bda58)

4. After clicking the *access keys*, we can see our **storage account name** and **connection string** (there are two of them, choose anyone) 

5. As a last step in the resource page, you have to set up the container where we would store the images. <br>
In your newly created storage acc dashboard, click on the blob storage

6. You must see a page where you can create a new container. **Remember this name as we need it**

> Environment variables to configure azure storage:
>
     CONTAINER_NAME = <BLOB STORAGE CONTAINER NAME>
     CONNECTION_STRING = <CONNECTION STRING FOR STORAGE ACCOUNT>

-  ### **Sendgrid email notification**

>Sendgrid is a bulk emailing service. This project uses Sendgrid along with nodemailer to send transactional emails.


1. To get started you must have a sendgrid account. You can create one [here](https://sendgrid.com/). You can opt for the free tier. It does not require any credit card.

2. After signup you need to create an API key. **copy the api key and save it somewhere since you won't be able to see it again**.

3. Since, we have reached this far. One final step is that we have to setup an email which would be authorized to send emails using sendgrid. 
 
Go to the dashboard and on the left pane go to **_settings_** --> **_sender authentication_** --> **_single sender verification_** --> click on **_create new sender_**
Fill in the necessary details and then you can start sending email using sendgrid. 

![sendgrid_auth2](https://github.com/subhashis2204/project-annapurna/assets/76895635/b8a52663-6c70-4ec6-b73a-a3eb62c52409)

> Environment variables to configure azure storage:
>
     CONTACTS_EMAIL_NAME = <CONTACT RECEIPIENT'S NAME>
     CONTACTS_EMAIL = <CONTACT US PAGE EMAIL>
     SENDER_MAIL = <SENDGRID VERIFIED EMAIL>
     SENDGRID_API_KEY = <YOUR API KEY>

- ### **Mongodb**

>For running our application we need a DB. This project uses mongodb as the database. You can create a free account on the mongodb website and create a db in the cloud.

1. First you have to create a **project**, then after creating a project you can create a DB.

2. Go to the dashboard and on the **left pane** search **deployments**, then click **Build a database**

![db_deploy](https://github.com/subhashis2204/project-annapurna/assets/76895635/9f4386b6-4f03-4dfd-8721-d728e00f7252)

3. You would be redirected to a page where you have to choose the config of database. Choose **free tier** and choose a cloud provider and **any region of your choice** and **choose a cluster name**

4. You would be provided a **username** and **password**. Note them down somewhere.

5. Scroll down to the IP access list. Add **0.0.0.0** as the ip. This would enable global access to your db. Click on **close**

![ip_access](https://github.com/subhashis2204/project-annapurna/assets/76895635/86e4a223-170f-4d32-ab7b-6551104a9a30)

> A typical mongodb url string looks like this : **_mongodb+srv://\<username\>:\<password\>@cluster345.hy4gkmn.mongodb.net/_**

The **username** is already given. You need to replace the **password** in the connection string. This gives the full connection string.

    `MONGODB_URL = <DB CONNECTION STRING>`

- **Google Maps API (OPTIONAL)**

>To show the google maps in the profile pages of restaurants and NGO we need to sign up for a google map API. This project specifically uses **GOOGLE maps Javascript API**.

    GOOGLEMAP_TOKEN = <YOUR API KEY GOES HERE>`

## Tech Stacks 💻

- **MongoDB:** NoSQL database used for storing and retrieving data.
- **Express:** Web application framework for building server-side applications.
- **Node.js:** Runtime environment for executing JavaScript code on the server.
- **EJS (Embedded JavaScript):** A templating engine that generates HTML markup with JavaScript.
- **JavaScript:** Programming language used for the application's logic and functionality.
- **HTML:** Markup language for creating the structure and content of web pages.
- **CSS:** Styling language for visually enhancing the user interface.

## Setup and Deployment ⚙️

To set up and deploy the application, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure environment variables for APIs and services.
4. Start the application: `nodemon index.js`
7.  Access the application in a web browser at `http://localhost:3000`. 
If you have any questions or need further clarification, please feel free to reach out. We appreciate your contribution to making the Food Donation Application a success!

# contributors 
<div align="center">
  <a href="https://github.com/subhashis2204/project-annapurna/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=subhashis2204/project-annapurna" alt="Contributors" />
  </a>
</div>

**Thanks for the contribution** 

