import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { PencilIcon, BookOpenIcon, TrashIcon } from '@heroicons/react/outline';
import { toast } from 'react-hot-toast';

const Card = ({ recipe }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const deleteRecipe = async () => {
        let toastId = toast.loading('Deleting...');
        try {
            await axios.delete(`/api/delete?id=${recipe.id}`);
            toast.success('Deleted', { id: toastId });
            router.push('/');
        } catch (error) {
            console.error(error);
            toast.error('Error deleting recipe', { id: toastId });
        }
    }

    return (
        <div className="col col-sm-12 col-lg-3">
            <div className="card">
                <div className="card-header">
                    <Link href={`/${recipe.id}`}>
                        <a className="link-secondary text-decoration-none">{recipe.name}</a>
                    </Link>
                </div>
                <div className="card-body">
                    <p className='card-text text-truncate'>{recipe.content}</p>
                    <Link href={`/${recipe.id}`} replace={true}>
                        <BookOpenIcon className="text-success h-5 w-5 me-3" role="button" style={{'width': '20px'}}></BookOpenIcon>
                    </Link>
                    {(session?.user && session.user.id === recipe.owner_id) ?
                        <Link href={`/${recipe.id}/edit`} replace={true}>
                            <PencilIcon className="text-primary h-5 w-5 me-3" role="button" style={{'width': '20px'}}></PencilIcon>
                        </Link>
                    : null }
                    
                    {(session?.user && session.user.id === recipe.owner_id) ?
                        <TrashIcon className="text-danger h-5 w-5 me-3" role="button" style={{'width': '20px'}} onClick={deleteRecipe}></TrashIcon>
                    : null}
                </div>
            </div>
        </div>
    )
}

export default Card;