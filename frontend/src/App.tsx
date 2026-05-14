import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import PeerReviewPage from './components/PeerReviewPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'review'>('landing');

  const navigateToReview = () => {
    setCurrentPage('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage onStartAnalysis={navigateToReview} />
      ) : (
        <PeerReviewPage onBackToHome={navigateToHome} />
      )}
    </>
  );
}

export default App;