import Card from  './card';
import { useSession } from "next-auth/react";
import Link from 'next/link';

const RecipesList = ({ list, onUpdateList }) => {
    const isEmpty = list.length === 0;
    const { data: session } = useSession();
    return (
        <div className="row mt-2">
            {isEmpty ? 
                <div>
                    <div className="row empty-list">
                        {[...Array(4)].map((x, i) =>
                        <div key={`empty${i}`} className="col col-sm-12 col-lg-3">
                            <div className="card">
                                <div className="card-header">Name Placeholder</div>
                                <div className="card-body">* Instructions...</div>
                            </div>
                        </div>
                        )}
                    </div>
                    <p>You do not have recipes yet...</p>
                    {session ?
                        <Link href="/create">
                            <a>Create a new recipe now</a>
                        </Link>
                        : <p>
                            You need to <Link href="/api/auth/signin"><a>login</a></Link> first to create a new recipe
                        </p>}
                </div>
                : list.map(recipe => <Card recipe={recipe} key={recipe.id} onUpdateList={onUpdateList}></Card>)
            }
        </div>
    )
}

export default RecipesList;