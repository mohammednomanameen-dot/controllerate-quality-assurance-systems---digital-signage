import * as XLSX from 'xlsx';
import { Employee, FamilyRelation, RelationType } from '../types';

/**
 * Expected Employee Excel Column Mappings
 */
export const EMPLOYEE_EXCEL_COLUMNS = [
  'Employee ID',
  'Employee Code',
  'Employee Name',
  'Designation',
  'Department',
  'Section',
  'Date of Birth',
  'Date of Joining',
  'Promotion Date',
  'Previous Designation',
  'New Designation',
  'Retirement Date',
  'Wedding Anniversary',
  'Photo File',
  'Status'
];

/**
 * Expected Family Excel Column Mappings
 */
export const FAMILY_EXCEL_COLUMNS = [
  'Employee ID',
  'Relation Name',
  'Relation Type',
  'Date of Birth',
  'Wedding Anniversary',
  'Photo File'
];

/**
 * Helper to normalize date strings from Excel (serial number or YYYY-MM-DD or DD/MM/YYYY)
 */
function normalizeExcelDate(val: any): string | null {
  if (!val) return null;
  if (typeof val === 'number') {
    // Excel date serial number
    const date = new Date((val - (25567 + 2)) * 86400 * 1000);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const str = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }
  if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(str)) {
    const parts = str.split(/[-/]/);
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return str;
}

/**
 * Parses binary buffer of an Excel workbook offline into typed Employees & Relations
 */
export function parseExcelWorkbook(buffer: ArrayBuffer): {
  employees: Employee[];
  relations: FamilyRelation[];
  summary: { employeeCount: number; relationCount: number; sheets: string[] };
} {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetNames = workbook.SheetNames;

  const employees: Employee[] = [];
  const relations: FamilyRelation[] = [];

  // 1. Process Employee Sheet
  const empSheetName = sheetNames.find(s => s.toLowerCase().includes('emp') || s.toLowerCase().includes('staff')) || sheetNames[0];
  if (empSheetName && workbook.Sheets[empSheetName]) {
    const empRows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[empSheetName]);
    empRows.forEach((row, idx) => {
      const empId = String(row['Employee ID'] || row['employeeId'] || `EMP${String(idx + 1).padStart(3, '0')}`).trim();
      const name = String(row['Employee Name'] || row['name'] || '').trim();
      if (!name) return;

      const employee: Employee = {
        employeeId: empId,
        employeeCode: String(row['Employee Code'] || row['employeeCode'] || `CQAS/${empId}`).trim(),
        name,
        designation: String(row['Designation'] || row['designation'] || 'Quality Officer').trim(),
        department: String(row['Department'] || row['department'] || 'Quality Assurance').trim(),
        section: String(row['Section'] || row['section'] || 'General').trim(),
        photo: String(row['Photo File'] || row['photo'] || `assets/employees/${empId.toLowerCase()}.svg`).trim(),
        dateOfBirth: normalizeExcelDate(row['Date of Birth'] || row['dateOfBirth']) || '1990-01-01',
        dateOfJoining: normalizeExcelDate(row['Date of Joining'] || row['dateOfJoining']) || '2015-01-01',
        retirementDate: normalizeExcelDate(row['Retirement Date'] || row['retirementDate']),
        weddingDate: normalizeExcelDate(row['Wedding Anniversary'] || row['weddingDate']),
        promotionDate: normalizeExcelDate(row['Promotion Date'] || row['promotionDate']),
        previousDesignation: row['Previous Designation'] ? String(row['Previous Designation']).trim() : null,
        newDesignation: row['New Designation'] ? String(row['New Designation']).trim() : null,
        status: (String(row['Status'] || row['status']).toLowerCase() === 'retired' ? 'retired' : 'active')
      };
      employees.push(employee);
    });
  }

  // 2. Process Family Sheet if present
  const familySheetName = sheetNames.find(s => s.toLowerCase().includes('fam') || s.toLowerCase().includes('rel'));
  if (familySheetName && workbook.Sheets[familySheetName]) {
    const famRows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[familySheetName]);
    famRows.forEach((row, idx) => {
      const empId = String(row['Employee ID'] || row['employeeId'] || '').trim();
      const personName = String(row['Relation Name'] || row['personName'] || '').trim();
      if (!personName) return;

      const relTypeRaw = String(row['Relation Type'] || row['relation'] || 'Spouse').trim();
      const relationType: RelationType = (
        ['Spouse', 'Son', 'Daughter', 'Father', 'Mother'].includes(relTypeRaw)
          ? relTypeRaw
          : 'Other'
      ) as RelationType;

      const matchedEmp = employees.find(e => e.employeeId === empId);
      const employeeName = matchedEmp ? matchedEmp.name : String(row['Employee Name'] || 'Colleague');

      const dob = normalizeExcelDate(row['Date of Birth'] || row['dateOfBirth']);
      const anniv = normalizeExcelDate(row['Wedding Anniversary'] || row['weddingDate']);

      const eventType = anniv ? 'anniversary' : 'birthday';
      const eventDate = (eventType === 'anniversary' ? anniv : dob) || '01-01';

      relations.push({
        relationId: `REL${String(idx + 1).padStart(3, '0')}`,
        employeeId: empId,
        employeeName,
        personName,
        relation: relationType,
        eventType,
        eventDate: eventDate.length >= 10 ? eventDate.substring(5, 10) : eventDate,
        photo: String(row['Photo File'] || row['photo'] || '').trim() || undefined
      });
    });
  }

  return {
    employees,
    relations,
    summary: {
      employeeCount: employees.length,
      relationCount: relations.length,
      sheets: sheetNames
    }
  };
}

