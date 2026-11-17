// Позволяет ввести латиницу, кириллицу, цифры, дефисы и пробелы
export const SUBJECT_NAME_REG_EXP = /^[a-zа-яё0-9-\s]+$/gi;
// Позволяет ввести цифры, дефисы, скобки, плюс и пробелы
export const PHONE_NUMBER_REG_EXP = /^[0-9\-()+\s]+$/gi;
