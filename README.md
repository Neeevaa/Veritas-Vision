# Veritas Vision - AI-Powered Misinformation Detector

Veritas Vision is a web application prototype designed to combat the spread of misinformation. It leverages Generative AI to analyze textual content or web links, providing users with a comprehensive report on the content's trustworthiness, potential manipulation techniques, and original context.

This project was built to demonstrate the power of integrating modern web technologies with advanced AI capabilities to create practical tools for media literacy.

## Features

- **Dual Input Modes**: Users can either paste raw text or submit a URL for analysis.
- **AI-Powered Analysis**: Utilizes Google's Gemini models via Genkit to perform in-depth content analysis.
- **Comprehensive Reporting**: The analysis report includes:
  - A **Trustworthiness Score** (0-100) visualized in a "Trust Meter".
  - A clear **Verdict** (e.g., Real, Fake, Undetermined).
  - AI-generated **Reasoning** explaining the verdict.
  - A list of identified **Manipulation Techniques** (e.g., Misleading Content, False Context).
- **Context Rebuilding**: The AI attempts to trace the content's origin to provide the verified source and surrounding context.
- **Typology Library**: An educational page that explains common types of misinformation with examples, helping users learn to identify deceptive tactics themselves.
- **Responsive UI**: A clean, modern, and responsive user interface built with ShadCN UI and Tailwind CSS.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI/ML**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini Models
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

## Running the Project

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set up Environment Variables**:
    Create a `.env` file in the root directory and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run the Development Server**:
    The application runs on port 9002 by default.
    ```bash
    npm run dev
    ```

4.  **Run the Genkit Development Inspector** (in a separate terminal):
    This allows you to inspect and debug the Genkit flows.
    ```bash
    npm run genkit:watch
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.
