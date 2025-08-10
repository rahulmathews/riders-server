/**
 * Common date utility functions
 */

export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const isValidDate = (date: unknown): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const getCurrentTimestamp = (): Date => {
  return new Date();
};
