export enum Role {
  User = 0,
  Owner,
  Admin
}

export enum Comparison {
  Equal = 0,
  LessThan,
  LessThanOrEqual,
  GreaterThan,
  GreaterThanOrEqual,
  NotEqual,
  Contains,
  StartsWith,
  EndsWith
}

export enum FilterLogic {
  And = 0,
  Or = 1
}
