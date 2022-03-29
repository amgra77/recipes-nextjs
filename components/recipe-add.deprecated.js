import { useState } from 'react';

const RecipeAdd = ({ onAdd, onCancel }) => {
    const [recipeName, setRecipeName] = useState(null);
    const [recipeContent, setRecipeContent] = useState(null);
    return (
        <div className="card d-flex">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="recipeName">Recipe Name</label>
                            <input type="text" id="recipeName" className="form-control" onChange={(e) => setRecipeName(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="recipeContent">Instructions</label>
                            <textarea name="content" cols="30" rows="10" className="form-control" id="recipeContent" onChange={(e) => setRecipeContent(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col">
                        <button type="button" className="btn btn-primary" onClick={() => onAdd({recipeName, recipeContent})}>Add</button>
                        <button type="button" className="btn btn-flat" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeAdd;

