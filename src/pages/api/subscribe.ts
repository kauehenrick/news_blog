import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { stripe } from '../../services/stripe'
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
        })

        const stripeCheckoutSessison = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1PDm3lRpeutC65fBTp1tDt4i', quantity: 1 },
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL, 
        })

        return res.status(200).json({ sessionId: stripeCheckoutSessison.id })
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not Allowed')
    }
}