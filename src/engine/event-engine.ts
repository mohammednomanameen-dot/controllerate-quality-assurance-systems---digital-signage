import {
  AppConfig,
  Employee,
  FamilyRelation,
  Festival,
  QuoteCollection,
  SlideData
} from '../types';
import {
  ActiveDateInfo,
  calculateCompletedYears,
  getOrdinal,
  isExactDateMatch,
  isRecurringMatch
} from './date-engine';
import organizationIntroVideo from '../assets/video/organization-intro.mp4';

/**
 * Helper to pick a quote from category safely
 */
function getRandomQuote(quotes: QuoteCollection, category: keyof QuoteCollection, fallback: string): string {
  const list = quotes[category];
  if (!list || list.length === 0) return fallback;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

/**
 * Builds the full digital signage slideshow queue for today.
 */
export function buildSlideshowQueue(
  config: AppConfig,
  employees: Employee[],
  relations: FamilyRelation[],
  festivals: Festival[],
  quotes: QuoteCollection,
  activeDate: ActiveDateInfo
): SlideData[] {
  const queue: SlideData[] = [];
  const eventSlides: SlideData[] = [];

  // ==========================================
  // 1. SCREEN 1 — MANDATORY COMBINED WELCOME & INTRO
  // ==========================================
  queue.push({
    id: 'screen-1-welcome',
    type: 'welcome',
    title: 'Organization Introduction & Welcome',
    duration: config.timings.organizationWelcome || 14,
    payload: {
      organization: config.organization,
      controller: config.controller,
      activeDate
    }
  });

  // ==========================================
  // 2. SCREEN 2 — DEDICATED INTRODUCTORY VIDEO
  // ==========================================
  if (config.features.video) {
    queue.push({
      id: 'screen-2-video',
      type: 'video',
      title: 'Introductory Video',
      duration: config.timings.videoFallback || 12,
      payload: {
        videoSrc: organizationIntroVideo,
        organization: config.organization,
        fallbackDuration: config.timings.videoFallback || 12
      }
    });
  }

  // ==========================================
  // 3. EVENT DETECTION ENGINE
  // ==========================================
  const todayBirthdays: Employee[] = [];
  const todayWorkAnniversaries: { employee: Employee; years: number }[] = [];
  const todayJoiningAnniversaries: { employee: Employee; years: number }[] = [];
  const todayPromotions: Employee[] = [];
  const todayRetirements: { employee: Employee; years: number }[] = [];
  const todayWeddingAnniversaries: { employee: Employee; years: number }[] = [];

  if (config.features.employeeEvents) {
    for (const emp of employees) {
      // Employee Birthday
      if (emp.status === 'active' && isRecurringMatch(emp.dateOfBirth, activeDate.monthDay)) {
        todayBirthdays.push(emp);
      }

      // Work Anniversary (using dateOfJoining)
      if (emp.status === 'active' && isRecurringMatch(emp.dateOfJoining, activeDate.monthDay)) {
        const years = calculateCompletedYears(emp.dateOfJoining, activeDate.year);
        if (years > 0) {
          todayWorkAnniversaries.push({ employee: emp, years });
        }
      }

      // Joining Anniversary
      if (emp.status === 'active' && isRecurringMatch(emp.dateOfJoining, activeDate.monthDay)) {
        const years = calculateCompletedYears(emp.dateOfJoining, activeDate.year);
        todayJoiningAnniversaries.push({ employee: emp, years });
      }

      // Promotion (matches exact date YYYY-MM-DD)
      if (isExactDateMatch(emp.promotionDate, activeDate.isoDateString) && emp.newDesignation) {
        todayPromotions.push(emp);
      }

      // Retirement (matches exact date YYYY-MM-DD or status retired today)
      if (isExactDateMatch(emp.retirementDate, activeDate.isoDateString)) {
        const years = calculateCompletedYears(emp.dateOfJoining, activeDate.year);
        todayRetirements.push({ employee: emp, years });
      }

      // Wedding Anniversary
      if (emp.weddingDate && isRecurringMatch(emp.weddingDate, activeDate.monthDay)) {
        const years = calculateCompletedYears(emp.weddingDate, activeDate.year);
        todayWeddingAnniversaries.push({ employee: emp, years });
      }
    }
  }

  // Family / Indirect Relations Events
  const todayFamilyEvents: { relation: FamilyRelation; quote: string }[] = [];
  if (config.features.familyEvents) {
    for (const rel of relations) {
      if (isRecurringMatch(rel.eventDate, activeDate.monthDay)) {
        const quote = getRandomQuote(
          quotes,
          rel.eventType === 'birthday' ? 'familyBirthday' : 'weddingAnniversary',
          'Warmest wishes from the Controllerate family.'
        );
        todayFamilyEvents.push({ relation: rel, quote });
      }
    }
  }

  // Festivals
  const todayFestivals: Festival[] = [];
  if (config.features.festivalGreetings) {
    for (const fest of festivals) {
      if (isRecurringMatch(fest.date, activeDate.monthDay)) {
        todayFestivals.push(fest);
      }
    }
  }

  // ==========================================
  // 4. MAP DETECTED EVENTS TO SLIDES
  // ==========================================
  const slideMap: Record<string, SlideData[]> = {
    birthday: [],
    'work-anniversary': [],
    'joining-anniversary': [],
    promotion: [],
    retirement: [],
    'wedding-anniversary': [],
    'family-event': [],
    festival: []
  };

  // Group Birthdays: if multiple employees (e.g. 2 or 3), show on a balanced card group
  // If more than 3, paginate into chunks of 3 so text remains huge and visible for TV.
  if (todayBirthdays.length > 0) {
    const chunkSize = 3;
    for (let i = 0; i < todayBirthdays.length; i += chunkSize) {
      const chunk = todayBirthdays.slice(i, i + chunkSize);
      const quote = getRandomQuote(quotes, 'birthday', 'Wishing you a year filled with success, happiness, and memorable moments.');
      slideMap['birthday'].push({
        id: `event-birthday-${i}`,
        type: 'birthday',
        title: 'Today\'s Birthday Celebration',
        duration: config.timings.event || 9,
        payload: {
          employees: chunk,
          quote,
          organization: config.organization,
          isMultiple: chunk.length > 1
        }
      });
    }
  }

  // Work Anniversaries
  for (let i = 0; i < todayWorkAnniversaries.length; i++) {
    const item = todayWorkAnniversaries[i];
    const quote = getRandomQuote(quotes, 'workAnniversary', 'Every year of dedication strengthens the journey toward excellence.');
    slideMap['work-anniversary'].push({
      id: `event-work-anniv-${item.employee.employeeId}`,
      type: 'work-anniversary',
      title: 'Celebrating Work Anniversary',
      duration: config.timings.event || 9,
      payload: {
        employee: item.employee,
        years: item.years,
        ordinalYears: getOrdinal(item.years),
        quote,
        organization: config.organization
      }
    });
  }

  // Joining Anniversaries (if distinct from work anniversary or as an additional celebratory slide)
  // To avoid redundant duplicate slide when work anniversary is also present for same employee, we keep unique
  for (let i = 0; i < todayJoiningAnniversaries.length; i++) {
    const item = todayJoiningAnniversaries[i];
    // If not already covered in work anniversaries with same duration, display dedicated joining slide
    const quote = getRandomQuote(quotes, 'joiningAnniversary', 'A journey of professional excellence and dedicated service.');
    slideMap['joining-anniversary'].push({
      id: `event-joining-anniv-${item.employee.employeeId}`,
      type: 'joining-anniversary',
      title: 'Joining Anniversary',
      duration: config.timings.event || 9,
      payload: {
        employee: item.employee,
        years: item.years,
        quote,
        organization: config.organization
      }
    });
  }

  // Promotions
  for (let i = 0; i < todayPromotions.length; i++) {
    const emp = todayPromotions[i];
    const quote = getRandomQuote(quotes, 'promotion', 'New responsibilities bring new opportunities to make a difference.');
    slideMap['promotion'].push({
      id: `event-promotion-${emp.employeeId}`,
      type: 'promotion',
      title: 'Congratulations on Promotion',
      duration: config.timings.event || 9,
      payload: {
        employee: emp,
        quote,
        organization: config.organization
      }
    });
  }

  // Retirements
  for (let i = 0; i < todayRetirements.length; i++) {
    const item = todayRetirements[i];
    const quote = getRandomQuote(quotes, 'retirement', 'With appreciation and best wishes for decades of dedicated service.');
    slideMap['retirement'].push({
      id: `event-retirement-${item.employee.employeeId}`,
      type: 'retirement',
      title: 'Honoring Distinguished Service',
      duration: config.timings.event || 10,
      payload: {
        employee: item.employee,
        years: item.years,
        quote,
        organization: config.organization
      }
    });
  }

  // Wedding Anniversaries
  for (let i = 0; i < todayWeddingAnniversaries.length; i++) {
    const item = todayWeddingAnniversaries[i];
    const quote = getRandomQuote(quotes, 'weddingAnniversary', 'Wishing you a lifetime of joy, companionship, and happiness.');
    slideMap['wedding-anniversary'].push({
      id: `event-wedding-anniv-${item.employee.employeeId}`,
      type: 'wedding-anniversary',
      title: 'Happy Wedding Anniversary',
      duration: config.timings.event || 9,
      payload: {
        employee: item.employee,
        years: item.years,
        quote,
        organization: config.organization
      }
    });
  }

  // Family Events
  for (let i = 0; i < todayFamilyEvents.length; i++) {
    const item = todayFamilyEvents[i];
    slideMap['family-event'].push({
      id: `event-family-${item.relation.relationId}`,
      type: 'family-event',
      title: item.relation.eventType === 'birthday' ? 'Family Birthday Celebration' : 'Family Wedding Anniversary',
      duration: config.timings.event || 9,
      payload: {
        relation: item.relation,
        quote: item.quote,
        showPhoto: config.features.familyPhotos,
        organization: config.organization
      }
    });
  }

  // Festivals
  for (let i = 0; i < todayFestivals.length; i++) {
    const fest = todayFestivals[i];
    slideMap['festival'].push({
      id: `event-festival-${fest.festivalId}`,
      type: 'festival',
      title: `Festival Greeting - ${fest.name}`,
      duration: config.timings.festival || 10,
      payload: {
        festival: fest,
        organization: config.organization
      }
    });
  }

  // Assemble event slides based on priority ordering
  const priorities = config.eventPriority || [
    'birthday',
    'work-anniversary',
    'joining-anniversary',
    'promotion',
    'retirement',
    'wedding-anniversary',
    'family-event',
    'festival'
  ];

  for (const prio of priorities) {
    if (slideMap[prio] && slideMap[prio].length > 0) {
      eventSlides.push(...slideMap[prio]);
    }
  }

  // Append event slides to queue
  queue.push(...eventSlides);

  return queue;
}
