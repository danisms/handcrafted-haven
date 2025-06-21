import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";
import { Metadata } from "next";
import { SimpleFooter } from "../components/footer";
import Header from "../components/header";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e6]">
      <Header />
      <main className="flex justify-center items-center min-h-screen px-4 pb-20 bg-[#f5f0e6]">
        <section className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 sm:p-12">
          <h1
            className="text-base font-bold whitespace-nowrap truncate w-full text-center"
            style={{ color: "#B3511D" }}
          >
            Welcome Back
          </h1>

          <Suspense>
            <LoginForm />
          </Suspense>
        </section>
      </main>
      <SimpleFooter />
    </div>
  );
}
