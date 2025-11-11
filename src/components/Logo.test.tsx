import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders the logo SVG', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });

  it('applies custom color', () => {
    const { container } = render(<Logo color="#FCBE21" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', '#FCBE21');
  });

  it('uses currentColor as default', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('has correct viewBox', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 500 500');
  });

  it('renders with both className and color', () => {
    const { container } = render(
      <Logo className="h-10 w-10" color="#FCBE21" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-10', 'w-10');
    expect(svg).toHaveAttribute('fill', '#FCBE21');
  });
});
