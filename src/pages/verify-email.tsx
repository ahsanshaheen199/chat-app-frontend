import { useEffect, useRef, useState } from "react";
import { FormInput } from "../components/form/input";
import { Button } from "../components/form/button";

const CODE_LENGTH = 6;

export function VerifyEmailPage() {
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [inputCode, setInputCode] = useState<string[]>(
    Array.from({ length: CODE_LENGTH }, () => "")
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }

    const value = e.target.value.trim();

    const newInputCode = [...inputCode];
    newInputCode[index] = value.slice(0, 1);
    setInputCode(newInputCode);

    if (index < CODE_LENGTH - 1 && value.length > 0) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const value = e.currentTarget.value;
      if (value.length === 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold text-heading-primary">
              Verify your email
            </h1>
            <p className="text-sm mt-2.5">
              Enter the code sent to your email to verify your email.
            </p>
            <form className="mt-8">
              <div className="flex gap-x-4 mb-8">
                {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                  <FormInput
                    key={index}
                    className="w-1/6 text-center"
                    type="text"
                    value={inputCode[index] || ""}
                    ref={(el) => {
                      if (el) {
                        inputRef.current[index] = el;
                      }
                    }}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <div>
                <Button className="w-full">Verify Email</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="./images/login.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
