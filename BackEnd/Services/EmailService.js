export async function sendPasswordResetEmail(email, resetToken) {
  const resetLink =
    `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  // aqui entra o provedor responsável por enviar o e-mail

  console.log("Enviar para:", email);
  console.log("Link:", resetLink);
}