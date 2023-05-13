import styled from "styled-components";
import { Form } from "formik";

export const StyledForm = styled(Form)`
  input {
    color: #000;
  }
  div {
    margin-bottom: 0;
    margin-top: 1rem;
  }

  .social-input i.fa-twitter {
    color: #38a1f3;
  }
  .social-input i.fa-facebook {
    color: #3b5998;
  }
  .social-input i.fa-instagram {
    color: #3f729b;
  }
  .social-input i.fa-youtube {
    color: #c4302b;
  }
  .social-input i.fa-linkedin {
    color: #0077b5;
  }

  .social-input {
    display: flex;
    align-items: center;
    justify-content: space-around;
    input {
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      display: block;
      flex-basis: 75%;
    }
  }
`;
