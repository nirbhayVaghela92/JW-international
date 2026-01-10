"use client";

import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";
import { routes } from "@/lib/routes";
import PasswordField from "@/components/common/PasswordField";
import Button from "@/components/common/Button";
import { useState } from "react";
import { resetPasswordSchema } from "@/types/schemas";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: FormValues) => {
    // await authService.resetPassword(email!, data.password);
    router.replace(routes.signIn);
  };

  return (
    <main className="pt-11.5">
      <section className="bg-[#FBF8F0] pt-48 pb-10 px-4">
        <div className="mx-auto w-full max-w-170 bg-white p-5">
          <div className="mx-auto w-full max-w-md">
            <h1 className="mb-2 text-center text-3xl font-semibold">
              Reset Password
            </h1>

            <p className="mb-6 text-center text-sm text-gray-500">
              Create a new password for your account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              <PasswordField
                label="New Password"
                placeholder="Enter new password"
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                {...register("password")}
                error={errors.password?.message}
              />
              {/* Confirm Password */}
              <PasswordField
                label="Confirm New Password"
                placeholder="Confirm new password"
                show={showConfirmPassword}
                toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button
                bgColor="bg-[#094745]"
                textColor="text-white"
                px="px-8"
                py="py-4"
                fontSize="text-sm"
                className="flex-1 rounded-none"
                //   isLoading={isPending}
                type="submit"
              >
                RESET PASSWORD
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
