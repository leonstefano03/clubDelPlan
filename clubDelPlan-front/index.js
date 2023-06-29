import { registerRootComponent } from "expo";

import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./css/index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import UserContextProvider from "./context/userContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <UserContextProvider>
//         <App />
//       </UserContextProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
