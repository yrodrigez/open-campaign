import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

export const DuckrPasswordRecoveryEmail = () => {
  const previewText = `Reset Your Duckr Password`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[600px]">
            <Section className="mt-[32px] text-center">
              <Img
                src="https://ijzwizzfjawlixolcuia.supabase.co/storage/v1/object/public/users-profile-images/duckr-logo-removebg-preview.png"
                width="60"
                height="60"
                alt="Duckr Logo"
                className="my-0 mx-auto"
              />
              <Heading className="text-black text-[24px] font-normal p-0 my-[30px] mx-0">
                Password Recovery Instructions
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                {'Hello {{ .User.Email }}'},
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                You have requested to reset your password. Please click the button below to proceed.
              </Text>
              <Button
                className="font-bold px-[20px] py-[12px] bg-sky-500 rounded-full text-white no-underline text-center my-[20px]"
                href="{{ .SiteURL }}/password-recovery?token={{ .Token }}"
              >
                Reset Password
              </Button>
              <Text className="text-black text-[14px] leading-[24px]">
                If you did not request a password reset, please ignore this email or contact support if you have concerns.
              </Text>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"/>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DuckrPasswordRecoveryEmail;
