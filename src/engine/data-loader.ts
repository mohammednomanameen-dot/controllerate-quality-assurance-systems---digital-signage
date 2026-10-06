import { AppConfig, Employee, FamilyRelation, Festival, QuoteCollection } from '../types';
import defaultConfig from '../data/config.json';
import defaultEmployees from '../data/employees.json';
import defaultRelations from '../data/relations.json';
import defaultFestivals from '../data/festivals.json';
import defaultQuotes from '../data/quotes.json';

const STORAGE_KEYS = {
  CONFIG: 'cqas_signage_config',
  EMPLOYEES: 'cqas_signage_employees',
  RELATIONS: 'cqas_signage_relations',
  FESTIVALS: 'cqas_signage_festivals',
  QUOTES: 'cqas_signage_quotes'
};

/**
 * Loads config from local storage or bundled defaults
 */
export function loadAppConfig(): AppConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read config from storage, using bundled defaults:', e);
  }
  return defaultConfig as unknown as AppConfig;
}

/**
 * Loads employee list
 */
export function loadEmployees(): Employee[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read employees from storage:', e);
  }
  return defaultEmployees as unknown as Employee[];
}

/**
 * Loads family relations list
 */
export function loadRelations(): FamilyRelation[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.RELATIONS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read relations from storage:', e);
  }
  return defaultRelations as unknown as FamilyRelation[];
}

/**
 * Loads festivals list
 */
export function loadFestivals(): Festival[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.FESTIVALS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read festivals from storage:', e);
  }
  return defaultFestivals as unknown as Festival[];
}

/**
 * Loads quotes collection
 */
export function loadQuotes(): QuoteCollection {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read quotes from storage:', e);
  }
  return defaultQuotes as unknown as QuoteCollection;
}

/**
 * Saves all datasets to local browser storage
 */
export function saveToLocalStorage(data: {
  config?: AppConfig;
  employees?: Employee[];
  relations?: FamilyRelation[];
  festivals?: Festival[];
  quotes?: QuoteCollection;
}) {
  try {
    if (data.config) localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(data.config));
    if (data.employees) localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(data.employees));
    if (data.relations) localStorage.setItem(STORAGE_KEYS.RELATIONS, JSON.stringify(data.relations));
    if (data.festivals) localStorage.setItem(STORAGE_KEYS.FESTIVALS, JSON.stringify(data.festivals));
    if (data.quotes) localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(data.quotes));
  } catch (e) {
    console.error('Failed to save to local storage:', e);
  }
}

/**
 * Resets local storage back to clean bundled defaults
 */
export function resetToDefaults() {
  localStorage.removeItem(STORAGE_KEYS.CONFIG);
  localStorage.removeItem(STORAGE_KEYS.EMPLOYEES);
  localStorage.removeItem(STORAGE_KEYS.RELATIONS);
  localStorage.removeItem(STORAGE_KEYS.FESTIVALS);
  localStorage.removeItem(STORAGE_KEYS.QUOTES);
}
