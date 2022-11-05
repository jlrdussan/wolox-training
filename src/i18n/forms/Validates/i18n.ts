import i18next from 'i18next';

i18next.addResources('es', 'FormsValidate', {
  required: 'El campo es requerido',
  emailInvalid: 'Email invalido',
  minLengthPass: 'El campo debe tener minimo 8 caracteres',
  passwordConfirm: 'Las contraseñas no coinciden',
  oneLetter: 'Debe contener al menos una letra mayuscula',
  oneNumber: 'Debe contener al menos un numero'
});

i18next.addResources('en', 'FormsValidate', {
  required: 'The field is required',
  emailInvalid: 'Invalid email',
  minLengthPass: 'The field must have a minimum of 8 characters',
  passwordConfirm: 'Passwords do not match',
  oneLetter: 'Must contain at least one uppercase letter',
  oneNumber: 'Must contain at least one number'
});
