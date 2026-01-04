
import { Alumni } from '../types';

/* 
 * NOTE: This rule-based matching engine is designed to be replaced 
 * by ML models using interaction data in future versions.
 */

export interface StudentPreferences {
  branch: string;
  interestedDomain: string;
  careerGoal: 'Mentorship' | 'Internship' | 'Career Switch' | 'Higher Studies' | 'Other';
  preferredExperience: '0-2' | '2-5' | '5-10' | '10+' | 'Any';
  passoutPreference?: string; // Not strictly used in calc but part of input
}

export interface MatchResult {
  alumni: Alumni;
  score: number;
  reasons: string[];
}

export const MatchingService = {
  
  /**
   * Main matching function
   */
  findMatches(studentPrefs: StudentPreferences, alumniList: Alumni[]): MatchResult[] {
    const scoredAlumni = alumniList.map(alumni => {
      let totalScore = 0;
      const reasons: string[] = [];

      // 1. Branch Match (Max 30)
      const branchScore = this.calculateBranchScore(studentPrefs.branch, alumni.branch);
      totalScore += branchScore;
      if (branchScore === 30) reasons.push(`Same branch (${alumni.branch})`);
      else if (branchScore === 15) reasons.push(`Related branch (${alumni.branch})`);

      // 2. Domain Match (Max 30)
      const domainScore = this.calculateDomainScore(studentPrefs.interestedDomain, alumni.domain);
      totalScore += domainScore;
      if (domainScore === 30) reasons.push(`Exact domain match (${alumni.domain})`);
      else if (domainScore === 15) reasons.push(`Related domain field`);

      // 3. Experience Match (Max 20)
      const expScore = this.calculateExperienceScore(studentPrefs.preferredExperience, alumni.experience);
      totalScore += expScore;
      if (expScore >= 15) reasons.push(`${alumni.experience} years experience aligns with preference`);

      // 4. Career Goal Alignment (Max 10)
      const goalScore = this.calculateCareerGoalScore(studentPrefs.careerGoal, alumni);
      totalScore += goalScore;
      if (goalScore > 0) reasons.push(`Profile fits ${studentPrefs.careerGoal} goal`);

      // 5. Passout Year Proximity (Max 10)
      // Assuming current year is 2025 for calculation
      const passoutScore = this.calculatePassoutScore(alumni.batch);
      totalScore += passoutScore;
      // Passout reason is usually implicit in experience, skipping explicit reason unless very relevant

      // Clamp Score
      const finalScore = Math.min(100, Math.max(0, totalScore));

      return {
        alumni,
        score: finalScore,
        reasons: reasons
      };
    });

    // Filter < 40 and Sort
    return scoredAlumni
      .filter(match => match.score >= 40)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Return top 5
  },

  // --- Helper Functions ---

  calculateBranchScore(studentBranch: string, alumniBranch: string): number {
    const sBranch = studentBranch.toLowerCase();
    const aBranch = alumniBranch.toLowerCase();

    if (sBranch === aBranch) return 30;

    // Related mappings
    const related: Record<string, string[]> = {
      'cse': ['it', 'computer science'],
      'it': ['cse', 'computer science'],
      'ece': ['ee', 'eee'],
      'ee': ['ece', 'eee']
    };

    if (related[sBranch] && related[sBranch].includes(aBranch)) return 15;
    
    // Fuzzy check for partial matches (e.g. "Computer" in both)
    if (sBranch.includes('computer') && aBranch.includes('computer')) return 30;

    return 0;
  },

  calculateDomainScore(studentDomain: string, alumniDomain: string): number {
    const sDomain = studentDomain.toLowerCase();
    const aDomain = alumniDomain.toLowerCase();

    if (sDomain === aDomain) return 30;
    if (aDomain.includes(sDomain) || sDomain.includes(aDomain)) return 30;

    // Related Domains
    const related: Record<string, string[]> = {
      'software': ['it', 'cse', 'development', 'engineering'],
      'ai/ml': ['data science', 'analytics', 'robotics'],
      'management': ['product', 'business', 'mba'],
      'core': ['electrical', 'mechanical', 'civil', 'embedded']
    };

    // Check if both fall into a related bucket
    for (const key in related) {
        const group = related[key];
        if ((group.includes(sDomain) || sDomain === key) && (group.includes(aDomain) || aDomain === key)) {
            return 15;
        }
    }

    return 0;
  },

  calculateExperienceScore(pref: string, years: number): number {
    if (pref === 'Any') return 15;
    
    if (pref === '0-2' && years <= 2) return 20;
    if (pref === '2-5' && years > 2 && years <= 5) return 20;
    if (pref === '5-10' && years > 5 && years <= 10) return 20;
    if (pref === '10+' && years > 10) return 20;

    // Near miss logic could go here, for now returning baseline mismatch
    return 5;
  },

  calculateCareerGoalScore(goal: string, alumni: Alumni): number {
    const role = alumni.role.toLowerCase();
    
    if (goal === 'Mentorship') {
        if (alumni.experience > 5 || role.includes('senior') || role.includes('lead') || role.includes('manager')) return 10;
    }
    if (goal === 'Internship') {
        // Juniors/Mids might be more approachable for referrals or tips
        if (alumni.experience < 5 || role.includes('sde') || role.includes('engineer')) return 10;
    }
    if (goal === 'Higher Studies') {
        if (alumni.cgpa > 8.5) return 8;
        if (alumni.domain.toLowerCase().includes('research') || role.includes('scientist')) return 10;
    }
    if (goal === 'Career Switch') {
        // Hard to detect without student's origin domain, giving generic boost
        return 5;
    }

    return 0;
  },

  calculatePassoutScore(batch: number): number {
    const currentYear = new Date().getFullYear();
    const diff = currentYear - batch;

    if (diff <= 3) return 10;
    if (diff <= 7) return 7;
    if (diff <= 12) return 4;
    return 2;
  }
};
