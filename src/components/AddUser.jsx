import { useReducer, useEffect, useState } from "react";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_USER":
      return action.user;
    case "CLEAR_FORM":
      return initialFormState;
    default:
      return state;
  }
};

const AddUserForm = ({ addUser, isEditMode, currentUser, handleUpdate }) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [errors, setErrors] = useState({});

  // Update form state when editing
  useEffect(() => {
    if (isEditMode && currentUser) {
      dispatch({ type: "SET_USER", user: currentUser });
    } else {
      dispatch({ type: "CLEAR_FORM" });
    }
  }, [isEditMode, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditMode) {
        handleUpdate(formState);
      } else {
        addUser({ ...formState, id: Math.random(100) });
      }
      dispatch({ type: "CLEAR_FORM" });
    }
  };

  const validateForm = () => {
    const { name, email, phone } = formState;
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!phone) {
      errors.phone = "Phone number is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4">
      <div className="mb-3">
        <input
          className="w-full px-3 py-4 bg-slate-50 outline-none shadow-md"
          type="text"
          placeholder="Name*"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      <div className="mb-3">
        <input
          className="w-full px-3 py-4 mb-3 bg-slate-50 outline-none shadow-md"
          type="email"
          placeholder="Email*"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-3">
        <input
          className="w-full px-3 py-4 mb-3 bg-slate-50 outline-none shadow-md"
          type="text"
          placeholder="Phone*"
          value={formState.phone}
          name="phone"
          onChange={handleInputChange}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>
      <button
        type="submit"
        className="bg-red-400 w-full p-4 mt-10 text-white rounded-md"
      >
        {isEditMode ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default AddUserForm;
