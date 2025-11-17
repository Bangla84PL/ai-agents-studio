/**
 * Unit tests for utility functions
 */

import {
  cn,
  formatDate,
  formatDuration,
  formatRelativeTime,
  formatBytes,
  debounce,
  sleep,
  copyToClipboard,
  isValidUrl,
  truncate,
  getEnv,
  getEnvOrThrow,
} from '../utils'

describe('cn (className merger)', () => {
  it('should merge class names correctly', () => {
    expect(cn('text-white', 'bg-black')).toBe('text-white bg-black')
  })

  it('should handle conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })

  it('should handle undefined and null', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end')
  })

  it('should override conflicting Tailwind classes', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4')
  })
})

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15T10:30:00Z')
    const formatted = formatDate(date)
    expect(formatted).toMatch(/Jan/)
    expect(formatted).toMatch(/15/)
    expect(formatted).toMatch(/2024/)
  })

  it('should handle string input', () => {
    const formatted = formatDate('2024-01-15')
    expect(formatted).toBeTruthy()
  })

  it('should format with custom format', () => {
    const date = new Date('2024-01-15')
    const formatted = formatDate(date, 'yyyy-MM-dd')
    expect(formatted).toBe('2024-01-15')
  })
})

describe('formatDuration', () => {
  it('should format milliseconds correctly', () => {
    expect(formatDuration(500)).toBe('500ms')
  })

  it('should format seconds correctly', () => {
    expect(formatDuration(5000)).toBe('5.00s')
  })

  it('should format minutes correctly', () => {
    expect(formatDuration(65000)).toBe('1.08m')
  })

  it('should format hours correctly', () => {
    expect(formatDuration(3665000)).toBe('1.02h')
  })

  it('should handle zero', () => {
    expect(formatDuration(0)).toBe('0ms')
  })

  it('should handle null/undefined', () => {
    expect(formatDuration(null)).toBe('N/A')
    expect(formatDuration(undefined)).toBe('N/A')
  })
})

describe('formatRelativeTime', () => {
  it('should format "just now" for recent dates', () => {
    const now = new Date()
    expect(formatRelativeTime(now.toISOString())).toBe('just now')
  })

  it('should format minutes ago', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    expect(formatRelativeTime(fiveMinutesAgo.toISOString())).toBe('5m ago')
  })

  it('should format hours ago', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
    expect(formatRelativeTime(twoHoursAgo.toISOString())).toBe('2h ago')
  })

  it('should format days ago', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    expect(formatRelativeTime(threeDaysAgo.toISOString())).toBe('3d ago')
  })
})

describe('formatBytes', () => {
  it('should format bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(100)).toBe('100 B')
  })

  it('should format kilobytes correctly', () => {
    expect(formatBytes(1024)).toBe('1.0 KB')
    expect(formatBytes(2048)).toBe('2.0 KB')
  })

  it('should format megabytes correctly', () => {
    expect(formatBytes(1024 * 1024)).toBe('1.0 MB')
  })

  it('should format gigabytes correctly', () => {
    expect(formatBytes(1024 * 1024 * 1024)).toBe('1.0 GB')
  })

  it('should handle decimals correctly', () => {
    expect(formatBytes(1536, 2)).toBe('1.50 KB')
  })
})

describe('debounce', () => {
  jest.useFakeTimers()

  it('should debounce function calls', () => {
    const fn = jest.fn()
    const debouncedFn = debounce(fn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to debounced function', () => {
    const fn = jest.fn()
    const debouncedFn = debounce(fn, 100)

    debouncedFn('test', 123)

    jest.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledWith('test', 123)
  })

  afterAll(() => {
    jest.useRealTimers()
  })
})

describe('sleep', () => {
  it('should resolve after specified time', async () => {
    const start = Date.now()
    await sleep(100)
    const elapsed = Date.now() - start

    expect(elapsed).toBeGreaterThanOrEqual(95) // Allow small margin
  })
})

describe('copyToClipboard', () => {
  it('should copy text to clipboard', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    })

    const result = await copyToClipboard('test text')

    expect(result).toBe(true)
    expect(mockWriteText).toHaveBeenCalledWith('test text')
  })

  it('should handle clipboard errors', async () => {
    const mockWriteText = jest.fn().mockRejectedValue(new Error('Permission denied'))
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    })

    const result = await copyToClipboard('test')

    expect(result).toBe(false)
  })
})

describe('isValidUrl', () => {
  it('should validate correct URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://localhost:3000')).toBe(true)
    expect(isValidUrl('https://sub.domain.com/path?query=1')).toBe(true)
  })

  it('should reject invalid URLs', () => {
    expect(isValidUrl('not a url')).toBe(false)
    expect(isValidUrl('htp://wrong')).toBe(false)
    expect(isValidUrl('')).toBe(false)
  })
})

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('This is a long string', 10)).toBe('This is a...')
  })

  it('should not truncate short strings', () => {
    expect(truncate('Short', 10)).toBe('Short')
  })

  it('should handle custom suffix', () => {
    expect(truncate('Long string here', 10, '…')).toBe('Long strin…')
  })
})

describe('getEnv', () => {
  it('should get environment variable', () => {
    process.env.TEST_VAR = 'test-value'
    expect(getEnv('TEST_VAR')).toBe('test-value')
  })

  it('should return fallback for missing var', () => {
    expect(getEnv('NONEXISTENT_VAR', 'fallback')).toBe('fallback')
  })

  it('should return undefined for missing var without fallback', () => {
    expect(getEnv('NONEXISTENT_VAR')).toBeUndefined()
  })
})

describe('getEnvOrThrow', () => {
  it('should get environment variable', () => {
    process.env.TEST_VAR = 'test-value'
    expect(getEnvOrThrow('TEST_VAR')).toBe('test-value')
  })

  it('should throw for missing variable', () => {
    expect(() => getEnvOrThrow('NONEXISTENT_VAR')).toThrow(
      'Missing required environment variable: NONEXISTENT_VAR'
    )
  })
})
