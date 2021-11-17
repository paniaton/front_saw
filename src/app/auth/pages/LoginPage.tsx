import { Button } from "@vadiun/react-components";
import React from "react";
import LoginIlustration from "assets/login.svg";
import { AuthLayout } from "app/auth/components";
import * as Yup from "yup";
import { AuthContextType } from "app/auth/services";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import { useSuperMutation } from "@vadiun/react-hooks";

interface FormSchema {
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("El email es invalido")
    .required("El email es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(4, "La contraseña debe tener como minimo 4 caracteres"),
});

interface Props {
  authSrv: AuthContextType;
}

export const LoginPage = (props: Props) => {
  const initialValues: FormSchema = {
    email: "",
    password: "",
  };
  const loginMutation = useSuperMutation(props.authSrv.login);

  const submit = async (
    value: FormSchema,
    formikHelpers: FormikHelpers<FormSchema>
  ) => {
    await loginMutation.mutate(value);

    formikHelpers.resetForm();
  };

  return (
    <AuthLayout
      ilustration={LoginIlustration}
      logo={""}
      title="Bienvenido a SAW"
    >
      <div className="max-w-xl flex flex-col items-center">
        <h1 className="text-center font-bold text-2xl my-4">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={submit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              {loginMutation.isError && loginMutation.error}
              <Field
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                className="bg-white"
                name="email"
                component={TextField}
              />
              <Field
                label="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                variant="outlined"
                margin="normal"
                fullWidth
                className="bg-white"
                component={TextField}
              />

              <div className="w-full my-8">
                <Button
                  color="blue"
                  className="w-full"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};
