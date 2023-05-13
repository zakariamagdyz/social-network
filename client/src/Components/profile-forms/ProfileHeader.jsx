import React from "react";
import styled from "styled-components";

const Header = styled.div`
  margin-bottom: 2rem;
  h1 {
    font-size: 4rem;
    color: var(--primary-color);
  }

  p {
    font-size: 1.8rem;
    margin: 1rem 0;
  }
`;

function ProfileHeader(props) {
  return <Header>{props.children}</Header>;
}

export default ProfileHeader;
