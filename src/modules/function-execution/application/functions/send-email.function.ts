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
  console.log(
    `Sending email from ${from} to ${to} with subject ${subject} and text ${text}`,
  );

  return true;
}
