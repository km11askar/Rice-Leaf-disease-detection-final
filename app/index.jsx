

import React from 'react';
import { Redirect } from 'expo-router';

const index = () => {
  // Redirect to welcome screen
  return <Redirect href="/welcome" />;
};

export default index;