export const validation = {
    name: {
      required: "name is required",
      pattern: {
        value: /^[A-Za-z ]+$/,
        message: "Name should only contain letters and spaces.",
      },
      minLength: {
        value: 3,
        message: "Name should be at least 3 character.",
      },
    },
    email: {
      required: "email is required",
      pattern: {
        value: /^[a-z0-9-._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Invalid email format",
      },
    },
    phone_number: {
      required: "phone number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Phone number must be exactly 10 digits long.",
      },
    },
    password: {
      required: "password is required",
      minLength: {
        value: 8,
        message: "Password should be at least 8 character.",
      },
      
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "include uppercase, number, and special character",
      },
    },
  };
  