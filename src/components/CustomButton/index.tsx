import React from "react";
import { Button } from "react-bootstrap";
interface CustomButtonProps {
  path?: string;
  title?: string;
  style?: React.CSSProperties;
  onClick?(event: any): void;
  type?: "submit" | "reset" | "button" | undefined;
  variant?: string;
  className?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  path,
  title,
  style,
  onClick,
  type,
  variant,
  className,
  disabled,
}) => {
  return (
    <div>
      <Button
        style={
          type === "submit"
            ? {
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                marginTop: "1.5rem",
                width: "100%",
              }
            : style
        }
        className={className}
        type={type}
        variant={variant ? variant : "primary"}
        disabled={disabled ? disabled : false}
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  );
};

export default CustomButton;
