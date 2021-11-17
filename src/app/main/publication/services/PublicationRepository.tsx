import { UserRole } from "app/auth/models";
import { useAuthService } from "app/auth/services";
import { httpClient } from "shared/services/http/httpClient";
import {
  publicationBuilder,
  PublicationFormType,
  PublicationModel,
  PublicationStatus,
} from "../models/PublicationModel";

export const usePublicationRepository = () => {
  const authSrv = useAuthService();
  const getAll = async (): Promise<PublicationModel[]> => {
    const res = await httpClient.get("publicaciones");
    return res.map(publicationBuilder.fromBackend);
  };

  const getAllApproved = async (): Promise<PublicationModel[]> => {
    return (await getAll()).filter(
      (p) => p.status === PublicationStatus.APPROVED
    );
  };

  const create = async (pub: PublicationFormType) => {
    return httpClient.post("publicaciones", {
      nombre: pub.name,
      descripcion: pub.description,
      usuario_id: authSrv.loggedUserId,
    });
  };

  const getMyPublications = async (): Promise<PublicationModel[]> => {
    return (await getAll()).filter((p) => p.user.id === authSrv.loggedUserId);
  };

  const getPendingPublication = async (): Promise<PublicationModel[]> => {
    return (await getAll()).filter(
      (p) => p.status === PublicationStatus.PENDING
    );
  };

  const approve = async (id: number) => {
    return httpClient.patch(`publicaciones/${id}/cambiarEstado`, {
      estado: PublicationStatus.APPROVED,
    });
  };

  return {
    getAll,
    create,
    getMyPublications,
    getPendingPublication,
    approve,
    getAllApproved,
  };
};
