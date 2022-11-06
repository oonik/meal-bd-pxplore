const loadMeal = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => loadMealInformation(data.meals))
}

const loadMealInformation = meals =>{
     const mealsContainer = document.getElementById('meals-container');
     mealsContainer.innerHTML = '';
    meals.forEach(meal => {
        //console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col')
        mealDiv.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
      </div>
        `
       mealsContainer.appendChild(mealDiv) 

    });
}

const searchFood = () =>{
   const searchField = document.getElementById('Search-field');
   const FieldText = searchField.value ;
   searchField.value = '';
   loadMeal(FieldText)
}

const loadMealDetail = (idMeal) =>{
     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
     fetch(url)
     .then(res => res.json())
     .then(data => displayMealsDetail(data.meals[0]))
}

const displayMealsDetail = meal =>{
    const mealDetailContainer = document.getElementById('meal-details');
    mealDetailContainer.innerHTML = '';
    const detailDiv = document.createElement('div');
    detailDiv.classList.add('card')
    detailDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
    `
    mealDetailContainer.appendChild(detailDiv)
} 

loadMeal(' ')