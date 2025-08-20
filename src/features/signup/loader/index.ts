import { redirect, type LoaderFunctionArgs } from "react-router";
import { authProvider } from "../../auth";

export const signupLoader = ({request}: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const pathname = url.pathname;


    if (authProvider.isAuthenticated) {
        if (authProvider.user?.isVerified) {
            return redirect('/');
        }

        if (pathname !== '/verify-email') {
            return redirect('/verify-email');
        }

        return null;
    }

    return null;
};