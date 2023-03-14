interface Status {
  key: number;
  label: string;
  isCompleted: boolean;
}

export const statusValue: Status[] = [
  {
    key: 1,
    label: "Completed",
    isCompleted: true,
  },
  {
    key: 1,
    label: "inCompleted",
    isCompleted: false,
  },
];
