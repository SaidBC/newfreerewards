export default function ComingSoonPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center space-y-6">
        <span className="inline-block rounded-full text-4xl md:text-5xl bg-muted px-8 py-4 font-concert-one  font-semibold">
          🚧 Coming Soon
        </span>

        <h1 className="text-4xl md:text-5xl font-concert-one">
          Free Rewards. Zero Cost.
        </h1>

        <p className="text-muted-foreground text-lg">
          We collect real, working free rewards from games and the internet — no
          hacks, no downloads, no scams.
        </p>

        <ul className="text-sm text-muted-foreground space-y-2">
          <li>✔ Verified free game rewards</li>
          <li>✔ Direct links & QR codes</li>
          <li>✔ Updated regularly</li>
        </ul>

        <p className="text-xs text-muted-foreground pt-4">
          © {new Date().getFullYear()} FreeThings. All rights reserved.
        </p>
      </div>
    </main>
  );
}
