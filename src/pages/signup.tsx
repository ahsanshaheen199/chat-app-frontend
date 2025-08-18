import { FormInput } from "../components/form/input";
import { FormLabel } from "../components/form/label";
import { Button } from "../components/form/button";
import { Link } from "react-router";

export function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold text-heading-primary">
              Sign up to your account
            </h1>
            <p className="text-sm mt-2.5">
              Enter your details to sign up to your account.
            </p>
            <form className="mt-8">
              <div className="flex flex-col gap-y-2 mb-4">
                <FormLabel htmlFor="firstName" className="inline-block">
                  First Name
                </FormLabel>
                <FormInput id="firstName" placeholder="John" type="text" />
              </div>
              <div className="flex flex-col gap-y-2 mb-4">
                <FormLabel htmlFor="lastName" className="inline-block">
                  Last Name
                </FormLabel>
                <FormInput id="lastName" placeholder="Doe" type="text" />
              </div>
              <div className="flex flex-col gap-y-2 mb-4">
                <FormLabel htmlFor="email" className="inline-block">
                  Email
                </FormLabel>
                <FormInput
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-y-2 mb-4">
                <FormLabel htmlFor="password" className="inline-block">
                  Password
                </FormLabel>
                <FormInput
                  id="password"
                  placeholder="********"
                  type="password"
                />
              </div>
              <div className="flex flex-col gap-y-2 mb-4">
                <FormLabel htmlFor="confirmPassword" className="inline-block">
                  Confirm Password
                </FormLabel>
                <FormInput
                  id="confirmPassword"
                  placeholder="********"
                  type="password"
                />
              </div>
              <div className="mt-4">
                <Button className="w-full">Sign up</Button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <Link
                    className="text-bg-primary hover:underline font-medium"
                    to="/login"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="./images/login.jpg"
          alt="Signup"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
