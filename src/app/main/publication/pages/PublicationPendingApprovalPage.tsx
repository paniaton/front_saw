import React from "react";
import { useSuperMutation, useSuperQuery } from "@vadiun/react-hooks";
import { PageContainer } from "layout/components";
import { Card } from "shared/components";
import { usePublicationRepository } from "../services/PublicationRepository";
import { Button } from "@vadiun/react-components";

export const PublicationPendingApprovalPage = () => {
  const publicationRepo = usePublicationRepository();
  const publicationQuery = useSuperQuery(
    publicationRepo.getPendingPublication,
    {
      showSpinner: true,
    }
  );
  const approveMutation = useSuperMutation(publicationRepo.approve);

  const approve = async (id: number) => {
    await approveMutation.mutate(id);
    publicationQuery.reload();
  };

  if (publicationQuery.data === undefined) {
    return null;
  }

  return (
    <PageContainer>
      <div className="flex-1">
        <Card title="Publicaciones">
          <div className="p-8">
            {publicationQuery.data.map((pub) => (
              <div className="p-8 shadow-md my-4">
                <p className="text-bold">{pub.name}</p>
                <div dangerouslySetInnerHTML={{ __html: pub.description}}></div>
                <Button
                  onClick={() => approve(pub.id)}
                  variant="light"
                  className="mt-4"
                >
                  Aprobar
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
