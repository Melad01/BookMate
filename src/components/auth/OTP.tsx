import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { otpSchema } from "../../Schemas";
import useColors from "../../colors";
import { useAuthStore } from "../../store";
import useOTP from "../../hooks/useOTP";

interface Props {
  handleBackClick: () => void;
  handleNextClick: () => void;
}

const OTP = ({ handleBackClick, handleNextClick }: Props) => {
  const { color, bgColor, hoverColor } = useColors();
  const { token, email, setOtp } = useAuthStore();
  const { mutate, data, isPending } = useOTP();

  const { values, errors, touched, setFieldValue, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        otp: "",
      },
      validationSchema: otpSchema,
      onSubmit: async (_values) => {
        mutate(
          {
            email,
            otp: _values.otp,
            token,
          },
          {
            onSuccess: (data) => {
              if (data.message === "success") {
                setOtp(_values.otp);
                handleNextClick();
              } else {
                resetForm();
              }
            },
          }
        );
      },
    });

  return (
    <>
      <FormControl isInvalid={!!errors.otp && touched.otp}>
        <VStack justifyContent="center" spacing={5}>
          <HStack spacing={4} justifyContent="center">
            <PinInput
              id="otp"
              value={values.otp}
              onChange={(value) => setFieldValue("otp", value)}
              onComplete={() => handleSubmit()}
              otp
              focusBorderColor={hoverColor()}
              size={{ base: "sm", md: "lg" }}
            >
              <PinInputField autoFocus style={{ borderWidth: "4px" }} />
              <PinInputField style={{ borderWidth: "4px" }} />
              <PinInputField style={{ borderWidth: "4px" }} />
              <PinInputField style={{ borderWidth: "4px" }} />
              <PinInputField style={{ borderWidth: "4px" }} />
              <PinInputField style={{ borderWidth: "4px" }} />
            </PinInput>
          </HStack>
          <FormErrorMessage>{errors.otp}</FormErrorMessage>
          <Text fontWeight="bold" color="red">
            {data?.message === "Invalid or expired OTP code." && data?.message}
          </Text>
          {isPending && (
            <Spinner color={color()} size={{ base: "lg", md: "xl" }} />
          )}
        </VStack>
      </FormControl>
      <VStack>
        <Text color={bgColor()} fontSize={{ base: "xs", md: "lg" }}>
          Enter the one-time password (OTP) sent to your registered email.
        </Text>
        <Button
          color={hoverColor()}
          fontSize={{ base: "xs", md: "lg" }}
          variant="link"
        >
          Did not get the code? Resend it.
        </Button>
      </VStack>
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
    </>
  );
};

export default OTP;
