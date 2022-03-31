import Head from "next/head";
import Link from 'next/link';
import RecipesList from "../components/recipe-list";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { PlusIcon } from '@heroicons/react/outline';
import axios from "axios";

// IF we wanted to be server side generated
// export async function getStaticProps() {
//     const recipesList = await prisma.recipe.findMany({
//         where: { owner_id: session?.user.id },
//         orderBy: { name: "asc" },
//     });
//     return {
//         props: {
//             list: JSON.parse(JSON.stringify(recipesList)),
//         },
//     };
// }

export default function Home() {
    const router = useRouter();
    const { data: session } = useSession();
    const [keyword, setKeyword ] = useState(null);
    const [list, setList ] = useState([]);
    const user = session?.user;

    useEffect(async () => {
        try {
            const recipesList = await axios.get('/api/list');
            setList(recipesList.data);            
        } catch (error) {
            console.error(error);
        }
    }, []);

    const filteredList = () => {
        if (keyword) {
            return list.filter(one => {
                const expression = new RegExp(keyword, "si");
                return expression.test(one.name) || expression.test(one.content);
            });
        }
        return list;
    }

    return (
        <div className="main">
            <Head>
                <title>Recipes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <div className="row">
                    <div className="col text-end">
                        {user ? 
                            <>{user.email} <button className="btn btn-outline-secondary" onClick={() => signOut()}>Sign Out</button>  </>
                            : <Link href="/api/auth/signin"><button className="btn btn-outline-secondary">Sign In</button></Link>
                        }
                    </div>
                </div>
                <h1 className="text-center">Recipes Book</h1>
                {user ? 
                    <div className="row">
                        <div className="col text-center">
                            <PlusIcon className="text-secundary h-3 w-3 me-3 border rounded-pill" style={{'width': '30px'}} role="button" onClick={() => router.push("/create")}></PlusIcon>
                        </div>
                    </div>
                : null}
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="keyword">Keyword</label>
                            <input type="text" className="form-control" id="keyword" placeholder="Enter partial name or ingridient to filter recipes list" onChange={(event) => setKeyword(event.target.value)} />
                        </div>
                    </div>
                </div>
                <RecipesList list={filteredList()}></RecipesList>
            </div>
        </div>
    )
}
