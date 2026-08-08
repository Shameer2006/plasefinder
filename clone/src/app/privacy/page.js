export const metadata = {
  title: "Privacy Policy — LostStreet Free Street View Guesser",
  description: "Privacy Policy for LostStreet street view guesser game. Understand how we collect, use, and protect player data.",
  alternates: { canonical: "https://www.loststreet.online/privacy" },
  keywords: ["loststreet privacy policy", "loststreet data protection", "street view guesser privacy"],
};

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', background: '#0a0a0a', color: '#e5e5e5' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(26, 26, 46, 0.8)', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
        <h1 className="gradient-text glow-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          Privacy Policy
        </h1>
        
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p><em>Last Updated: July 14, 2026</em></p>

          <p>
            Welcome to LostStreet ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website (https://www.loststreet.online) and our free geography guessing game. This Privacy Policy outlines our data collection, usage, and security practices in strict compliance with global privacy regulations including GDPR and CCPA.
          </p>

          <h2 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>1. Information We Collect</h2>
          <p>
            To provide a seamless gaming experience, we collect the following types of information:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Personal Information:</strong> If you choose to create an account, we collect your email address, display name, and authentication data via Firebase Authentication.</li>
            <li><strong>Game Data:</strong> We store your game progression, ELO ratings, match history, and the geographic coordinates (latitude/longitude) of your in-game guesses to calculate your score.</li>
            <li><strong>Automatically Collected Data:</strong> We automatically collect standard diagnostic data including your IP address, browser type, device type, operating system, and interaction metrics through Vercel Analytics and Speed Insights.</li>
          </ul>

          <h2 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>2. Third-Party Services & Integrations</h2>
          <p>
            LostStreet relies on carefully selected third-party services that may collect data in accordance with their own privacy policies:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Google Maps & Street View APIs:</strong> Used to display panoramic imagery and maps. Usage is subject to the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)' }}>Google Privacy Policy</a>.</li>
            <li><strong>Google AdSense:</strong> We use Google AdSense to serve advertisements. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)' }}>Ads Settings</a>.</li>
            <li><strong>Firebase (Google Cloud):</strong> Used for secure user authentication, real-time database hosting, and match synchronization.</li>
            <li><strong>Vercel:</strong> Used for website hosting, analytics, and performance monitoring.</li>
          </ul>

          <h2 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>3. Cookies and Tracking Technologies</h2>
          <p>
            We and our third-party partners (such as Google AdSense) use cookies, web beacons, and similar tracking technologies to track activity on our service, store your preferences, and serve targeted advertisements. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept essential cookies, you may not be able to use certain portions of our game.
          </p>

          <h2 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>4. How We Use Your Data</h2>
          <p>Your data is used strictly for the following purposes:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>To provide, maintain, and improve the LostStreet multiplayer game.</li>
            <li>To manage your account, save your high scores, and update leaderboard rankings.</li>
            <li>To serve relevant advertisements that keep the game 100% free.</li>
            <li>To monitor usage trends and detect technical issues or malicious activity.</li>
          </ul>

          <h2 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>5. Data Security & Retention</h2>
          <p>
            We implement industry-standard security measures, including SSL encryption and secure cloud databases via Google Firebase, to protect your personal information from unauthorized access, alteration, or destruction. We retain your personal data only for as long as your account is active or as needed to provide you the services.
          </p>

          <h2 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>6. Your Privacy Rights (GDPR & CCPA)</h2>
          <p>Depending on your location, you possess strong data protection rights, including:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right to rectify inaccurate or incomplete data.</li>
            <li>The right to object to our processing of your personal data.</li>
            <li>The right to withdraw consent at any time where we relied on your consent to process your personal information.</li>
          </ul>
          <p>To exercise any of these rights, including requesting total account and data deletion, please contact us directly.</p>

          <h2 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>7. Children's Privacy</h2>
          <p>
            LostStreet is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us immediately so we can remove that information from our servers.
          </p>

          <h2 style={{ color: 'var(--primary-color)', marginTop: '1rem' }}>8. Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update or change our Privacy Policy at any time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of the game after any modifications indicates your acceptance of the updated policy.
          </p>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, your data rights, or wish to request data deletion, please contact us at:</p>
            <p style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>privacy@loststreet.online</p>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Return to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
