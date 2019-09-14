import validator from 'validator';
import { isEmpty } from '../shared/utility';

const validateRegister = (data) => {
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  let errors = {};
  
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (validator.isLength(data.password, {min: 30})) {
    errors.password = 'Password should be atleast 6 characters';
  }
  
  return {
    isValid: isEmpty(errors),
    errors,
  }
};

export default validateRegister;