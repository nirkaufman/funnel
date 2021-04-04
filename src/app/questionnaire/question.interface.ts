enum FIELD_TYPES { TEXT = 'TEXT', CHECKBOX = '' }

export interface Question {
  id: number;
  text: string;
  type: FIELD_TYPES;
}
