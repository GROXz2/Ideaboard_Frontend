import React from 'react';
import { render } from '@testing-library/react-native';

// Ajusta el import si tu entrypoint es distinto
import App from '../App';

describe('App smoke test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    // Busca texto típico de la pantalla inicial, ajusta si tu App muestra otro texto
    expect(getByText(/Ideaboard/i)).toBeTruthy();
  });
});
