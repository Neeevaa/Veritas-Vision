import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { typologyLibrary, type Typology } from '@/lib/typology';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function TypologyCard({ item }: { item: Typology }) {
  const placeholderImage = PlaceHolderImages.find((img) => img.id === item.imageId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{item.description}</p>
        <Accordion type="single" collapsible>
          <AccordionItem value="example">
            <AccordionTrigger className="text-sm">View Example</AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2">
              <p className="text-sm text-muted-foreground italic">"{item.example}"</p>
              {placeholderImage && (
                <div className="overflow-hidden rounded-md border">
                  <Image
                    src={placeholderImage.imageUrl}
                    alt={placeholderImage.description}
                    width={600}
                    height={400}
                    data-ai-hint={placeholderImage.imageHint}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function LibraryPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Misinformation Typology
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Learn to identify common tactics used to spread false information.
        </p>
      </div>

      <div className="space-y-6">
        {typologyLibrary.map((item) => (
          <TypologyCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
