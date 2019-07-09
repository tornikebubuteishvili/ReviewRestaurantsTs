export enum Role {
  user = 1,
  owner,
  admin
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
