/**
 * Defines the structure for the top-level response.
 */
export interface IResponse {
  message: IMessage;
}

/**
 * Defines the structure for the main message object.
 */
export interface IMessage {
  pages: IPage[];
  has_access: boolean;
  has_create_access: boolean;
}

/**
 * Defines a union type for all possible content data types.
 */
export type IContentData = IHeaderData | IShortcutData | ISpacerData | ICardData | IOnboardingData | IChartData | INumberCardData;

/**
 * Defines the base structure for a content item. The `data` property's type depends on the `type` field.
 */
export interface IContentItem {
  id?: string;
  type: 'header' | 'shortcut' | 'spacer' | 'card' | 'onboarding' | 'chart' | 'number_card';
  data: IContentData;
}

/**
 * Defines the structure of a single page in the `pages` array.
 * Note: The `content` field is a string containing a JSON array of `IContentItem`.
 */
export interface IPage {
  name: string;
  title: string;
  for_user: string;
  parent_page: string | null;
  // This is a stringified JSON array. You would need to parse it to use `IContentItem[]`.
  content: string;
  public: number;
  module: string | null;
  icon: string;
  indicator_color: string | null;
  is_hidden: number;
  label: string;
}

// --- Content Data Interfaces ---

export interface IHeaderData {
  text: string;
  col: number;
}

export interface IShortcutData {
  shortcut_name: string;
  col: number;
}

export interface ISpacerData {
  col: number;
}

export interface ICardData {
  card_name: string;
  col: number;
}

export interface IOnboardingData {
  onboarding_name: string;
  col: number;
}

export interface IChartData {
  chart_name: string;
  col: number;
}

export interface INumberCardData {
  number_card_name: string;
  col: number;
}

/**
 * Optional interface for the parsed content, if you were to parse the
 * `content` string from the IPage interface.
 */
export type IPageContent = IContentItem[];
