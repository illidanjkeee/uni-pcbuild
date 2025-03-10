export type buildT = {
  name: string;
  status: string;
  inCart: boolean;
  _id: string;
  parts: {
    type: string;
    id: string;
  }[];
};
