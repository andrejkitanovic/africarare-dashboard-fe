// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import crypto from "crypto";
import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";
import "jest-location-mock";

// jsdom doesn't support window.URL.createObjectURL, hence
// jest raises error TypeError: window.URL.createObjectURL is not a function

// mock window.crypto (required by auth0-spa-js)
Object.defineProperty(global, "crypto", {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
});

// this gets around "auth0-spa-js must run on a secure origin" error
// @ts-ignore
global.crypto.subtle = {};
