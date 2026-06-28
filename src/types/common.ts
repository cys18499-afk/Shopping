export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.MALE]: "남성",
  [Gender.FEMALE]: "여성",
};
