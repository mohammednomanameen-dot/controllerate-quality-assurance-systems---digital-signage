export interface OrganizationConfig {
  name: string;
  slogan: string; // e.g. "गुणवत्ता से विश्वास"
  location: string;
  logo: string;
  subTitle?: string;
  ministry?: string;
}

export interface ControllerConfig {
  name: string;
  designation: string;
  photo: string;
  message?: string;
}

export interface DisplayTimings {
  organizationWelcome: number; // seconds
  event: number; // seconds
  festival: number; // seconds
  videoFallback: number; // seconds
}

export interface FeatureSettings {
  employeeEvents: boolean;
  familyEvents: boolean;
  familyPhotos: boolean;
  festivalGreetings: boolean;
  video: boolean;
  quotes: boolean;
  allowManualControl: boolean;
}

export interface AppConfig {
  organization: OrganizationConfig;
  controller: ControllerConfig;
  display: {
    resolution: string;
    fullscreen: boolean;
    loop: boolean;
  };
  timings: DisplayTimings;
  features: FeatureSettings;
  testing: {
    testDate: string | null; // e.g. "2026-10-03" or null
  };
  security: {
    adminPin: string;
  };
  eventPriority: string[];
}

export interface Employee {
  employeeId: string;
  employeeCode: string;
  name: string;
  designation: string;
  department: string;
  section: string;
  photo: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  dateOfJoining: string; // "YYYY-MM-DD"
  retirementDate: string | null; // "YYYY-MM-DD" or null
  weddingDate?: string | null; // "YYYY-MM-DD" or null
  promotionDate?: string | null; // "YYYY-MM-DD"
  previousDesignation?: string | null;
  newDesignation?: string | null;
  status: 'active' | 'retired';
}

export type RelationType = 'Spouse' | 'Son' | 'Daughter' | 'Father' | 'Mother' | 'Other';

export interface FamilyRelation {
  relationId: string;
  employeeId: string;
  employeeName: string;
  personName: string;
  relation: RelationType;
  eventType: 'birthday' | 'anniversary';
  eventDate: string; // "MM-DD" or "YYYY-MM-DD"
  photo?: string;
}

export interface Festival {
  festivalId: string;
  name: string;
  date: string; // "YYYY-MM-DD" or "MM-DD"
  greeting: string;
  subtext?: string;
  image?: string;
  themeColor?: string;
}

export interface QuoteCollection {
  birthday: string[];
  workAnniversary: string[];
  joiningAnniversary: string[];
  promotion: string[];
  retirement: string[];
  weddingAnniversary: string[];
  familyBirthday: string[];
}

export type SlideType =
  | 'welcome'
  | 'video'
  | 'birthday'
  | 'work-anniversary'
  | 'joining-anniversary'
  | 'promotion'
  | 'retirement'
  | 'wedding-anniversary'
  | 'family-event'
  | 'festival';

export interface SlideData {
  id: string;
  type: SlideType;
  title: string;
  duration: number; // seconds
  payload: any;
}
