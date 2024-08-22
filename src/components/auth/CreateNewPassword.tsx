import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { passwordSchema } from "../../Schemas";
import { FaLock, FaCheckDouble } from "react-icons/fa6";
import useColors from "../../colors";
import useNewPassword from "../../hooks/useNewPassword";
import { useAuthStore } from "../../store";

interface Props {
  handleFinishClick: () => void;
}

const CreateNewPassword = ({ handleFinishClick }: Props) => {
  const { color, bgColor, hoverColor } = useColors();
  const { mutate, isPending } = useNewPassword();
  const { token, email } = useAuthStore();
  const toast = useToast();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: passwordSchema,
      onSubmit: async (_values, _formikHelpers) => {
        mutate(
          {
            email,
            password: _values.password,
            token,
          },
          {
            onSuccess: async (data) => {
              if (data?.status === 200) {
                toast({
                  title: "Password changed successfully.",
                  description: "Login in with new password.",
                  status: "success",
                  duration: 3000,
                });
                handleFinishClick();
              } else {
                toast({
                  title: "Failed to change password.",
                  description: "Please try again later.",
                  status: "error",
                  duration: 2000,
                });
              }
            },
          }
        );
      },
    });

  return (
    <>
      <FormControl isInvalid={!!errors.password && touched.password}>
        <InputGroup>
          <InputLeftElement>
            <FaLock size={21} color={hoverColor()} />
          </InputLeftElement>
          <Input
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            boxShadow="none"
            type="password"
            size={{ base: "md", md: "lg" }}
            variant="flushed"
            placeholder="New password"
            borderColor={
              errors.password && touched.password ? "red" : hoverColor()
            }
            fontWeight="normal"
            _placeholder={{ color: hoverColor() }}
            focusBorderColor={
              errors.password && touched.password ? "red" : hoverColor()
            }
          />
        </InputGroup>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!errors.confirmPassword && touched.confirmPassword}
      >
        <InputGroup>
          <InputLeftElement>
            <FaCheckDouble size={21} color={hoverColor()} />
          </InputLeftElement>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            boxShadow="none"
            type="password"
            size={{ base: "md", md: "lg" }}
            variant="flushed"
            borderColor={
              errors.confirmPassword && touched.confirmPassword
                ? "red"
                : hoverColor()
            }
            fontWeight="normal"
            _placeholder={{ color: hoverColor() }}
            placeholder="Confirm password"
            focusBorderColor={
              errors.confirmPassword && touched.confirmPassword
                ? "red"
                : hoverColor()
            }
          />
        </InputGroup>
        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
      </FormControl>
      <Button
        bgColor={bgColor()}
        fontWeight="bold"
        _hover={{ bgColor: hoverColor() }}
        color={color()}
        size={{ base: "sm", md: "md" }}
        onClick={() => handleSubmit()}
      >
        {isPending ? (
          <Spinner color={color()} size={{ base: "md", md: "lg" }} />
        ) : (
          "Finish"
        )}
      </Button>
    </>
  );
};

export default CreateNewPassword;
