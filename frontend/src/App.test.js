// src/App.test.js 
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (
      msg.includes('React Router Future Flag Warning') ||
      msg.includes('Relative route resolution within Splat routes')
    ) return;
    console.warn(msg);
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App'; // adjust path if test is inside tests/
import { AuthContext } from '../src/context/AuthContext'; // fixed path

// Helper to render App with AuthContext
const renderWithAuthContext = (ui, { providerValue = {} } = {}) => {
  return render(
    <AuthContext.Provider value={providerValue}>
      {ui}
    </AuthContext.Provider>
  );
};

test('renders app without crashing', () => {
  renderWithAuthContext(<App />);
});

test('renders navbar brand text', () => {
  renderWithAuthContext(<App />);

  // Use role + name to avoid multiple matches
  const headerElement = screen.getByRole('link', { name: /lost & found/i });
  expect(headerElement).toBeInTheDocument();
});