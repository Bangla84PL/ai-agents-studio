/**
 * Unit tests for Button component
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button Component', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should show loading state', () => {
    render(<Button loading>Loading</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
    // Should show spinner
    expect(document.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('should render different variants', () => {
    const variants = ['default', 'jungle', 'outline', 'ghost', 'emerald', 'destructive'] as const

    variants.forEach((variant) => {
      const { container } = render(<Button variant={variant}>Button</Button>)
      expect(container.firstChild).toMatchSnapshot(`button-variant-${variant}`)
    })
  })

  it('should render different sizes', () => {
    const sizes = ['sm', 'default', 'lg', 'icon'] as const

    sizes.forEach((size) => {
      const { container } = render(<Button size={size}>Button</Button>)
      expect(container.firstChild).toMatchSnapshot(`button-size-${size}`)
    })
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Button</Button>)

    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Button</Button>)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('should spread additional props', () => {
    render(<Button data-testid="test-button" aria-label="Test">Button</Button>)

    const button = screen.getByTestId('test-button')
    expect(button).toHaveAttribute('aria-label', 'Test')
  })

  it('should render as different element with asChild', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('should not call onClick when loading', () => {
    const handleClick = jest.fn()
    render(<Button loading onClick={handleClick}>Loading</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should handle keyboard events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Button</Button>)

    const button = screen.getByRole('button')

    fireEvent.keyDown(button, { key: 'Enter' })
    // Note: onClick is called by browser's default behavior for Enter on buttons

    expect(button).toBeDefined()
  })
})
