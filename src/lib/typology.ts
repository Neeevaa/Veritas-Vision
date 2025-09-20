export type Typology = {
  id: string;
  title: string;
  description: string;
  example: string;
  imageId: string;
};

export const typologyLibrary: Typology[] = [
  {
    id: 'misleading-content',
    title: 'Misleading Content',
    description:
      'The use of information to frame an issue or individual in a deceptive way. This can involve using correct information but presenting it in a way that leads to a false conclusion, such as through misleading headlines or statistics taken out of context.',
    example:
      'A news article uses a photo of a protest from years ago to illustrate a current event, creating a false impression of the scale or nature of the recent event.',
    imageId: 'typology-1',
  },
  {
    id: 'imposter-content',
    title: 'Imposter Content',
    description:
      'When genuine sources are impersonated. This often involves creating fake websites or social media profiles that look like legitimate news outlets or public figures to spread false information.',
    example:
      'A website designed to look exactly like a major news organization publishes a fake story. The URL is slightly different (e.g., "cbb.com" instead of "cbs.com"), tricking users into believing the source is credible.',
    imageId: 'typology-2',
  },
  {
    id: 'fabricated-content',
    title: 'Fabricated Content',
    description:
      'New content that is 100% false, designed to deceive and do harm. This is pure disinformation, created from scratch with no basis in reality.',
    example:
      'A viral social media post claims a celebrity has died, complete with a photoshopped image from a "news report." The entire story is made up.',
    imageId: 'typology-3',
  },
  {
    id: 'false-context',
    title: 'False Context',
    description:
      'When genuine content is shared with false contextual information. The original content (like a photo or video) is real, but the story surrounding it is false.',
    example:
      'A video of a natural disaster in one country is shared online with a caption claiming it is happening in a different country to stir political unrest.',
    imageId: 'typology-4',
  },
  {
    id: 'satire-or-parody',
    title: 'Satire or Parody',
    description:
      "Content that uses irony, humor, or exaggeration to comment on or critique real-world events or people. While not intended to cause harm, it can fool people who don't realize it's a joke.",
    example:
      'An article from a satirical news website like "The Onion" is shared on social media, and some users mistake it for a genuine news report.',
    imageId: 'typology-5',
  },
];
