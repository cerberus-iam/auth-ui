import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AnimatedGradient } from './AnimatedGradient';

describe('AnimatedGradient', () => {
  it('should render without crashing', () => {
    const { container } = render(<AnimatedGradient />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have correct positioning classes', () => {
    const { container } = render(<AnimatedGradient />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(
      'absolute',
      'inset-0',
      '-z-10',
      'overflow-hidden'
    );
  });

  it('should render three gradient orbs', () => {
    const { container } = render(<AnimatedGradient />);
    const blobs = container.querySelectorAll('.animate-blob');
    expect(blobs).toHaveLength(3);
  });

  it('should render overlay', () => {
    const { container } = render(<AnimatedGradient />);
    const overlay = container.querySelector('.bg-gradient-to-br');
    expect(overlay).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<AnimatedGradient className="custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should have blur effect on gradient orbs', () => {
    const { container } = render(<AnimatedGradient />);
    const blobs = container.querySelectorAll('.animate-blob');
    blobs.forEach((blob) => {
      expect(blob).toHaveClass('blur-3xl');
    });
  });
});
