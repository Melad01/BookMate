import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { loginSchema } from "../../Schemas";
import useLogin from "../../hooks/user/useLogin";
import { bgColor, color, hoverColor } from "../../color";

const Login = () => {
  // State hooks - called unconditionally
  const [isHidden, setHidden] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const ref = useRef(null);

  // Custom hook useLogin, should be called unconditionally
  const { mutate, data, isPending } = useLogin();

  // useFormik hook, no conditional logic should be around it
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setHasSubmitted(true);
      mutate({
        Email: values.email,
        Password: values.password,
      });
      resetForm();
      ref.current?.focus();
      setSubmitting(false);
    },
  });

  // Effect hook should be placed after all state-related hooks
  useEffect(() => {
    if (Object.values(formik.touched).some((field) => field)) {
      setHasSubmitted(false);
    }
  }, [formik.touched]);

  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      minHeight="600px"
      padding={{ base: 2, sm: 4, md: 10, lg: 20 }}
      bgColor={color()}
    >
      <Box
        bg={color()}
        p={6}
        borderRadius={7}
        borderColor={color()}
        borderWidth={1}
        padding={{ base: 4, sm: 6, md: 8, lg: 12 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={7} align="center" marginY={7}>
            <HStack>
              <IoPersonCircle color={bgColor()} size={40} />
              <Heading fontSize={{ base: "xl", lg: "3xl" }} color={bgColor()}>
                Login
              </Heading>
            </HStack>
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <InputGroup>
                <InputLeftElement>
                  <MdEmail size={29} color={bgColor()} />
                </InputLeftElement>
                <Input
                  id="email"
                  name="email"
                  aria-label="email"
                  value={formik.values.email}
                  size="lg"
                  variant="flushed"
                  placeholder="Email"
                  borderColor={
                    formik.errors.email && formik.touched.email
                      ? "red"
                      : bgColor()
                  }
                  _focus={{ borderColor: bgColor() }}
                  fontWeight="bold"
                  _placeholder={{ color: bgColor() }}
                  focusBorderColor={
                    formik.errors.email && formik.touched.email
                      ? "red"
                      : bgColor()
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={ref}
                />
              </InputGroup>
              <FormErrorMessage color="tomato" fontWeight="bold">
                {formik.errors.email}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <InputGroup>
                <InputLeftElement>
                  <FaLock size={23} color={bgColor()} />
                </InputLeftElement>
                <Input
                  id="password"
                  name="password"
                  aria-label="password"
                  value={formik.values.password}
                  type={!isHidden ? "password" : "text"}
                  size="lg"
                  variant="flushed"
                  borderColor={
                    formik.errors.password && formik.touched.password
                      ? "red"
                      : bgColor()
                  }
                  _focus={{ borderColor: bgColor() }}
                  fontWeight="bold"
                  _placeholder={{ color: bgColor() }}
                  placeholder="Password"
                  focusBorderColor={
                    formik.errors.password && formik.touched.password
                      ? "red"
                      : bgColor()
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputRightElement>
                  {isHidden ? (
                    <FaEye
                      color={bgColor()}
                      size={20}
                      onClick={() => setHidden(false)}
                    />
                  ) : (
                    <FaEyeSlash
                      color={bgColor()}
                      size={20}
                      onClick={() => setHidden(true)}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage color="tomato" fontWeight="bold">
                {formik.errors.password}
              </FormErrorMessage>
            </FormControl>
            {data?.status === 400 && (
              <Text fontWeight="bold" color="tomato">
                {data?.message}
              </Text>
            )}
            <HStack spacing={{ base: 14, lg: 20 }}>
              <Text
                fontSize={{ base: "xs", lg: "sm" }}
                as="u"
                color={bgColor()}
                _hover={{ textDecoration: "none", color: hoverColor() }}
              >
                <Link to="/reset-password">Forget password?</Link>
              </Text>
              <Button
                type="submit"
                bgColor={bgColor()}
                textColor={color()}
                _hover={{ bgColor: hoverColor() }}
                fontWeight="bold"
                size={{ base: "sm", md: "md" }}
                disabled={isPending}
              >
                {isPending ? <Spinner color={color()} size="md" /> : "Login"}
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
