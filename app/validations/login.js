import validator from 'validator';
import { isEmpty } from '../shared/utility';

const validateLogin = (data) => {
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  let errors = {};
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  }
}

export default validateLogin;
