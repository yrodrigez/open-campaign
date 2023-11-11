'use server';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

const loginLink = `https://ijzwizzfjawlixolcuia.supabase.co/storage/v1/object/public/users-profile-images/duckr-logo-removebg-preview.png`;
export const ConfirmEmail = () => {
  return (
    <Html>
      <Head/>
      <Preview>Confirm your email with Duckr!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container
            className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[600px] bg-white">
            <Section className="mt-[32px]">
              <Img
                src={loginLink}
                width="60"
                height="60"
                alt="Duckr"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Just one more step to join Duckr!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              {'Hello {{ .User.Metadata.username }},'}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Please confirm your email to complete your registration and start enjoying Duckr.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="font-bold px-[20px] py-[12px] bg-sky-500 rounded-full text-white no-underline text-center"
                href="{{ .ConfirmationURL }}"
              >
                Confirm Email
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"/>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you did not create an account with Duckr, no further action is required.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmEmail
