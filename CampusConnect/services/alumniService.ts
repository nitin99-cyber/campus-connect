
import { Alumni } from '../types';
import { MOCK_ALUMNI } from './mockData';

export const AlumniService = {
  // Simulate API fetch
  async getAllAlumni(): Promise<Alumni[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_ALUMNI);
      }, 800);
    });
  },

  async getAlumniById(id: string): Promise<Alumni | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const alumni = MOCK_ALUMNI.find(a => a.id === id);
        resolve(alumni);
      }, 500);
    });
  },

  // Mock submission for joining
  async joinNetwork(data: any): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  }
};
