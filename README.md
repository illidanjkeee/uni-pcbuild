# Custom PC Builder

A Next.js application for building custom PC configurations with real-time pricing and compatibility checks.

## Features

- 🖥️ Interactive PC component selection
- ✅ Real-time compatibility checking
- 💰 Dynamic pricing updates
- 🔐 User authentication with Clerk
- 💾 Save and share PC configurations
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Authentication:** Clerk
- **State Management:** React Context
- **Styling:** Tailwind CSS, Shadcn UI
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/illidanjkeee/uni-pcbuild.git
cd uni-pcbuild
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your Clerk API keys to .env
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

```
├── app/                  # Next.js app directory
├── components/           # Reusable UI components
├── lib/                  # Utility functions and configurations
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
