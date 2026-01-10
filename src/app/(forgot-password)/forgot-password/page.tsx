"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import InputField from "@/components/common/InputField";
import { HiOutlineMail } from "react-icons/hi";
import Button from "@/components/common/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/types/schemas";

type FormValues = {
  email: string;
};

export default function SendForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: FormValues) => {
    // 🔐 API call: send OTP
    // await authService.sendForgotPasswordOtp(data.email);

    router.push(`${routes.verifyOtp}?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <main className="pt-11.5">
      <section className="bg-[#FBF8F0] pt-48 pb-10 px-4">
        <div className="mx-auto w-full max-w-md">
          <h1 className="mb-2 text-center text-3xl font-semibold">
            Forgot Password
          </h1>

          <p className="mb-6 text-center text-sm text-gray-500">
            Enter your registered email address. We’ll send you an OTP to reset
            your password.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <InputField
              label="Email"
              required
              icon={<HiOutlineMail />}
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Button
              bgColor="bg-[#094745]"
              textColor="text-white"
              px="px-8"
              py="py-4"
              fontSize="text-sm"
              className="w-full rounded-none"
              //   isLoading={isPending}
              type="submit"
            >
              SEND OTP
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
