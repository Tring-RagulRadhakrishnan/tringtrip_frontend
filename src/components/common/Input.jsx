import React from "react";

const Input = ({ label, type, placeholder, register, name, error }) => {
    return (
        <>
            <label>{label}:</label>
            <input {...register(name, { required: `${label} is required `})} type={type} placeholder={placeholder} className="input" />
            {error && <p className="error">{error.message}</p>}
        </>
    );
};

export default Input;