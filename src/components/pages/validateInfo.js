import valid from "card-validator";

export default function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.cardnumber);

  creditCard.expirationDate = valid.expirationDate(values.expirydate);
  creditCard.cvv = valid.cvv(values.cardsecuritycode);
  creditCard.cardholderName = valid.cardholderName(values.cardname);
  
  errors.cname = false;
  errors.cnumber = false;
  errors.cexp = false;

  //Card Expiration Verification
  if (values.expirydate === null || !values.expirydate.trim()) {
    errors.message = "Credit card expiration date is not complete";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Credit card expiration date is invalid";
  }
  //Card Number Verification
  if (values.cardnumber === null || !values.cardnumber.trim()) {
    console.log(values.cardnumber)
    errors.message = "Credit card number is not complete";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
  }

  //Cardholder Name Verification
  if (values.cardname === null || !values.cardname.trim()) {
    errors.message = "Cardholder name is not complete";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Cardholder name is invalid";
  }
  if (
   
    errors.cname &&
    errors.cnumber &&
    errors.cexp 
  ) {
    errors.variant = "success";
    errors.message = "Credit Card is valid";
  }
  return errors;
}
