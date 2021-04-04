enum FIELD_TYPES { TEXT, CHECKBOX }

export interface Question {
  id: number;
  text: string;
  type: FIELD_TYPES;
}
