import Head from "next/head";
import { useRouter } from 'next/router';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyInput from '../components/input';
import MyTextArea from '../components/textarea';
import { getSession } from "next-auth/react";
import { toast } from 'react-hot-toast';

const initialValues = {
    name: '',
    content: '',
};

const formValidation = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    content: Yup.string().trim().required('Content is required'),
})

export default function Create() {
    const router = useRouter();
    
    const addRecipe = async ({ name, content }) => {
        let toastId = toast.loading('Creating...');
        try {
            await axios.post('/api/create', { name, content });
            toast.success('Created', { id: toastId });
            router.push('/');
        } catch (error) {
            toast.error('Error creating recipe', { id: toastId });
            console.error(error);
        }
    }

    return (
        <>
            <Head>
                <title>New Recipe</title>
            </Head>
            <Formik initialValues={initialValues} validationSchema={formValidation} onSubmit={(values) => addRecipe(values)}>
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
                                    <MyTextArea label="Instructions" name="content" placeholder="Enter recipe's instructions" ></MyTextArea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className='btn btn-primary' type='submit' disabled={!isValid || !dirty}>Save</button>
                                    <button className='btn btn-flat' onClick={() => router.back()}>Cancel</button>
                                </div>
                            </div>
                        </div>

                    </Form>
                
                )}
            </Formik>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return { props: {} };
}
