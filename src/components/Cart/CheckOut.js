import { useRef, useState } from 'react';
import styles from './CheckOut.module.css';

const isEmpty = (value) => value.trim() === '';
const isNotFiveCharacters = (value) => value.trim().length !== 5;

const CheckOut = (props) => {
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const nameIsValid = !isEmpty(enteredName);
    const cityIsValid = !isEmpty(enteredCity);
    const postalCodeIsValid = !isNotFiveCharacters(enteredPostalCode);
    const streetIsValid = !isEmpty(enteredSreet);
    setFormInputIsValid({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });
    const formIsValid =
      nameIsValid && cityIsValid && postalCodeIsValid && streetIsValid;
    if (!formIsValid) {
      return;
    }
    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      street: enteredSreet,
    });
  };
  const nameClasses = `${styles.control} ${
    formInputIsValid.name ? '' : styles.invalid
  }`;
  const streetClasses = `${styles.control} ${
    formInputIsValid.street ? '' : styles.invalid
  }`;
  const postalCodeClasses = `${styles.control} ${
    formInputIsValid.postalCode ? '' : styles.invalid
  }`;
  const cityClasses = `${styles.control} ${
    formInputIsValid.city ? '' : styles.invalid
  }`;
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputIsValid.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInputRef} />
        {!formInputIsValid.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" ref={postalCodeInputRef} />
        {!formInputIsValid.postalCode && (
          <p>Please enter a valid postalCode.</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
        {!formInputIsValid.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onClose}>
          Close
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default CheckOut;
