import Papa from 'papaparse';
import { Student } from '../types';
import { getRandomAvatar } from './mockData';

// Google Sheet "Publish to Web" CSV link
const SHEET_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFfup1esEFk2gLlbRxOxtn0art4TmCWX1uoJM2BIfaNG1IsluBKg2k4Lfb7GjcG_3yrA3Em3nQBFWK/pub?output=csv';

interface SheetRow {
  [key: string]: string | undefined;
}

export const SheetService = {
  async fetchStudents(): Promise<Student[]> {
    const uniqueUrl = `${SHEET_BASE_URL}&t=${Date.now()}`; // Prevent Caching
    console.log("Fetching sheet data from:", uniqueUrl);

    return new Promise((resolve) => {
      Papa.parse<SheetRow>(uniqueUrl, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<SheetRow>) => {
          const rows = results.data;
          console.log("Raw Sheet Rows Fetched:", rows.length);
          
          if (rows.length > 0) {
             console.log("Sample Row Keys:", Object.keys(rows[0]));
          }

          // Helper to find value from multiple possible column headers (fuzzy match)
          const findValue = (row: SheetRow, possibleHeaders: string[]): string => {
            const rowKeys = Object.keys(row);
            // Try to find a key that includes one of the possible headers (case insensitive)
            // We use 'includes' to handle cases like "Name *" or "Name" or "GitHub Link(Optional)"
            const matchedKey = rowKeys.find(key => 
                possibleHeaders.some(header => key.toLowerCase().includes(header.toLowerCase()))
            );
            return matchedKey && row[matchedKey] ? row[matchedKey]!.trim() : '';
          };

          const students: Student[] = rows
            .filter((row) => {
                // Ensure row has a Name
                const name = findValue(row, ['Name']);
                return name && name !== '';
            }) 
            .map((row, index) => {
              // Exact mapping based on PDF headers provided
              const name = findValue(row, ['Name']);
              const email = findValue(row, ['Email']);
              const branch = findValue(row, ['Branch']);
              const yearStr = findValue(row, ['Year of Study', 'Year']);
              
              const skillsStr = findValue(row, ['Your programming skills', 'Skills']);
              const projectsStr = findValue(row, ['Projects you have worked on', 'Projects']);
              const bio = findValue(row, ['Write a short bio', 'Bio']);
              const funFact = findValue(row, ['One fun fact', 'Fun Fact']);
              const profilePhoto = findValue(row, ['Upload Your Profile Photo', 'Profile Photo']);
              
              const linkedIn = findValue(row, ['LinkedIn Link', 'LinkedIn']);
              const github = findValue(row, ['GitHub Link', 'GitHub']);
              const portfolio = findValue(row, ['Portfolio Link', 'Portfolio']);
              
              // Extra fields to enrich profile
              const interestsStr = findValue(row, ['Areas of interest']);
              const hobbiesStr = findValue(row, ['Hobbies']);
              const sportsStr = findValue(row, ['Sports']);

              // Parse Year (e.g., "1st Year" -> 1)
              let year = 1;
              if (yearStr) {
                const match = yearStr.match(/\d+/);
                if (match) year = parseInt(match[0]);
              }

              // Convert comma separated string to array
              const skillsList = skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(s => s) : [];
              const hobbiesList = hobbiesStr ? hobbiesStr.split(',').map(s => s.trim()).filter(s => s) : [];
              const sportsList = sportsStr ? sportsStr.split(',').map(s => s.trim()).filter(s => s) : [];
              
              // Simple project parser
              const projectsList = projectsStr ? [{
                 id: `sheet-p-${index}`,
                 title: projectsStr.split(':')[0].substring(0, 30) || 'Project', // truncate title if too long
                 description: projectsStr,
                 techStack: []
              }] : [];

              // Construct Bio (Clean, just the bio + fun fact)
              let fullBio = bio || '';
              if (funFact) fullBio += `\n\n💡 Fun Fact: ${funFact}`;
              if (interestsStr) fullBio += `\n\n🎯 Areas of Interest: ${interestsStr}`;

              return {
                id: `sheet-${index}`,
                name: name,
                email: email,
                avatar: profilePhoto && profilePhoto.startsWith('http') 
                  ? profilePhoto 
                  : getRandomAvatar(name), // Fallback to random if no photo
                branch: branch || 'General',
                year: year,
                bio: fullBio || 'Student at MMMUT.',
                gender: 'Other',
                skills: skillsList,
                hobbies: hobbiesList,
                sports: sportsList,
                achievements: [], 
                projects: projectsList,
                socials: {
                  linkedin: linkedIn,
                  github: github,
                  portfolio: portfolio
                },
                badges: ['Verified Student'],
                quizScore: 0
              };
            });
            
          console.log("Parsed Students:", students.length);
          resolve(students);
        },
        error: (err: Error) => {
          console.error("Error parsing sheet CSV:", err);
          resolve([]);
        }
      });
    });
  }
};