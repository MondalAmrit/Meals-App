import React, {useEffect, useState} from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				"https://meals-app-9c721-default-rtdb.firebaseio.com"
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const responseData = await response.json();
			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().then().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});;
	}, []);

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes.mealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => {
		return (
			<MealItem
				id={meal.id}
				key={meal.id}
				name={meal.name}
				description={meal.description}
				price={meal.price}
			/>
		);
	});

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
