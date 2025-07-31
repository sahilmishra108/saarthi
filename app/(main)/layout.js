import React from 'react';

const MainLayout = ({ children }) => {

  //Redirect to onboarding

  return (
    <div className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
