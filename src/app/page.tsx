import AnalysisForm from '@/components/analysis-form';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Illuminate the Truth
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Paste text or a link to analyze content for misinformation with our advanced AI.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl md:mt-12">
        <AnalysisForm />
      </div>
    </div>
  );
}