/**
 * Generates an Excel template ready for download and filling by office administration
 */
export function generateSampleExcelWorkbook(): Uint8Array {
  const wb = XLSX.utils.book_new();

  // Employee Sample Data
  const empData = [
    {
      'Employee ID': 'EMP001',
      'Employee Code': 'CQAS/QA/042',
      'Employee Name': 'Anita Sharma',
      'Designation': 'Senior Quality Officer',
      'Department': 'Quality Assurance',
      'Section': 'Electronic Systems',
      'Date of Birth': '1988-10-03',
      'Date of Joining': '2014-04-15',
      'Promotion Date': '',
      'Previous Designation': '',
      'New Designation': '',
      'Retirement Date': '',
      'Wedding Anniversary': '2012-10-03',
      'Photo File': 'anita-sharma.jpg',
      'Status': 'active'
    },
    {
      'Employee ID': 'EMP002',
      'Employee Code': 'CQAS/ENG/019',
      'Employee Name': 'Rajeshwar Rao',
      'Designation': 'Chief Technical Superintendent',
      'Department': 'Materials Engineering',
      'Section': 'Metallurgical Testing',
      'Date of Birth': '1979-10-03',
      'Date of Joining': '2006-08-01',
      'Promotion Date': '',
      'Previous Designation': '',
      'New Designation': '',
      'Retirement Date': '',
      'Wedding Anniversary': '2007-05-12',
      'Photo File': 'rajeshwar-rao.jpg',
      'Status': 'active'
    }
  ];

  const wsEmployees = XLSX.utils.json_to_sheet(empData);
  XLSX.utils.book_append_sheet(wb, wsEmployees, 'Employees');

  // Family Sample Data
  const famData = [
    {
      'Employee ID': 'EMP001',
      'Relation Name': 'Rahul Sharma',
      'Relation Type': 'Spouse',
      'Date of Birth': '1986-10-03',
      'Wedding Anniversary': '2012-10-03',
      'Photo File': 'rahul-sharma.jpg'
    },
    {
      'Employee ID': 'EMP001',
      'Relation Name': 'Aarav Sharma',
      'Relation Type': 'Son',
      'Date of Birth': '2015-10-03',
      'Wedding Anniversary': '',
      'Photo File': 'aarav-sharma.jpg'
    }
  ];

  const wsFamily = XLSX.utils.json_to_sheet(famData);
  XLSX.utils.book_append_sheet(wb, wsFamily, 'FamilyRelations');

  const excelOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Uint8Array(excelOut);
}
