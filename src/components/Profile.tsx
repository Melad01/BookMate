import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { MdEmail, MdLock } from "react-icons/md";
import { Form } from "react-router-dom";
import { editSchema } from "../Schemas";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useEditUser from "../hooks/user/useEditUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useState, useEffect } from "react";
import { bgColor, color, hoverColor } from "../color";

const Profile = () => {
  const auth = useAuthUser();
  const { mutate: update, data, isPending } = useEditUser();
  const authHeader = useAuthHeader();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: auth ? auth.email : "",
      newPassword: "",
      password: "",
    },
    validationSchema: editSchema,
    onSubmit: (_values, _formikHelpers) => {
      setHasSubmitted(true);
      {
        !values.newPassword
          ? update({
              Email: values.email,
              currentPassword: values.password,
              Token: authHeader ?? "",
            })
          : update({
              Email: values.email,
              Password: values.newPassword,
              currentPassword: values.password,
              Token: authHeader ?? "",
            });
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (Object.values(touched).some((field) => field)) {
      setHasSubmitted(false);
    }
  }, [touched]);

  return (
    <>
      <Heading
        color={bgColor()}
        marginTop={5}
        marginLeft={{ base: 3, md: 8, lg: 10 }}
        fontSize="xxx-large"
      >
        Profile
      </Heading>
      <Box padding={{ base: 4, sm: 6, md: 8, lg: 12 }} bgColor={color()}>
        <Form>
          <FormControl
            isInvalid={!!errors.email && touched.email}
            marginBottom={5}
          >
            <FormLabel color={bgColor()} fontSize={{ base: 18, md: 25 }}>
              Email:
            </FormLabel>
            <InputGroup width={{ md: "65%" }}>
              <InputLeftElement paddingTop={{ md: 2 }}>
                <MdEmail size={27} color={bgColor()} />
              </InputLeftElement>
              <Input
                id="email"
                name="email"
                aria-label="email"
                value={values.email}
                size={{ base: "md", md: "lg" }}
                variant="outline"
                placeholder="Email"
                borderColor={errors.email && touched.email ? "red" : bgColor()}
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                focusBorderColor={
                  errors.email && touched.email ? "red" : bgColor()
                }
                onChange={handleChange}
                onBlur={handleBlur}
                color={hoverColor()}
              />
            </InputGroup>
            <FormErrorMessage>{errors.email?.toString()}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors.newPassword && touched.newPassword}
            marginBottom={5}
          >
            <FormLabel color={bgColor()} fontSize={{ base: 18, md: 25 }}>
              New password:
            </FormLabel>
            <InputGroup width={{ md: "65%" }}>
              <InputLeftElement paddingTop={{ md: 2 }}>
                <MdLock size={27} color={bgColor()} />
              </InputLeftElement>
              <Input
                id="newPassword"
                name="newPassword"
                aria-label="password"
                value={values.newPassword}
                type={"password"}
                size={{ base: "md", md: "lg" }}
                variant="outline"
                borderColor={
                  errors.newPassword && touched.newPassword ? "red" : bgColor()
                }
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                placeholder="New password"
                focusBorderColor={
                  errors.newPassword && touched.newPassword
                    ? "yellow"
                    : bgColor()
                }
                onChange={handleChange}
                onBlur={handleBlur}
                color={bgColor()}
              />
            </InputGroup>
            <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors.password && touched.password}
            marginBottom={5}
          >
            <FormLabel color={bgColor()} fontSize={{ base: 18, md: 25 }}>
              Password:
            </FormLabel>
            <InputGroup width={{ md: "65%" }}>
              <InputLeftElement paddingTop={{ md: 2 }}>
                <MdLock size={27} color={bgColor()} />
              </InputLeftElement>
              <Input
                id="password"
                name="password"
                aria-label="password"
                value={values.password}
                type={"password"}
                size={{ base: "md", md: "lg" }}
                variant="outline"
                borderColor={
                  errors.password && touched.password ? "red" : bgColor()
                }
                fontWeight="normal"
                _placeholder={{ color: bgColor() }}
                placeholder="Password"
                focusBorderColor={
                  errors.password && touched.password ? "yellow" : bgColor()
                }
                onChange={handleChange}
                onBlur={handleBlur}
                color={bgColor()}
              />
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          {hasSubmitted && data?.status === 400 && (
            <Text fontWeight="bold" color="red">
              {data?.message}
            </Text>
          )}
          <HStack marginTop={5}>
            <Button
              variant="ghost"
              size={{ base: "md", md: "lg" }}
              marginRight={{ base: 1, md: 5 }}
              onClick={() => resetForm()}
            >
              Cancel
            </Button>
            <Button
              bgColor={bgColor()}
              color={color()}
              _hover={{ bgColor: hoverColor() }}
              variant="solid"
              size={{ base: "md", md: "lg" }}
              onClick={() => handleSubmit()}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Edit"}
            </Button>
          </HStack>
        </Form>
      </Box>
    </>
  );
};

export default Profile;
