import nodemailer from 'nodemailer'

const emailRegistro = async ( datos ) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //tomando los datos de la instancia del usuario de controller
    console.log(datos);

    //cuerpo de el correo
    const {email, nombre, token} = datos; 

    const info = await transporter.sendMail({
        from: "Administrador de pacientes de veterinaria",
        to: email, 
        subject: 'Comprueba tu cuenta de APV',
        text: 'Comprueba tu cuenta de APV',
        html: `<p> Hola: ${nombre}, comprueba tu cuenta de APV
                <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: <a href="${process.env.FRONT_URL}/confirmar/${token}"> Comprobar Cuenta </a></p>
                <p> Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>`
    }); 

    console.log('Mensaje enviado ... %s', info.messageId);
}

export default emailRegistro