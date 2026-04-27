export type UserRole = 'admin' | 'employee' | 'client';

export interface Profile {
  id: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  department: string | null;
  job_title: string | null;
  is_active: boolean;
  assigned_manager_id: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CRMContact {
  id: string;
  created_by: string | null;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  status: 'lead' | 'prospect' | 'customer' | 'churned';
  source: string | null;
  tags: string[] | null;
  notes: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CRMDeal {
  id: string;
  contact_id: string | null;
  assigned_to: string | null;
  title: string;
  value: number | null;
  currency: string;
  stage: 'discovery' | 'proposal' | 'negotiation' | 'won' | 'lost';
  probability: number;
  expected_close_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  account_manager_id: string | null;
  title: string;
  description: string | null;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectMilestone {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  completed_at: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  sort_order: number;
}

export interface ChatConversation {
  id: string;
  type: 'direct' | 'group' | 'client_support';
  title: string | null;
  created_by: string | null;
  created_at: string;
}

export interface ChatParticipant {
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  content: string;
  message_type: 'text' | 'image' | 'file';
  file_url: string | null;
  is_deleted: boolean;
  created_at: string;
}

export interface TaskBoard {
  id: string;
  title: string;
  project_id: string | null;
  created_by: string | null;
  created_at: string;
}

export interface TaskColumn {
  id: string;
  board_id: string;
  title: string;
  sort_order: number;
  color: string;
}

export interface Task {
  id: string;
  board_id: string;
  column_id: string | null;
  assigned_to: string | null;
  created_by: string | null;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string | null;
  estimated_hours: number | null;
  logged_hours: number;
  tags: string[] | null;
  sort_order: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  created_by: string | null;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string;
  all_day: boolean;
  location: string | null;
  event_type: 'personal' | 'company' | 'meeting' | 'deadline';
  color: string;
  is_company_wide: boolean;
  recurrence_rule: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string | null;
  crm_contact_id: string | null;
  created_by: string | null;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issue_date: string;
  due_date: string | null;
  currency: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string | null;
  payment_terms: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvoiceLineItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  sort_order: number;
}

export interface AttendanceRecord {
  id: string;
  user_id: string;
  date: string;
  clock_in: string | null;
  clock_out: string | null;
  status: 'present' | 'absent' | 'half_day' | 'remote' | 'holiday';
  notes: string | null;
}

export interface LeaveRequest {
  id: string;
  user_id: string;
  leave_type: 'annual' | 'sick' | 'casual' | 'maternity' | 'paternity' | 'unpaid';
  start_date: string;
  end_date: string;
  days_count: number | null;
  reason: string | null;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface IntegrationConfig {
  id: string;
  integration_type: 'smtp' | 'whatsapp' | 'hostinger_imap' | 'claude_api';
  config: Record<string, unknown>;
  is_active: boolean;
  updated_by: string | null;
  updated_at: string;
}
