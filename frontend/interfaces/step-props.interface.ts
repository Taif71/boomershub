import { FormInstance } from "antd";

export interface IStepProps {
  form: FormInstance<any>;
  next?(data: any): void;
  before?(): void;
}
