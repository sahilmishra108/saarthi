import React from 'react';

const MainLayout = ({ children }) => {

  //Redirect to onboarding

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24 mb-16 sm:mb-20">
      {children}
    </div>
  );
};

export default MainLayout;
