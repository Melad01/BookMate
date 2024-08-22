import {
  Box,
  Flex,
  HStack,
  Heading,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepStatus,
  StepTitle,
  Stepper,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import { MdLockReset } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Email from "./Email";
import OTP from "./OTP";
import CreateNewPassword from "./CreateNewPassword";
import useColors from "../../colors";

const steps = [
  { title: "First", description: "Email" },
  { title: "Second", description: "OTP" },
  { title: "Third", description: "New password" },
];

const ResetPassword = () => {
  const navigate = useNavigate();
  const { color, bgColor } = useColors();

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      minHeight="600px"
      padding={{ base: 2, sm: 4, md: 10, lg: 20 }}
    >
      <Box
        bg={color()}
        borderRadius={7}
        padding={{ base: 4, sm: 6, md: 8, lg: 12 }}
      >
        <VStack spacing={{ base: 8, lg: 12 }} align="center">
          <HStack>
            <MdLockReset color={bgColor()} size={40} />
            <Heading fontSize={{ base: "xl", lg: "3xl" }} color={bgColor()}>
              Reset password
            </Heading>
          </HStack>
          <Stepper
            size={{ base: "sm", md: "lg" }}
            colorScheme="green"
            index={activeStep}
            gap={{ base: 0.5, md: 20 }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle style={{ color: bgColor() }}>
                    {step.title}
                  </StepTitle>
                  <StepDescription style={{ color: bgColor() }}>
                    {step.description}
                  </StepDescription>
                </Box>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 ? (
            <Email
              handleBackClick={() => {
                activeStep === 0
                  ? navigate("/login")
                  : setActiveStep(activeStep - 1);
              }}
              handleNextClick={() => {
                activeStep === steps.length - 1
                  ? navigate("/")
                  : setActiveStep(activeStep + 1);
              }}
            />
          ) : activeStep === 1 ? (
            <OTP
              handleBackClick={() => setActiveStep(activeStep - 1)}
              handleNextClick={() => setActiveStep(activeStep + 1)}
            />
          ) : (
            <CreateNewPassword handleFinishClick={() => navigate("/login")} />
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
