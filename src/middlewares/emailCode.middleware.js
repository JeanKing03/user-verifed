const { createServices } = require("../services/emailCode.services");
const { sendEmail } = require("../utils/sendEmail");

async function emailCode(req, res, next) {
  const code = require("crypto").randomBytes(64).toString("hex");

  // Create a new user
  if (req.result) {
    const { id, email, firstName } = req.result;
    const { frontBaseUrl } = req.body;
    const userId = id;
    const body = { code, userId };
    await createServices(body);
    sendEmail({
      to: email,
      subject: "Verificacion",
      html: `<div style="max-width: 500px; margin: 50px auto; background-color: #f8fafc; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif; color: #333333;">
        
        <h1 style="color: #007BFF; font-size: 28px; text-align: center; margin-bottom: 20px;">¡Hola ${firstName.toUpperCase()} 👋!</h1>    
        
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; text-align: center;">Gracias por registrarte en nuestra aplicación. Para verificar su cuenta, haga clic en el siguiente enlace:</p>
        
        <div style="text-align: center;">
            <a href="${frontBaseUrl}/verify_email/${code}" style="display: inline-block; background-color: #007BFF; color: #ffffff; text-align: center; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 18px;">¡Verificar cuenta!</a>
        </div>
      </div>`,
    });

    return res.status(201).json("User Created, ");
  }

  //Change password
  else if (req.box) {
    const { frontBaseUrl, email, id, firstName } = req.box;

    const userId = id;
    const body = { code, userId };
    await createServices(body);
    console.log("Estoy Cambiando p");
    sendEmail({
      to: email,
      subject: "Reset Password",
      html: `<div style="max-width: 500px; margin: 50px auto; background-color: #f8fafc; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif; color: #333333;">
        
        <h1 style="color: #007BFF; font-size: 28px; text-align: center; margin-bottom: 20px;">¡Hola ${firstName.toUpperCase()} 👋!</h1>    
        
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; text-align: center;">No te preocupes. Para cambiar tu contraseña, haga clic en el siguiente enlace:</p>
        
        <div style="text-align: center;">
            <a href="${frontBaseUrl}/verify_email/${code}" style="display: inline-block; background-color: #007BFF; color: #ffffff; text-align: center; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 18px;">¡Cambiar contraseña!</a>
        </div>
      </div>`,
    });

    return res.status(201).json("Check Your Mail ");
  }
}
module.exports = emailCode;
