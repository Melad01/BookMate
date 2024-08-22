import {
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Button,
  FormControl,
  FormErrorMessage,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { MdEmail } from "react-icons/md";
import { emailSchema } from "../../Schemas";
import { color, bgColor, hoverColor } from "../../color";
import useEmail from "../../hooks/useEmail";
import { useAuthStore } from "../../store";

interface Props {
  handleBackClick: () => void;
  handleNextClick: () => void;
}

const Email = ({ handleBackClick, handleNextClick }: Props) => {
  const { setEmail, setToken } = useAuthStore();
  const { mutate, data, isPending } = useEmail();

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
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: async (_values, _formikHelpers) => {
      mutate(_values.email, {
        onSuccess: (data) => {
          if (data.message === "OTP send to your email") {
            setEmail(_values.email);
            if (data && data.token) {
              setToken(data.token);
            }
            handleNextClick();
          } else {
            resetForm();
          }
        },
      });
    },
  });

  return (
    <>
      <FormControl isInvalid={!!errors.email && touched.email}>
        <InputGroup>
          <InputLeftElement>
            <MdEmail size={27} color={bgColor()} />
          </InputLeftElement>
          <Input
            id="email"
            name="email"
            aria-label="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            size={{ base: "md", md: "lg" }}
            variant="flushed"
            placeholder="Email"
            fontWeight="bold"
            _placeholder={{ color: bgColor() }}
            focusBorderColor={errors.email && touched.email ? "red" : bgColor()}
          />
        </InputGroup>
        <FormErrorMessage>{errors.email}</FormErrorMessage>
        <Text fontWeight="bold" color="red">
          {data?.message === "User not found." && data?.message}
        </Text>
      </FormControl>
      <HStack spacing={{ base: 14, lg: 20 }}>
        <Button
          bgColor={bgColor()}
          fontWeight="bold"
          _hover={{ bgColor: hoverColor() }}
          color={color()}
          size={{ base: "sm", md: "md" }}
          onClick={handleBackClick}
        >
          Back
        </Button>
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
            "Next"
          )}
        </Button>
      </HStack>
    </>
  );
};

export default Email;
