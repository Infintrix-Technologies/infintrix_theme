// --- Type Definitions for Data Structures ---
export interface ILink {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  type: string;
  label: string;
  icon: string | null;
  description: string | null;
  hidden: number | boolean;
  link_type: string;
  link_to: string;
  report_ref_doctype: string | null;
  dependencies: string | null;
  only_for: string | null;
  onboard: number;
  is_query_report: number;
  link_count: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

export interface ICard {
  name?: string; // Added this property to match the object structure
  owner?: string; // Added this property to fix the error
  label: string;
  type: string;
  icon: string | null;
  hidden: number | boolean;
  links?: ILink[];
  description?: string | null; // Added this property to fix the error
  dependencies?: string | null; // Added this property to fix the error
  link_type?: string | null; // Added this property to fix the error
  link_to?: string | null; // Added this property to fix the error
  only_for?: string | null; // Added this property to fix the error
  report_ref_doctype?: string | null; // Added this property to fix the error
  onboard?: number; // Added this property to fix the error
  is_query_report?: number; // Added this property to fix the error
  creation?: string; // Added this property to fix the error
  modified?: string; // Added this property to fix the error
  modified_by?: string; // Added this property to fix the error
  docstatus?: number; // Added this property to fix the error
  idx?: number; // Added this property to fix the error
  parent?: string; // Added this property to fix the error
  parentfield?: string; // Added this property to fix the error
  parenttype?: string; // Added this property to fix the error
  doctype?: string; // Added this property to fix the error
  link_count?: number; // Added this property to fix the error
}

export interface IPage {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  type: string;
  link_to: string;
  url: string | null;
  doc_view: string;
  kanban_board: string | null;
  label: string;
  icon: string | null;
  restrict_to_domain: string | null;
  report_ref_doctype: string | null;
  stats_filter: string | null;
  color: string;
  format: string | null;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
  parent_page: string; // Added this property based on usage
  subpages? : ISecondSidebar; // Added this property based on usage
}

export interface ISecondSidebar {
  charts: { items: any[] };
  shortcuts: { items: any[] };
  cards: { items: ICard[] };
  onboardings: { items: any[] };
  quick_lists: { items: any[] };
  number_cards: { items: any[] };
  custom_blocks: { items: any[] };
}
