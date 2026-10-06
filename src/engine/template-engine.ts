/**
 * Template Engine
 * Handles template string interpolation (e.g. {{name}}, {{designation}}, {{quote}})
 * and provides replaceable HTML/CSS template schemas.
 */

export interface TemplateContext {
  name?: string;
  designation?: string;
  department?: string;
  section?: string;
  photo?: string;
  eventName?: string;
  quote?: string;
  years?: number | string;
  ordinalYears?: string;
  relation?: string;
  employeeName?: string;
  previousDesignation?: string;
  newDesignation?: string;
  organizationName?: string;
  slogan?: string;
  location?: string;
  date?: string;
  hindiDate?: string;
  [key: string]: any;
}

/**
 * Replaces placeholders like {{name}}, {{designation}}, etc. in a template string.
 */
export function interpolateTemplate(templateString: string, context: TemplateContext): string {
  return templateString.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
    if (context[key] !== undefined && context[key] !== null) {
      return String(context[key]);
    }
    return '';
  });
}

/**
 * Standard replaceable raw HTML template blueprints
 * Can be exported or customized without touching the event detection engine.
 */
export const RAW_TEMPLATES: Record<string, string> = {
  birthday: `
    <div class="template-card birthday-card">
      <div class="header-seal">{{organizationName}} • {{slogan}}</div>
      <div class="content-split">
        <div class="photo-frame"><img src="{{photo}}" alt="{{name}}" /></div>
        <div class="details-pane">
          <span class="kicker">TODAY'S CELEBRATION</span>
          <h1 class="title">Happy Birthday</h1>
          <h2 class="person-name">{{name}}</h2>
          <p class="designation">{{designation}}</p>
          <p class="department">{{department}}</p>
          <blockquote class="quote">“{{quote}}”</blockquote>
        </div>
      </div>
    </div>
  `,
  workAnniversary: `
    <div class="template-card anniversary-card">
      <div class="header-seal">{{organizationName}}</div>
      <div class="milestone-badge">{{years}} Years of Dedicated Service</div>
      <h1 class="title">Celebrating Work Anniversary</h1>
      <h2 class="person-name">{{name}}</h2>
      <p class="designation">{{designation}} • {{department}}</p>
      <blockquote class="quote">“{{quote}}”</blockquote>
    </div>
  `,
  promotion: `
    <div class="template-card promotion-card">
      <h1 class="title">Congratulations on Promotion</h1>
      <div class="person-name">{{name}}</div>
      <div class="transition-ladder">
        <span class="old-role">{{previousDesignation}}</span>
        <span class="arrow">➔</span>
        <span class="new-role">{{newDesignation}}</span>
      </div>
      <blockquote class="quote">“{{quote}}”</blockquote>
    </div>
  `,
  retirement: `
    <div class="template-card retirement-card">
      <h1 class="title">With Appreciation & Best Wishes</h1>
      <div class="person-name">{{name}}</div>
      <p class="designation">{{designation}}</p>
      <p class="service-record">{{years}} Years of Exemplary Duty</p>
      <blockquote class="quote">“{{quote}}”</blockquote>
    </div>
  `,
  familyEvent: `
    <div class="template-card family-card">
      <span class="kicker">FAMILY EVENT</span>
      <h1 class="title">{{eventName}}</h1>
      <h2 class="person-name">{{name}}</h2>
      <div class="relation-marker">{{relation}} of {{employeeName}}</div>
      <blockquote class="quote">“{{quote}}”</blockquote>
    </div>
  `,
  festival: `
    <div class="template-card festival-card">
      <h1 class="title">{{eventName}}</h1>
      <blockquote class="greeting">“{{quote}}”</blockquote>
      <div class="signoff">{{organizationName}} • {{location}}</div>
    </div>
  `
};
