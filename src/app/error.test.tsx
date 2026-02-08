import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ErrorRenderer from '../app/error';

// Mock console.error to avoid test output pollution
const mockConsoleError = vi.spyOn(console, 'error');

describe('Error Component', () => {
  const mockReset = vi.fn();
  const mockError = new Error('Test error');

  beforeEach(() => {
    vi.clearAllMocks();
    mockConsoleError.mockClear();
    cleanup();
  });

  it('renders error message correctly', () => {
    render(<ErrorRenderer error={mockError} reset={mockReset} />);
    
    expect(screen.getByRole('heading', { name: 'Oops!', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Something went wrong', level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument();
  });

  it('logs error to console on mount', () => {
    render(<ErrorRenderer error={mockError} reset={mockReset} />);
    
    expect(mockConsoleError).toHaveBeenCalledWith(mockError);
  });

  it('renders Try Again button', () => {
    render(<ErrorRenderer error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: 'Try Again' });
    expect(tryAgainButton).toBeInTheDocument();
    expect(tryAgainButton).toHaveClass('px-6', 'py-3', 'bg-blue-600', 'text-white', 'rounded-lg');
  });

  it('calls reset when Try Again is clicked', () => {
    render(<ErrorRenderer error={mockError} reset={mockReset} />);
    
    const tryAgainButton = screen.getByRole('button', { name: 'Try Again' });
    fireEvent.click(tryAgainButton);
    
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('renders Go Home link', () => {
    render(<ErrorRenderer error={mockError} reset={mockReset} />);
    
    const goHomeLink = screen.getByRole('link', { name: 'Go Home' });
    expect(goHomeLink).toBeInTheDocument();
    expect(goHomeLink).toHaveAttribute('href', '/');
    expect(goHomeLink).toHaveClass('px-6', 'py-3', 'bg-gray-600', 'text-white', 'rounded-lg');
  });

  it('has proper styling classes', () => {
    render(<ErrorRenderer error={mockError} reset={mockReset} />);
    
    // Use a more reliable selector to find the outer container
    const outerContainer = screen.getByRole('heading', { name: 'Oops!' }).closest('div')?.parentElement;
    expect(outerContainer).toHaveClass('flex', 'flex-col', 'min-h-screen', 'justify-center', 'items-center');
    
    // Test the inner container as well
    const innerContainer = screen.getByRole('heading', { name: 'Oops!' }).closest('div');
    expect(innerContainer).toHaveClass('flex', 'flex-col', 'items-center', 'text-center');
    
    const title = screen.getByRole('heading', { name: 'Oops!' });
    expect(title).toHaveClass('text-6xl', 'font-bold', 'text-red-600', 'mb-4');
  });

  it('handles error with digest', () => {
    const errorWithDigest = new Error('Test error') as Error & { digest?: string };
    errorWithDigest.digest = 'abc123';
    
    render(<ErrorRenderer error={errorWithDigest} reset={mockReset} />);
    
    expect(screen.getByRole('heading', { name: 'Oops!', level: 1 })).toBeInTheDocument();
    expect(mockConsoleError).toHaveBeenCalledWith(errorWithDigest);
  });
});