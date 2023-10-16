import React from 'react';
// Import functions for rendering and querying the DOM from the testing library
import { render, screen } from '@testing-library/react';
import App from './App';

// Define a test case with a description
test('renders learn react link', () => {

    // Render the 'App' component, simulating its rendering in a test environment
  render(<App />);

    // Query the DOM for an element containing the text 'learn react' (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);

   // Make an assertion: check if the 'linkElement' is in the document (i.e., it exists)
  // If it's found, the test will pass; otherwise, it will fail
  expect(linkElement).toBeInTheDocument();
});
