import { cn, isNil, isNull, isUndefined, isObjectEmpty, isString, isEmpty, isNotEmpty } from '@/utils/utils';

describe('Utility Functions', () => {
  describe('cn', () => {
    it('combines class names', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles empty inputs', () => {
      expect(cn()).toBe('');
    });
  });

  describe('isNil', () => {
    it('returns true for null', () => {
      expect(isNil(null)).toBe(true);
    });

    it('returns true for undefined', () => {
      expect(isNil(undefined)).toBe(true);
    });

    it('returns false for non-nil values', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
    });
  });

  describe('isNull', () => {
    it('returns true for null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('returns false for non-null values', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('returns true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('returns false for non-undefined values', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
    });
  });

  describe('isObjectEmpty', () => {
    it('returns true for empty object', () => {
      expect(isObjectEmpty({})).toBe(true);
    });

    it('returns false for non-empty object', () => {
      expect(isObjectEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('isString', () => {
    it('returns true for string', () => {
      expect(isString('test')).toBe(true);
    });

    it('returns false for non-string values', () => {
      expect(isString(123)).toBe(false);
      expect(isString({})).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('returns true for nil values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('returns true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('returns false for non-empty object', () => {
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    it('returns false for nil values', () => {
      expect(isNotEmpty(null)).toBe(false);
      expect(isNotEmpty(undefined)).toBe(false);
    });

    it('returns false for empty object', () => {
      expect(isNotEmpty({})).toBe(false);
    });

    it('returns true for non-empty object', () => {
      expect(isNotEmpty({ key: 'value' })).toBe(true);
    });

    it('returns true for non-empty string', () => {
      expect(isNotEmpty('test')).toBe(true);
    });

    it('returns false for empty string', () => {
      expect(isNotEmpty('')).toBe(false);
    });
  });
});