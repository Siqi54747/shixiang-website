import { copy } from "@/content/copy";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="flex items-center justify-center min-h-[calc(100vh-50px)] px-5">
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight text-quantum-950 text-center max-w-3xl">
          {copy.hero.slogan}
        </h1>
      </section>
    </div>
  );
}
