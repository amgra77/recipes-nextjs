// import { getSession } from "next-auth/react";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "../../lib/db";

export default async function handler(req, res) {
    // const session = await getSession({ req });
    // if (!session) {
    //     res.status(401).json({message: 'Unauthorized'});
    // }
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            const recipe = await prisma.recipe.delete({
                where: { id },
            });
            res.status(200).json(recipe);
        } catch (e) {
            console.error('e ', e);
            res.status(500).json({message: 'Something went wrong'});
        }
    }
    else {
        res.setHeader('Allow', ['DELETE']);
        res
            .status(405)
            .json({
                message: `HTTP method ${req.method} is not supported.`
            });
    }
}