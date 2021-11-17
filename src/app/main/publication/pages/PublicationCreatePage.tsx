import { Button } from "@vadiun/react-components";
import { useSuperMutation } from "@vadiun/react-hooks";
import { Field, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { PageContainer } from "layout/components";
import React from "react";
import { Card } from "shared/components";
import { usePublicationRepository } from "../services/PublicationRepository";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { PublicationFormType } from "../models/PublicationModel";
//import { text } from "@fortawesome/fontawesome-svg-core";

const initialValues = {
  name: "",
  description: "",
};
export const PublicationCreatePage = () => {
  const history = useHistory();
  const publicationRepo = usePublicationRepository();
  const createMutation = useSuperMutation(publicationRepo.create, {
    showSpinner: true,
  });

  const create = async (values: PublicationFormType) => {
    await createMutation.mutate(values);
    history.push("/main/publication/my-publications");
  };
  
  return (
    <PageContainer>
      <div className="flex-1">
        <Card title="Crear publicacion">
          <div className="p-8">
            <Formik
              initialValues={initialValues}
              onSubmit={create}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("El nombre es requerido"),
                description: Yup.string().required(
                  "La descripción es requerido"
                ),
              })}
            >
              {(formik) => (
                <div>
                  <Field
                    label="Nombre"
                    name="name"
                    component={TextField}
                    margin="normal"
                  />
                  <Field
                    label="Descripción"
                    name="description"
                    component={TextField}
                    margin="normal"
                  /> 
                  <Button
                    onClick={formik.submitForm}
                    variant="light"
                    className="mt-4"
                  >
                    Guardar
                  </Button>
                </div>
              )}
            </Formik>
              
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
