# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Notes

- Used design system where we can put common design components like searchField, Image and many more which needs to be used in multiple components
- Currently used fetch to call API in useEffect. We can also use react useQuery function from react-query library and pass data as props.
- Did client side search functionality
- Hide the scroll bars
- Created a common component for back button and passed onclick also as props where we can add a functionality where we can do what we want to do on back.
- Showing list in grid of 3.
- Using react lazy loading library to lazy load the images.
