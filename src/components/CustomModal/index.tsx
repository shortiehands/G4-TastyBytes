import React, { Dispatch, JSX, SetStateAction, useState } from "react";
import { Modal } from "react-bootstrap";

interface CustomModalProps {
  show: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
  onHide?(): void;
  onProceed?(): void;
  responsiveIcon?(props: any): JSX.Element;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  setShow,
  onHide,
  onProceed,
  responsiveIcon: ResponsiveIcon,
  title,
  subtitle,
  children,
  style,
}) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      show={show}
      onHide={onHide}
      onProceed={onProceed}
      title={title}
      subtitle={subtitle}
      style={style}
    >
      <Modal.Header closeButton className="modal-footer border-0">
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <div style={{ padding: "0 0 1.5rem 0" }}>
          {ResponsiveIcon && <ResponsiveIcon />}
        </div>
        <div style={{ paddingTop: "1rem 0" }}>
          <span className="fw-bold" style={{ fontSize: "16px" }}>
            {title}
          </span>
        </div>
        <div style={{ padding: "1.3rem 0 0  0" }}>
          <span>{subtitle && subtitle}</span>
        </div>
        {children}
      </Modal.Body>
      <Modal.Footer
        className="modal-header border-0"
        style={{ display: "flex", justifyContent: "center" }}
      >
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
