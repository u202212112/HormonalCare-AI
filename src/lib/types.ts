export type Patient = {
  id: string;
  name: string;
  email: string;
  lastCheckIn: string;
  status: 'Stable' | 'At Risk' | 'Needs Review';
  avatar: string;
  initials: string;
};
