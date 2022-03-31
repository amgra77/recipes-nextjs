import { getSession } from "next-auth/react";
import { prisma } from "../../lib/db";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const session = await getSession({ req });
            if (session) {
                const recipesList = await prisma.recipe.findMany({
                    where: { owner_id: session.user.id },
                    orderBy: { name: "asc" },
                });    
                res.status(200).json(recipesList);
            }
            else {
                res.status(200).json([]);
            }
        } catch (e) {
            console.error('e ', e);
            res.status(500).json({message: 'Something went wrong'});
        }
    }
    else {
        res.setHeader('Allow', ['GET']);
        res
            .status(405)
            .json({
                message: `HTTP method ${req.method} is not supported.`
            });
    }
}