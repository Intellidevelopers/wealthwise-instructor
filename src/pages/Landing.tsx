// src/pages/LandingPage.tsx
const LandingPage = () => {
  return (
    <iframe
      src="/index.html" // loads from public folder
      title="Landing Page"
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
    />
  );
};

export default LandingPage;
