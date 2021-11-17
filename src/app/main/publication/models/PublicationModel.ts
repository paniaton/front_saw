import { User } from "app/auth/models";

export enum PublicationStatus {
  PENDING = "pendiente",
  APPROVED = "aprobada",
}

export interface PublicationModel {
  status: PublicationStatus;
  name: string;
  description: string;
  id: number;
  user: User;
}

export interface PublicationFormType {
  name: string;
  description: string;
}

export const publicationBuilder = {
  fromBackend: (res) => ({
    status: res.estado,
    name: res.publicacion,
    description: res.descripcion,
    id: res.pub_id,
    user: {
      email: res.mail,
      id: res.user_id,
    },
  }),
};
