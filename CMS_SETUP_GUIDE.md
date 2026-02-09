# 🚀 Chinonso Portfolio: CMS Setup Guide

This guide will walk you through setting up your Sanity.io CMS so you can manage your website content without coding.

---

## Step 1: Install Node.js (The Engine)
Before we start, your computer needs Node.js to run the CMS tools.
1.  Go to [nodejs.org](https://nodejs.org/).
2.  Download the **"LTS"** version (Recommended for most users).
3.  Run the installer and follow the prompts (keep clicking "Next").
4.  **Crucial:** Once installed, restart your VS Code or Terminal.

---

## Step 2: Create a Sanity.io Account
1.  Go to [Sanity.io](https://www.sanity.io/).
2.  Click **"Get Started"** or **"Sign Up"**.
3.  Create an account using your Google account or Email.
4.  Once logged in, you don't need to do anything on the website yet.

---

## Step 3: Link Your Code to Sanity
Now we need to create a project space for your data.
1.  Open your terminal in VS Code.
2.  Type this command to log in:
    ```bash
    npx sanity login
    ```
    (A browser window will open, click "Confirm").
3.  Navigate to the sanity folder and initialize:
    ```bash
    cd sanity
    npx sanity init
    ```
4.  Follow the prompts:
    *   "Create new project?" -> **Yes**
    *   "Project name:" -> **Chinonso Portfolio**
    *   "Use default dataset configuration (production)?" -> **Yes**
    *   "Project output path:" -> (Leave as current directory, just press Enter)
5.  **Copy your Project ID**: After it finishes, it will show a `projectId` (a random string like `abc123xy`).

---

## Step 4: Update the Configuration
Now you need to tell the website which project to fetch data from.

1.  **Open `sanityClient.js`** (in your main folder):
    *   Replace `'YOUR_PROJECT_ID'` with your actual ID.
2.  **Open `sanity/sanity.config.js`**:
    *   Replace `'YOUR_PROJECT_ID'` with your actual ID.
3.  **Open `sanity/sanity.cli.js`**:
    *   Replace `'YOUR_PROJECT_ID'` with your actual ID.

---

## Step 5: Install Dependencies & Start the Admin Panel
1.  In your terminal (still inside the `sanity` folder), run:
    ```bash
    npm install
    ```
2.  Once finished, start your local admin panel:
    ```bash
    npm run dev
    ```
3.  Open the link shown (usually `http://localhost:3333`).
4.  **Login again** and you'll see your dashboard for Experience, Publications, Skills, etc.

---

## Step 6: Add Your First Content
1.  In the dashboard, click on **"Profile Settings"**.
2.  Click the plus `+` to create a new profile.
3.  Fill in your name, title, tagline, and **upload your profile picture and CV**.
4.  Click **"Publish"** (the green button at the bottom).
5.  Repeat this for **"About Section"**, **"Experience"**, etc.

---

## Step 7: Final Deployment
To make the Admin Panel accessible from anywhere:
1.  In the `sanity` folder terminal, run:
    ```bash
    npx sanity deploy
    ```
2.  It will ask for a name (e.g., `chinonso-admin`).
3.  Once done, you can access your CMS at `https://yourname.sanity.studio`.

### Important Note for the Website (Vercel)
When you push your code to Vercel, make sure the `sanityClient.js` has your correct Project ID. Your website will now automatically fetch the content you published in the Sanity Studio!
