import React, { Dispatch, SetStateAction, useState } from "react";
import CustomModal from "../CustomModal";
import { SuccessIcon, FailIcon } from "../Images";
import { ContextContainer, ButtonContainer } from "./styles";
import CustomButton from "../CustomButton";
import TextField from "../FormLayout/TextField";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { Sms } from "iconsax-react";

interface ModalProps {
  show: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
  isSuccess?: boolean;
  warningError?: boolean;
  onHide?(): void;
  onProceed?(): void;
  onClose?(): void;
  title?: string;
  subtitle?: string;
  body?: string;
}

const ModalResult: React.FC<ModalProps> = ({
  show,
  setShow,
  isSuccess,
  warningError,
  onHide,
  onProceed,
  onClose,
  title,
  subtitle,
  body,
}) => {
  const [detailsError, setDetailsError] = useState("");

  const handleClose = () => {
    if (!!onHide) {
      onHide();
    }

    if (setShow) {
      setShow(false);
    }
  };

  const handleChange = () => {
    if (!!onProceed) {
      onProceed();
    }

    if (setShow) {
      setShow(false);
    }
  };

  return (
    <CustomModal
      show={show}
      setShow={setShow}
      onHide={handleClose}
      onProceed={handleChange}
      title={title}
      subtitle={subtitle}
      responsiveIcon={
        isSuccess ? SuccessIcon : warningError ? FailIcon : FailIcon
      }
    >
      {show && (
        <>
          <ContextContainer>{body}</ContextContainer>
          {isSuccess ? (
            <ButtonContainer>
              <CustomButton
                style={{ width: "19.438rem", height: "3.125rem" }}
                title="Done"
                onClick={handleClose}
              />
            </ButtonContainer>
          ) : warningError ? (
            <ButtonContainer>
              <CustomButton
                style={{ width: "19.438rem", height: "3.125rem" }}
                title="Close"
                onClick={handleClose}
              />
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <CustomButton
                style={{
                  background: "white",
                  color: "#134da3",
                  width: "9.125rem",
                  height: "3.125rem",
                }}
                title="Cancel"
                onClick={handleClose}
              />
              <CustomButton
                style={{ width: "9.125rem", height: "3.125rem" }}
                title="Yes"
                onClick={onProceed}
              />
            </ButtonContainer>
          )}
        </>
      )}
    </CustomModal>
  );
};

export default ModalResult;
