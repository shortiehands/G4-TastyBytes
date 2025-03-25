import React, { HTMLInputTypeAttribute } from "react";
import { Form } from "react-bootstrap";

interface TextFieldProps {
  id?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  value?: string | number;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  type,
  label,
  value,
  style,
  onChange,
}) => {
  return (
    <Form.Group>
      <Form.Control
        id={id}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        style={style}
      />
    </Form.Group>
  );
};

export default TextField;
