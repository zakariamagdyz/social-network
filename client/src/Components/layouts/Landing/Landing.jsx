import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../common/Button/Button";
import { LandingContainer, Overlay, LandingContent } from "./Landing.style";

const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LandingContainer>
      <Overlay>
        <LandingContent>
          <h1>Developer Connector</h1>
          <p>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div>
            <Button to="/register" bgcolor="#17a2b8" color="#fff">
              Sign Up
            </Button>
            <Button to="/login" bgcolor="#fff" color="#333">
              Login
            </Button>
          </div>
        </LandingContent>
      </Overlay>
    </LandingContainer>
  );
};

export default Landing;
