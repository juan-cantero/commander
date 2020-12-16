import { Criteria } from '../command.types';

export const getCriteriaOrThrow = (criteria: string): Criteria => {
  if (!(criteria in Criteria)) {
    throw new Error('not a valid criteria');
  }
  return criteria === Criteria.description
    ? Criteria.description
    : Criteria.platform;
};
