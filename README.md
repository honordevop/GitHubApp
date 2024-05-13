# GITHUB APP is a project submitted for 3MTT Frontend Engineering – Intermediate Module Assessment.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Built with

- ReactJs
- Tailwind
- Octokit [For API request implementation]

## Prerequisites

- [Node.js](https://nodejs.org/)

## Requirements / APP Features

- Fetch and display a list of all repository.
- Clicking on each of the repository on the list takes you to a page to page for the repo details.
- A create button that will display a modal that can be used to create a new repo.
- On the repo detail page, implement two button for update and delete features.
- Navigate to a particular repo details page using /repo/:id.
- 404 Not Found to handle navigating to url that does not exist

## Routes

````
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/repo/:id" element={<Repodetail />}></Route>
        <Route path="*" element={<NotFoundPage />} />{" "}
        {/* Catch-all route for 404 */}
      </Routes>
</BrowserRouter>

```

## Setup

- Install Nodejs
- Pull this repo
- run `npm install`
- create .env file
- Generate GitHub Token for your GitHub Dashboard
- update .env with the REACT_APP_GITHUB_TOKEN and REACT_APP_GITHUB_USERNAME
- run `npm start`

## Base URL

# On local host :

http://localhost:3000/

# Hosted on Netlify:

https://altgit.netlify.app/



# Endpoints

### Get all repos

- **Route**: GET /users/honordevop/repos
- **Method**: GET

````

```

### Update

- **Route**: /PATCH /repos/:owner/:repo
- **Method**: PATCH
- **Body**:

```

{
owner: process.env.REACT_APP_GITHUB_USERNAME,
repo: currentRepoTitle,
name: newRepoTitle,
description: newRepoDesc,
}

```

### Delete

- **Route**: /DELETE /repos/:owner/:repo
- **Method**: DELETE
- **Body**:


```

{
owner: process.env.REACT_APP_GITHUB_USERNAME,
repo: data.name,
}

```

```
