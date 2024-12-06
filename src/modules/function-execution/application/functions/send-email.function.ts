import { StepFunction } from '.';

interface SendEmailParams {
  data: {
    from: string;
    to: string;
    subject: string;
    text: string;
  };
}

const sendEmail: StepFunction<SendEmailParams> = async ({ input: params }) => {
  const {
    data: { from, to, subject, text },
  } = params;
  // Simulate sending an email
  console.log(
    `Sending email from ${from} to ${to} with subject ${subject} and text ${text}`,
  );

  return true;
};

export default sendEmail;
