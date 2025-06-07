import styles from "@/app/ui/css/home.module.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-8 text-[#4b3c2b]">
        <p className="text-center">
          This is a placeholder for the main content.
        </p>
      </main>

      <Footer />
    </div>
  );
}
