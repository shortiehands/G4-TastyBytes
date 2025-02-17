import React, { useState } from "react";

const OtpPopup = ({ isOpen, onClose, onSubmit }) => {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    
    <div className="otp-popup">
        <div className="otp-popup-box">
        <button onClick={onClose} className="close-btn">×{}</button>
        <h2 className="otp-popup-heading">Enter OTP</h2>
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="otp-input" placeholder="Enter OTP"/>
        
        <button onClick={handleSubmit} className="otp-submit-button">Verify OTP</button>
        
        </div>

    </div>

  );
};

export default OtpPopup;
