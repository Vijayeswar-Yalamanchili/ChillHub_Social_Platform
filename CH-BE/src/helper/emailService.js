import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: 'vijayeswarybe@gmail.com',
        pass: 'fhqyirzgxaznsliq'        //fhqy irzg xazn sliq
      },
      tls: {
        rejectUnauthorized: false
      }
});

let forgotPasswordMail = async(to,randomString) => {
    try {
        let mailContent = await transporter.sendMail({
            from: 'vijayeswarybe@gmail.com',
            to: to,
            subject: 'Code to reset password',
            html: `<div><h3>Hi sir/mam</h3></div>
            <div>
              <p>To reset your password, Kindly copy the below code and paste it in respective column in our website</p>
              <a href="#">${randomString}</a>     
              <p>Thanks!!!</p>       
            </div>
            `
        }) 
        console.log(mailContent.messageId, " - email sent");
    } catch (error) {
        console.log(error.message);
    }
}

export default forgotPasswordMail