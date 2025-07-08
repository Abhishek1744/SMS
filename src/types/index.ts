export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'resident';
  flatNumber?: string;
  phoneNumber?: string;
  profilePicture?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface PaymentDue {
  id: string;
  userId: string;
  amount: number;
  dueDate: Date;
  description: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentDate?: Date;
  receiptUrl?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
}

export interface MaintenanceRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  completedAt?: Date;
  cost?: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  category: 'meeting-minutes' | 'policy' | 'legal' | 'financial' | 'other';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  createdBy: string;
  attendees: string[];
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  currentView: string;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  isRead: boolean;
}