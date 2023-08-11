const nodemailer = require("nodemailer");

module.exports = async (user, token) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SENDER_NAME,
    to: user.email, // list of receivers
    subject: "Email Verification", // Subject line
    text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <table
          style="width: 100% !important"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  style="
                    border: 1px solid #eaeaea;
                    border-radius: 5px;
                    margin: 40px 0;
                  "
                  width="600"
                  cellspacing="0"
                  cellpadding="40"
                  border="0"
                >
                  <tbody>
                    <tr>
                      <td align="center" style="background-color: #fad3e7">
                        <div
                          style="
                            font-family: -apple-system, BlinkMacSystemFont,
                              'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                              'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                              sans-serif;
                            text-align: left;
                            width: 465px;
                          "
                        >
                          <table
                            style="width: 100% !important"
                            width="100%%"
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td align="center">
                                  <!-- <div>
                                    <img
                                      src="https://res.cloudinary.com/punyasidik/image/upload/v1673784410/WaysBeans/assets/NavbarIcon_ys9c4c.svg"
                                      alt="SiGeSit"
                                      class="CToWUd"
                                      data-bit="iit"
                                    />
                                  </div> -->
                                  <h1
                                    style="
                                      color: #000;
                                      font-family: -apple-system, BlinkMacSystemFont,
                                        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                        'Cantarell', 'Fira Sans', 'Droid Sans',
                                        'Helvetica Neue', sans-serif;
                                      font-size: 24px;
                                      font-weight: normal;
                                      margin: 30px 0;
                                      padding: 0;
                                    "
                                  >
                                    <span class="il">Verify</span> your email to
                                    Register to <b>SiGesit</b>
                                  </h1>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p
                            style="
                              color: #000;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                'Cantarell', 'Fira Sans', 'Droid Sans',
                                'Helvetica Neue', sans-serif;
                              font-size: 14px;
                              line-height: 24px;
                            "
                          >
                            Hello <b>${user.fullName}</b>,
                          </p>
                          <br />
                          <p
                            style="
                              color: #000;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                'Cantarell', 'Fira Sans', 'Droid Sans',
                                'Helvetica Neue', sans-serif;
                              font-size: 14px;
                              line-height: 24px;
                            "
                          >
                          To complete the registration process, please enter the OTP code below in your sigesit app :
                          </p>
                          <br />
                          <table
                            style="width: 100% !important"
                            width="100%%"
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td align="center">
                                  <div>
                                    <p
                                      style="
                                        background-color: #0081c9;
                                        border-radius: 5px;
                                        color: whitesmoke;
                                        display: inline-block;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                                          'Oxygen', 'Ubuntu', 'Cantarell',
                                          'Fira Sans', 'Droid Sans',
                                          'Helvetica Neue', sans-serif;
                                        font-size: 20px;
                                        font-weight: 1000;
                                        line-height: 50px;
                                        text-align: center;
                                        text-decoration: none;
                                        width: 200px;
                                      "
                                    >
                                      <span class="il">${token}</span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <br />
                          <!-- <p
                            style="
                              color: #000;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                'Cantarell', 'Fira Sans', 'Droid Sans',
                                'Helvetica Neue', sans-serif;
                              font-size: 14px;
                              line-height: 24px;
                            "
                          >
                            Or copy and paste this URL into a new tab of your
                            browser:
                          </p>
                          <p
                            style="
                              color: #000;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                'Cantarell', 'Fira Sans', 'Droid Sans',
                                'Helvetica Neue', sans-serif;
                              font-size: 14px;
                              line-height: 24px;
                            "
                          >
                            <a
                              href="{{.URL}}"
                              style="color: #067df7; text-decoration: none"
                              target="_blank"
                              >{{.URL}}</a
                            >
                          </p> -->
                          <br />
                          <hr
                            style="
                              border: none;
                              border-top: 1px solid gray;
                              margin: 26px 0;
                              width: 100%;
                            "
                          />
                          <p
                            style="
                              color: #666666;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                'Cantarell', 'Fira Sans', 'Droid Sans',
                                'Helvetica Neue', sans-serif;
                              font-size: 12px;
                              line-height: 24px;
                            "
                          >
                            If you didn't attempt to register but received this
                            email, please ignore this email.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};