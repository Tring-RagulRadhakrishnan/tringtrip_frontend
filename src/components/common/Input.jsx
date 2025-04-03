import React from "react";

const Input = ({ label, type, placeholder, register, name,validation, error, disabled }) => {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input {...register(name, validation)} type={type} placeholder={placeholder} disabled={disabled} className="input" />
            {error && <p className="error">{error.message}</p>}
        </div>
    );
};

export default Input;