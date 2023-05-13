import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
  --primary-color: #17a2b8;
  --dark-color: #343a40;
  --light-color: #f4f4f4;
  --danger-color: #dc3545;
  --success-color: #28a745;

  font-size:62.5%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "raleway", sans-serif;
  font-size: 1.6rem;
  line-height: 1.6;
  background-color: #fff;
  color: #333;
  position: relative;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  width: 100%;
}


.react-datepicker {
  font-size: 1.6rem !important;
}

.react-datepicker__current-month {
  font-size: 1.7rem !important;
}

.react-datepicker__header {
  padding-top: 9px !important;
}

.react-datepicker__navigation {
  top: 15px !important;
}

.react-datepicker__day-name, .react-datepicker__day {
  margin: 0.7rem !important;
}

`;
