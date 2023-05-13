import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import RadioButtons from "./RadioButtons";
import CheckboxButtons from "./CheckboxButtons";
import DatePicker from "./Datepicker";
import DateRange from "./DateRange";

const FormControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxButtons {...rest} />;
    case "datepicker":
      return <DatePicker {...rest} />;

    case "daterange":
      return <DateRange {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
