export interface IAction<IType = string, IPayload = any> {
  type: IType;
  payload: IPayload;
}
