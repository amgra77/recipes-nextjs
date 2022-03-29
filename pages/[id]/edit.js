import { useRouter } from 'next/router';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyInput from '../../components/input';
import MyTextArea from '../../components/textarea';
import Head from 'next/head';
import { prisma } from '../../lib/db';
import { toast } from 'react-hot-toast';

const formValidation = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    content: Yup.string().trim().required('Content is required'),
})

export default function Edit(recipe) {
    const router = useRouter();

    const updateRecipe = async ({ name, content }) => {
        let toastId = toast.loading('Updating...');
        try {
            await axios.patch(`/api/update`, { id: recipe.id, name, content });
            toast.success('Updated', { id: toastId });
            router.push('/');            
        } catch (error) {
            toast.error('Error saving recipe', { id: toastId });
            console.error(error);
        }
    }

    return (
        <>
            <Head>
                <title>Edit</title>
            </Head>
            <Formik initialValues={recipe} validationSchema={formValidation} onSubmit={(values) => updateRecipe(values)}>
                {({ isValid, dirty }) => (
                    <Form>
                        <div className='container'>
                            <div className="row">
                                <div className="col">
                                    <MyInput label="Recipe Name" name="name" type="text" placeholder="Enter recipe's name" ></MyInput>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <MyTextArea label="Instructions" name="content" placeholder="Enter recipe's instructions"></MyTextArea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className='btn btn-primary' type='submit' disabled={!isValid || !dirty}>Save</button>
                                    <button className='btn btn-flat' onClick={() => router.push('/')}>Cancel</button>
                                </div>
                            </div>
                        </div>

                    </Form>
                
                )}
            </Formik>
        </>
    );
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
        }
    }
    return {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
}

