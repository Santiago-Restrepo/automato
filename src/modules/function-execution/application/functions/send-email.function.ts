interface SendEmailParams {
  data: {
    from: string;
    to: string;
    subject: string;
    text: string;
  };
}

export async function sendEmail(params: SendEmailParams) {
  const {
    data: { from, to, subject, text },
  } = params;
  // Simulate sending an email
  console.log(`Sending email to ${to} from ${from} with subject ${subject}`);
  console.log(`Email body: ${text}`);

  return true;
}
