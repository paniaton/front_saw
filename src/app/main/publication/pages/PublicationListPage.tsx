import React from "react";
import { useSuperQuery } from "@vadiun/react-hooks";
import { PageContainer } from "layout/components";
import { Card } from "shared/components";
import { usePublicationRepository } from "../services/PublicationRepository";

export const PublicationListPage = () => {
  const publicationRepo = usePublicationRepository();
  const publicationQuery = useSuperQuery(publicationRepo.getAllApproved, {
    showSpinner: true,
  });

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
                <p className="text-gray-500">{pub.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
