import Head from 'next/head';
import { prisma } from '../lib/db'
import { useRouter } from 'next/router';
import Link from 'next/link';

const Recipe = (recipe) => {
    const router = useRouter();

    if (router.isFallback) {
        return 'Loading...';
    }

    return (
        <div className="container">
            <Head>
                <title>Recipe</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='container'>
                <div className="card">
                    <div className="card-header">
                        {recipe.name}
                    </div>
                    <div className="card-body">
                        <textarea cols={130} rows={25} readOnly={true} className='form-control' value={recipe.content}></textarea>
                        <br />
                        <Link replace={true} href={`/${recipe.id}/edit`}>
                            <button className="btn btn-secondary">Edit</button>
                        </Link>
                        <Link replace={true} href={`/`}>
                            <button className="btn btn-flat">Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const recipes = await prisma.recipe.findMany({ select: { id: true } });
    return {
        paths: recipes.map(recipe => ({
            params: { id: recipe.id },
        })),
        fallback: true,
    };
}

// In development this runs every time
export async function getStaticProps({ params }) {
    const recipe = await prisma.recipe.findUnique({
        where: { id: params.id }
    });
    if (recipe) {
        return {
            props: JSON.parse(JSON.stringify(recipe)),
            revalidate: 5, // ISR
        }
    }
    return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
}

export default Recipe;