
import { Student } from '../types';
import { MOCK_STUDENTS } from './mockData';
import { SheetService } from './sheetService';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const STORAGE_KEY = 'campus_connect_users';
const CURRENT_USER_KEY = 'campus_connect_current_user_id';

export const StudentService = {
  // Get all students (Firestore + Mock + Local)
  async getAllStudents(): Promise<Student[]> {
    try {
      const students: Student[] = [];

      // 1. Fetch from Firestore
      const querySnapshot = await getDocs(collection(db, "students"));
      querySnapshot.forEach((doc) => {
        // Ensure the ID in the data matches the doc ID
        const data = doc.data() as Student;
        students.push({ ...data, id: doc.id });
      });

      // 2. Combine with Mock Data (for demo population if Firestore is empty/low)
      // In production, remove MOCK_STUDENTS
      return [...students, ...MOCK_STUDENTS];
    } catch (error) {
      console.error("Failed to fetch students from Firestore", error);
      return MOCK_STUDENTS;
    }
  },

  // Save a new student to Firestore
  async addStudent(student: Student): Promise<void> {
    try {
      // Use the student.id (which matches the Auth UID) as the document ID
      await setDoc(doc(db, "students", student.id), student);
      localStorage.setItem(CURRENT_USER_KEY, student.id);
    } catch (error) {
      console.error("Error adding student to Firestore: ", error);
      // Fallback to local storage if firestore fails
      const localData = localStorage.getItem(STORAGE_KEY);
      const localStudents: Student[] = localData ? JSON.parse(localData) : [];
      const updatedStudents = [student, ...localStudents];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudents));
    }
  },

  // Get a specific student by ID (check Firestore first)
  async getStudentById(id: string): Promise<Student | undefined> {
    try {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as Student;
      }
    } catch (error) {
      console.error("Error fetching student:", error);
    }
    
    // Fallback to searching all (which includes mock)
    const all = await this.getAllStudents();
    return all.find(s => s.id === id);
  },

  // Get the ID of the user who just registered/logged in on this device
  getCurrentUserId(): string | null {
    return localStorage.getItem(CURRENT_USER_KEY);
  },

  // Update an existing student
  async updateStudent(updatedStudent: Student): Promise<void> {
    try {
      const studentRef = doc(db, "students", updatedStudent.id);
      await updateDoc(studentRef, { ...updatedStudent });
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }
};
