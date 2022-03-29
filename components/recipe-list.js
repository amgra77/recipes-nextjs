import Card from  './card';

const RecipesList = ({ list }) => {
    const isEmpty = list.length === 0;
    return (
        <div className="row mt-2">
            {isEmpty ? <div>No Recipes...</div> : list.map(recipe => <Card recipe={recipe} key={recipe.id}></Card>)}
        </div>
    )
}

export default RecipesList;  

