"use client";

import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { routes } from "@/lib/routes";
import { resetPasswordSchema } from "@/types/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiShieldKeyholeLine } from "react-icons/ri";

type FormValues = {
  otp: string;
};

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const email = searchParams.get("email");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    // Allow only digits
    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
        // 🔐 API call: verify OTP
    // await authService.verifyOtp(email!, data.otp);
    const otpValues = inputRefs.current.map((input) => input?.value || "");

    // Check if all inputs are filled
    if (otpValues.some((value) => !value)) {
      toast.error("Please enter all OTP digits");
      return;
    }
    // Combine all digits into a single OTP string
    const otp = otpValues.join("");

    router.push(`${routes.resetPassword}?email=${encodeURIComponent(email!)}`);
    // router.push(routes.resetPassword);
  };

  return (
    <main className="pt-11.5">
      <section className="bg-[#FBF8F0] pt-48 pb-10 px-4">
        <div className="mx-auto w-full max-w-md">
          <h1 className="mb-2 text-center text-3xl font-semibold">
            Verify OTP
          </h1>

          <p className="mb-6 text-center text-sm text-gray-500">
            Enter the 6-digit OTP sent to <b>{email}</b>
          </p>

          <div
            className="flex flex-col gap-5"
          >
            <div className="flex justify-between gap-4 px-14">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  pattern="\d*"
                  className="h-14 w-14 rounded-lg border border-gray-300 text-center text-2xl shadow-sm focus:border-[#094745] focus:outline-none focus:ring-2 focus:ring-[#094745]"
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <Button
              bgColor="bg-[#094745]"
              textColor="text-white"
              px="px-8"
              py="py-4"
              fontSize="text-sm"
              className="w-full rounded-none"
              //   isLoading={isPending}
              // type="submit"
              onClick={handleVerifyOtp}
            >
              VERIFY OTP
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Didn’t receive OTP?{" "}
            <button className="font-medium text-primary hover:underline cursor-pointer">
              Resend OTP
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
