import { Model } from "./model";

export default class Service {
  // @ts-ignore
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }
}
