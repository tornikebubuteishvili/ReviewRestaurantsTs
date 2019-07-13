export enum Role {
  User = 1,
  Owner,
  Admin
}

export enum Comparison {
  Equal,
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
