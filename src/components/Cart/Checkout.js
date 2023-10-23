import {useRef, useState} from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const nameIsValid = !isEmpty(enteredName);
		const streetIsValid = !isEmpty(enteredStreet);
		const postalCodeIsValid = isFiveChars(enteredPostalCode);
		const cityIsValid = !isEmpty(enteredCity);

		setFormInputsValidity({
			name: nameIsValid,
			street: streetIsValid,
			postalCode: postalCodeIsValid,
			city: cityIsValid,
		});

		const formIsValid =
			nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

		if (!formIsValid) {
			return;
        }
        
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalcode: enteredPostalCode,
            city: enteredCity,
        });
	};

	const nameControlClasses = `${classes.control} ${
		formInputsValidity.name ? "" : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formInputsValidity.street ? "" : classes.invalid
	}`;
	const postalCodeControlClasses = `${classes.control} ${
		formInputsValidity.postalCode ? "" : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formInputsValidity.city ? "" : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
			</div>
			{!formInputsValidity.name && <p>Please enter a valid name.</p>}
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
			</div>
			{!formInputsValidity.street && <p>Please neter a valid street.</p>}
			<div className={postalCodeControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalInputRef} />
			</div>
			{!formInputsValidity.postalCode && (
				<p>Please enter a valid postal code (5 characters long).</p>
			)}
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
			</div>
			{!formInputsValidity.city && <p>Please enter a valid city.</p>}
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
