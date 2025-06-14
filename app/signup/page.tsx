import SignUpForm from '@/app/ui/signup-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { SimpleFooter } from '../components/footer';
import Header from '../components/header';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex items-center justify-center md:h-screen">
        <div className="flex w-full max-w-md flex-col space-y-6 rounded-lg bg-white p-6 shadow-lg md:p-10">
          <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36" style={{ backgroundColor: '#B3511D' }}>
            <div className="w-32 text-white md:w-36">
            </div>
          </div>
          <Suspense>
            <SignUpForm />
          </Suspense>
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}