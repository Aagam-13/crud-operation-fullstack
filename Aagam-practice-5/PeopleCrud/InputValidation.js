// InputValidation.js

export const validateFirstName = (firstName) => {
    if (firstName.trim() === '') {
      return 'First Name should not be empty';
    } else if (firstName.length < 2) {
      return 'First Name should have at least 2 characters';
    }
    return '';
  };
  
  export const validateLastName = (lastName) => {
    if (lastName.trim() === '') {
      return 'Last Name should not be empty';
    }
    return '';
  };
  
  export const validateAge = (age) => {
    if (age === '' || isNaN(age) || age < 18 || age > 60) {
      return 'Age should be between 18 and 60';
    }
    return '';
  };
  