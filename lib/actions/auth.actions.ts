'use server';

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        // Better auth creates a new user entry in the backend DB
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName
            }
        });

        // If sign up successfull, run a background job using inngest to process additional user data
        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }
            });
        }

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign up failed', e);
        return { success: false, error: 'Sign up failed' }
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        // Better auth creates a new user entry in the backend DB
        const response = await auth.api.signInEmail({
            body: {
                email,
                password
            }
        });

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign in failed', e);
        return { success: false, error: 'Sign in failed' }
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e);
        return { success: false, error: 'Sign out failed' };
    }
}