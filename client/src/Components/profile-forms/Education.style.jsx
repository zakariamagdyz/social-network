import styled from "styled-components";
import { Form } from "formik";

export const DataContainer = styled.div``;

export const DataForm = styled(Form)`
  && {
    input,
    textarea {
      font-size: 1.7rem;
      margin-bottom: 1rem;
    }

    label {
      font-size: 2rem;
    }

    input + label {
      font-size: 1.4rem;
      margin-left: 0.6rem;
    }
    .react-datepicker-wrapper {
      display: block;
    }

    input:disabled {
      background: #ccc;
    }
  }
`;

export const CurrentContainer = styled.div`
  display: flex;
  align-items: center;
  input {
    margin: 0 !important;
    width: 1.6rem;
    height: 1.6rem;
  }
  label {
    font-size: 1.8rem !important;
  }
  margin-top: -1rem;
  margin-bottom: 1.5rem;
`;
