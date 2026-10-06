import React, { useState } from 'react';
import {
  AppConfig,
  Employee,
  FamilyRelation,
  Festival,
  QuoteCollection,
  SlideType
} from '../types';
import {
  generateSampleExcelWorkbook,
  parseExcelWorkbook
} from '../engine/excel-engine';
import { resetToDefaults, saveToLocalStorage } from '../engine/data-loader';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onUpdateConfig: (newConfig: AppConfig) => void;
  employees: Employee[];
  onUpdateEmployees: (emps: Employee[]) => void;
  relations: FamilyRelation[];
  onUpdateRelations: (rels: FamilyRelation[]) => void;
  festivals: Festival[];
  quotes: QuoteCollection;
  onPreviewTemplate: (type: SlideType) => void;
  onRefreshData: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  employees,
  onUpdateEmployees,
  relations,
  onUpdateRelations,
  festivals,
  quotes,
  onPreviewTemplate,
  onRefreshData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'testing' | 'templates' | 'timings' | 'org' | 'excel' | 'data'>(
    'testing'
  );

  // Form State
  const [testDateInput, setTestDateInput] = useState<string>(config.testing.testDate || '');
  const [orgConfig, setOrgConfig] = useState(config.organization);
  const [ctrlConfig, setCtrlConfig] = useState(config.controller);
  const [timingsConfig, setTimingsConfig] = useState(config.timings);
  const [featuresConfig, setFeaturesConfig] = useState(config.features);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // PIN Authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === (config.security.adminPin || '1234')) {
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('Invalid PIN code. Default is 1234.');
    }
  };

  // Save Settings
  const handleSaveAllSettings = () => {
    const updated: AppConfig = {
      ...config,
      organization: orgConfig,
      controller: ctrlConfig,
      timings: timingsConfig,
      features: featuresConfig,
      testing: {
        testDate: testDateInput.trim() ? testDateInput.trim() : null
      }
    };
    onUpdateConfig(updated);
    saveToLocalStorage({ config: updated });
    alert('Settings saved successfully!');
  };

  // Handle Excel Upload
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        const result = parseExcelWorkbook(buffer);
        if (result.employees.length > 0) {
          onUpdateEmployees(result.employees);
          saveToLocalStorage({ employees: result.employees });
        }
        if (result.relations.length > 0) {
          onUpdateRelations(result.relations);
          saveToLocalStorage({ relations: result.relations });
        }
        setImportStatus(
          `Success: Imported ${result.summary.employeeCount} employees & ${result.summary.relationCount} family relations from Excel.`
        );
        onRefreshData();
      } catch (err: any) {
        setImportStatus(`Error parsing Excel: ${err?.message || 'Invalid format'}`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Download Sample Excel Template
  const handleDownloadSampleExcel = () => {
    const excelBytes = generateSampleExcelWorkbook();
    const blob = new Blob([excelBytes as any], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CQAS_Employee_Family_Template.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all configurations and data back to bundled defaults?')) {
      resetToDefaults();
      location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-6 select-none font-sans">
      <div className="bg-[#FFFDF7] border-2 border-orange-300 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-600 px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
            <h2 className="text-lg font-serif font-black text-white tracking-wide drop-shadow">
              Digital Signage Admin Console • CQAS Secunderabad
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 px-3 py-1 rounded-lg text-sm font-bold transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* PIN Screen */}
        {!isAuthenticated ? (
          <div className="p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center mx-auto text-2xl text-orange-600 shadow-inner">
              🔒
            </div>
            <div>
              <h3 className="text-2xl font-serif font-black text-stone-900">Administrator Access Required</h3>
              <p className="text-sm text-stone-600 mt-1">
                Enter your 4-digit local PIN to access system settings. (Default: 1234)
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (1234)"
                autoFocus
                className="w-full text-center text-3xl tracking-[0.5em] px-4 py-3 bg-white border-2 border-orange-300 rounded-2xl text-orange-600 focus:outline-none focus:border-emerald-600 font-mono shadow-sm"
              />
              {pinError && <p className="text-xs text-rose-600 font-bold">{pinError}</p>}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-emerald-700 hover:from-orange-600 hover:to-emerald-800 text-white font-bold rounded-2xl transition-all shadow-lg"
              >
                Unlock Admin Console
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs in Cream, Saffron & Emerald */}
            <div className="flex border-b border-stone-200 bg-stone-50 px-6 gap-2 pt-3 overflow-x-auto text-xs font-bold">
              {[
                { id: 'testing', label: '🗓️ Test Date & Preview' },
                { id: 'templates', label: '🎨 Template Switcher' },
                { id: 'timings', label: '⏱️ Slide Timings' },
                { id: 'org', label: '🏛️ Org & Controller' },
                { id: 'excel', label: '📊 Excel Import / Export' },
                { id: 'data', label: '👥 Employee Roster' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 font-bold whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-700 bg-[#FFFDF7] shadow-sm'
                      : 'border-transparent text-stone-600 hover:text-emerald-700 hover:bg-stone-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-stone-800 bg-[#FFFDF7]">
              {/* TAB 1: TEST DATE */}
              {activeTab === 'testing' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-200 shadow-sm">
                    <h4 className="font-black text-orange-700 text-base mb-1 font-serif">
                      Event Testing & Time-Travel Mode
                    </h4>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      Set a custom test date (e.g. <code>2026-10-03</code>) to simulate today's birthdays, anniversaries, promotions, retirements, and festivals. Leave blank to use computer's real-time clock.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                        Active Test Date (YYYY-MM-DD)
                      </label>
                      <input
                        type="date"
                        value={testDateInput}
                        onChange={(e) => setTestDateInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-mono shadow-sm focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2 pt-6">
                      <button
                        onClick={() => {
                          setTestDateInput('2026-10-03');
                        }}
                        className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                      >
                        Set 2026-10-03 (Sample Events)
                      </button>
                      <button
                        onClick={() => {
                          setTestDateInput('');
                        }}
                        className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                      >
                        Use Real System Clock
                      </button>
                    </div>
                  </div>

                  {/* Feature Toggles */}
                  <div className="pt-4 border-t border-stone-200">
                    <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3">
                      Display Feature Switches
                    </h5>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: 'employeeEvents', label: 'Employee Events (Birthdays/Anniversaries)' },
                        { key: 'familyEvents', label: 'Family / Indirect Relation Events' },
                        { key: 'familyPhotos', label: 'Show Family Member Photos' },
                        { key: 'festivalGreetings', label: 'Festival Greeting Slides' },
                        { key: 'video', label: 'Organization Introductory Video' },
                        { key: 'quotes', label: 'Curated Quotes Engine' }
                      ].map((feat) => (
                        <label
                          key={feat.key}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-white border-2 border-stone-200 cursor-pointer hover:border-orange-400 shadow-sm"
                        >
                          <input
                            type="checkbox"
                            checked={(featuresConfig as any)[feat.key]}
                            onChange={(e) =>
                              setFeaturesConfig({
                                ...featuresConfig,
                                [feat.key]: e.target.checked
                              })
                            }
                            className="rounded border-stone-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
                          />
                          <span className="text-xs text-stone-800 font-semibold">{feat.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TEMPLATE SWITCHER & PREVIEW */}
              {activeTab === 'templates' && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-600 font-medium">
                    Click any slide template to jump into preview mode immediately:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { type: 'welcome', label: '🏛️ Screen 1: Welcome & Intro (Combined)' },
                      { type: 'video', label: '🎬 Screen 2: Intro Video' },
                      { type: 'birthday', label: '🎂 Employee Birthday' },
                      { type: 'work-anniversary', label: '🎖️ Work Anniversary' },
                      { type: 'joining-anniversary', label: '🤝 Joining Anniversary' },
                      { type: 'promotion', label: '🚀 Promotion Felicitation' },
                      { type: 'retirement', label: '🌟 Valedictory Retirement' },
                      { type: 'wedding-anniversary', label: '💍 Wedding Anniversary' },
                      { type: 'family-event', label: '👨‍👩‍👧 Family Birthday / Anniversary' },
                      { type: 'festival', label: '🪔 Festival Greeting' }
                    ].map((tpl) => (
                      <button
                        key={tpl.type}
                        onClick={() => {
                          onPreviewTemplate(tpl.type as SlideType);
                          onClose();
                        }}
                        className="p-4 rounded-2xl bg-white border-2 border-stone-200 hover:border-orange-500 text-left transition-all hover:shadow-md hover:bg-orange-50/40"
                      >
                        <div className="text-sm font-bold text-stone-900">{tpl.label}</div>
                        <div className="text-[11px] text-stone-500 mt-1 font-medium">Click to render preview</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TIMINGS */}
              {activeTab === 'timings' && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-600 font-medium">
                    Configure the duration in seconds for each slide category:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Screen 1: Welcome & Introduction (seconds)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={60}
                        value={timingsConfig.organizationWelcome}
                        onChange={(e) =>
                          setTimingsConfig({
                            ...timingsConfig,
                            organizationWelcome: parseInt(e.target.value, 10) || 12
                          })
                        }
                        className="w-full px-4 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-bold focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Standard Event Slides (seconds)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={60}
                        value={timingsConfig.event}
                        onChange={(e) =>
                          setTimingsConfig({
                            ...timingsConfig,
                            event: parseInt(e.target.value, 10) || 8
                          })
                        }
                        className="w-full px-4 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-bold focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Festival Greeting (seconds)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={60}
                        value={timingsConfig.festival}
                        onChange={(e) =>
                          setTimingsConfig({
                            ...timingsConfig,
                            festival: parseInt(e.target.value, 10) || 10
                          })
                        }
                        className="w-full px-4 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-bold focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Video Fallback Duration (seconds)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={60}
                        value={timingsConfig.videoFallback}
                        onChange={(e) =>
                          setTimingsConfig({
                            ...timingsConfig,
                            videoFallback: parseInt(e.target.value, 10) || 12
                          })
                        }
                        className="w-full px-4 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-bold focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ORG & CONTROLLER */}
              {activeTab === 'org' && (
                <div className="space-y-6">
                  <div>
                    <h5 className="font-black text-orange-600 uppercase text-xs tracking-wider mb-3">
                      Organization Details
                    </h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Organization Name</label>
                        <input
                          type="text"
                          value={orgConfig.name}
                          onChange={(e) => setOrgConfig({ ...orgConfig, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-semibold focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Hindi Slogan</label>
                        <input
                          type="text"
                          value={orgConfig.slogan}
                          onChange={(e) => setOrgConfig({ ...orgConfig, slogan: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-emerald-800 font-hindi font-bold focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Location</label>
                        <input
                          type="text"
                          value={orgConfig.location}
                          onChange={(e) => setOrgConfig({ ...orgConfig, location: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-semibold focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Sub Title / Division</label>
                        <input
                          type="text"
                          value={orgConfig.subTitle || ''}
                          onChange={(e) => setOrgConfig({ ...orgConfig, subTitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-semibold focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200">
                    <h5 className="font-black text-emerald-800 uppercase text-xs tracking-wider mb-3">
                      Controller Details
                    </h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Controller Name</label>
                        <input
                          type="text"
                          value={ctrlConfig.name}
                          onChange={(e) => setCtrlConfig({ ...ctrlConfig, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-stone-900 font-semibold focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Designation</label>
                        <input
                          type="text"
                          value={ctrlConfig.designation}
                          onChange={(e) => setCtrlConfig({ ...ctrlConfig, designation: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-stone-300 rounded-xl text-orange-600 font-bold focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: EXCEL IMPORT / EXPORT */}
              {activeTab === 'excel' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-3 shadow-sm">
                    <h4 className="font-black text-emerald-900 text-base font-serif">Offline Excel (.xlsx) Import</h4>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      Upload your employee roster and family relation sheets directly. The parser runs 100% in-browser without sending any private data over the internet.
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                      <label className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md transition-colors">
                        Upload Excel Spreadsheet (.xlsx)
                        <input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          onChange={handleExcelUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={handleDownloadSampleExcel}
                        className="px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border-2 border-stone-300 font-bold rounded-xl text-xs shadow-sm"
                      >
                        Download Excel Sample Template
                      </button>
                    </div>

                    {importStatus && (
                      <div className="p-3.5 bg-white border-2 border-emerald-400 rounded-xl text-xs text-emerald-800 font-bold shadow-sm">
                        {importStatus}
                      </div>
                    )}
                  </div>

                  <div className="border-2 border-stone-200 rounded-2xl p-5 bg-white shadow-sm">
                    <h5 className="font-bold text-stone-800 text-xs uppercase mb-3">
                      Standard Excel Column Schema
                    </h5>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="font-bold text-orange-600 mb-1">Sheet 1: Employees</div>
                        <ul className="list-disc list-inside text-stone-600 space-y-1">
                          <li>Employee ID (e.g. EMP001)</li>
                          <li>Employee Name</li>
                          <li>Designation</li>
                          <li>Department & Section</li>
                          <li>Date of Birth (YYYY-MM-DD)</li>
                          <li>Date of Joining (YYYY-MM-DD)</li>
                          <li>Promotion Date, Previous/New Role</li>
                          <li>Wedding Anniversary, Retirement Date</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-bold text-emerald-700 mb-1">Sheet 2: FamilyRelations</div>
                        <ul className="list-disc list-inside text-stone-600 space-y-1">
                          <li>Employee ID (matches Sheet 1)</li>
                          <li>Relation Name (e.g. Rahul Sharma)</li>
                          <li>Relation Type (Spouse/Son/Daughter/Father/Mother)</li>
                          <li>Date of Birth or Wedding Date</li>
                          <li>Photo File</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: DATA ROSTER */}
              {activeTab === 'data' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-600 font-bold">
                      Total Active Employees: <strong className="text-orange-600">{employees.length}</strong> | Family Relations: <strong className="text-emerald-700">{relations.length}</strong>
                    </span>
                    <button
                      onClick={handleResetDefaults}
                      className="text-xs text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 font-bold"
                    >
                      Reset to Factory Bundled Defaults
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto border-2 border-stone-200 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-stone-100 text-stone-700 sticky top-0 border-b border-stone-200 font-bold">
                        <tr>
                          <th className="p-3">ID</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Designation</th>
                          <th className="p-3">DOB</th>
                          <th className="p-3">Joining</th>
                          <th className="p-3">Special Event</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-mono">
                        {employees.map((emp) => (
                          <tr key={emp.employeeId} className="hover:bg-orange-50/50">
                            <td className="p-3 text-orange-600 font-bold">{emp.employeeId}</td>
                            <td className="p-3 font-sans font-bold text-stone-900">{emp.name}</td>
                            <td className="p-3 font-sans text-stone-700">{emp.designation}</td>
                            <td className="p-3 text-stone-500">{emp.dateOfBirth}</td>
                            <td className="p-3 text-stone-500">{emp.dateOfJoining}</td>
                            <td className="p-3 font-sans text-xs font-bold text-emerald-700">
                              {emp.promotionDate ? 'Promotion' : emp.retirementDate ? 'Retirement' : emp.weddingDate ? 'Wedding' : 'Regular'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">
                Shortcut: Press <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded text-stone-700 font-bold">Ctrl + Shift + A</kbd> anytime
              </span>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAllSettings}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-emerald-700 hover:from-orange-600 hover:to-emerald-800 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                >
                  Save & Apply Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
