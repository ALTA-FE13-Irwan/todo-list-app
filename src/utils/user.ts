export interface DataType {
  id: string;
  assigner_id: null;
  assignee_id: null;
  project_id: string;
  section_id: null;
  parent_id: null;
  order: number;
  content: string;
  description: string;
  is_completed: boolean;
  labels: [];
  priority: number;
  comment_count: 0;
  creator_id: string;
  created_at: string;
  due: null;
  url: string;
}

export interface FormSubmit {
  content: string;
  description: string;
}
