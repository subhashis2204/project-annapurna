exports.createOTPEmailBody = function (otp) {
    const emailBody = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <style type="text/css">
            body,
            p,
            div {
                font-family: arial, helvetica, sans-serif;
                font-size: 14px;
            }
            
            body {
                color: #000000;
            }
            
            body a {
                color: #1188E6;
                text-decoration: none;
            }
            
            p {
                margin: 0;
                padding: 0;
            }
            
            table.wrapper {
                width: 100% !important;
                table-layout: fixed;
                -webkit-font-smoothing: antialiased;
                -webkit-text-size-adjust: 100%;
                -moz-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            
            img.max-width {
                max-width: 100% !important;
            }
            
            .column.of-2 {
                width: 50%;
            }
            
            .column.of-3 {
                width: 33.333%;
            }
            
            .column.of-4 {
                width: 25%;
            }
            
            ul ul ul ul {
                list-style-type: disc !important;
            }
            
            ol ol {
                list-style-type: lower-roman !important;
            }
            
            ol ol ol {
                list-style-type: lower-latin !important;
            }
            
            ol ol ol ol {
                list-style-type: decimal !important;
            }
            
            @media screen and (max-width:480px) {
                .preheader .rightColumnContent,
                .footer .rightColumnContent {
                    text-align: left !important;
                }
                .preheader .rightColumnContent div,
                .preheader .rightColumnContent span,
                .footer .rightColumnContent div,
                .footer .rightColumnContent span {
                    text-align: left !important;
                }
                .preheader .rightColumnContent,
                .preheader .leftColumnContent {
                    font-size: 80% !important;
                    padding: 5px 0;
                }
                table.wrapper-mobile {
                    width: 100% !important;
                    table-layout: fixed;
                }
                img.max-width {
                    height: auto !important;
                    max-width: 100% !important;
                }
                a.bulletproof-button {
                    display: block !important;
                    width: auto !important;
                    font-size: 80%;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }
                .columns {
                    width: 100% !important;
                }
                .column {
                    display: block !important;
                    width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                }
                .social-icon-column {
                    display: inline-block !important;
                }
            }
        </style>
        <!--user entered Head Start-->
        <!--End Head user entered-->
    </head>
    
    <body>
        <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
            <div class="webkit">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                    <tr>
                        <td valign="top" bgcolor="#FFFFFF" width="100%">
                            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td width="100%">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td>
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                        <tr>
                                                            <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left">
                                                                <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                                                    <tr>
                                                                        <td role="module-content">
                                                                            <p></p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ea46ef63-5173-4ce5-90fe-d24a4a5149d7">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                                                                                <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true"
                                                                                    data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/2047cbcd71aa177b/f77901ce-834f-4aec-8cd9-2e726bdcc16d/1440x243.png">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1014a5df-17ed-4ef6-a4a8-dfe97b547803" data-mc-module-version="2019-10-22">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding:23px 23px 23px 23px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                                                                <div>
                                                                                    <div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Greetings, from </span><span style="font-size: 18px; color: #161616">Team Annapurna</span></div>
                                                                                    <div></div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="dc4820f8-d88b-4391-9148-d228c9ca6eaa" data-mc-module-version="2019-10-22">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding:23px 23px 23px 23px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                                                                <div>
                                                                                    <div style="font-family: inherit; text-align: center"><span style="font-size: 24px"><strong>Your OTP is ${otp}</strong></span></div>
                                                                                    <div></div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="bc40f00d-ea25-4f26-a2de-35a675b477da" data-mc-module-version="2019-10-22">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding:18px 0px 18px 23px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                                                                <div>
                                                                                    <div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Show this otp for verification during receiving orders</span></div>
                                                                                    <div></div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="e5f77747-9127-4c69-a699-7f39f6a0c72a" data-mc-module-version="2019-10-22">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding:18px 23px 18px 23px; line-height:22px; text-align:inherit; background-color:#828282;" height="100%" valign="top" bgcolor="#828282" role="module-content">
                                                                                <div>
                                                                                    <div style="font-family: inherit; text-align: center"><span style="color: #d9d9d9; font-family: georgia, serif; font-size: 14px"><em>Hope this donation helps you in some ways. We wish you success in your endeavors.&nbsp;</em></span></div>
                                                                                    <div style="font-family: inherit; text-align: center"><br></div>
                                                                                    <div style="font-family: inherit; text-align: center"><span style="color: #d9d9d9; font-family: georgia, serif; font-size: 14px"><em>It is an effort from a student who is in constant search of his ikigai. If you are facing any issues you can count on us.&nbsp;</em></span></div>
                                                                                    <div></div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!--[if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                </center>
                                <![endif]-->
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </center>
    </body>
    
    </html>
    `
    return emailBody
}

exports.createMessageEmailBody = function (replyTo, senderName, messageText) {
    const emailBody = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <style type="text/css">
        body,
        p,
        div {
            font-family: arial, helvetica, sans-serif;
            font-size: 14px;
        }
        
        body {
            color: #000000;
        }
        
        body a {
            color: #1188E6;
            text-decoration: none;
        }
        
        p {
            margin: 0;
            padding: 0;
        }
        
        table.wrapper {
            width: 100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        img.max-width {
            max-width: 100% !important;
        }
        
        .column.of-2 {
            width: 50%;
        }
        
        .column.of-3 {
            width: 33.333%;
        }
        
        .column.of-4 {
            width: 25%;
        }
        
        ul ul ul ul {
            list-style-type: disc !important;
        }
        
        ol ol {
            list-style-type: lower-roman !important;
        }
        
        ol ol ol {
            list-style-type: lower-latin !important;
        }
        
        ol ol ol ol {
            list-style-type: decimal !important;
        }
        
        @media screen and (max-width:480px) {
            .preheader .rightColumnContent,
            .footer .rightColumnContent {
                text-align: left !important;
            }
            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
                text-align: left !important;
            }
            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
            }
            table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
            }
            img.max-width {
                height: auto !important;
                max-width: 100% !important;
            }
            a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            .columns {
                width: 100% !important;
            }
            .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
            .social-icon-column {
                display: inline-block !important;
            }
        }
    </style>
</head>

<body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                <tr>
                    <td valign="top" bgcolor="#FFFFFF" width="100%">
                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td width="100%">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td>
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                    <tr>
                                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left">
                                                            <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                                                <tr>
                                                                    <td role="module-content">
                                                                        <p></p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="3dab09b4-352a-4af9-8ddc-0bf8fef1736d">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                                                                            <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true"
                                                                                data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/2047cbcd71aa177b/f77901ce-834f-4aec-8cd9-2e726bdcc16d/1440x243.png">
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="df106320-0212-4623-af28-b37fd30181a0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:23px 23px 23px 23px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                                                            <div>
                                                                                <div style="font-family: inherit"><span style="font-size: 14px">Dear Annapurna Team,</span></div>
                                                                                <div style="font-family: inherit"><br></div>
                                                                                <div style="font-family: inherit"><span style="font-size: 14px">We have a message</span></div>
                                                                                <div style="font-family: inherit"><br></div>
                                                                                <div style="font-family: inherit"><strong>Sender Name : </strong><span style="font-family: arial, helvetica, sans-serif; font-size: 16px">${senderName}</span></div>
                                                                                <div style="font-family: inherit"><br></div>
                                                                                <div style="font-family: inherit"><strong>Sender Email : </strong><span style="font-family: arial, helvetica, sans-serif; font-size: 16px">${replyTo}</span></div>
                                                                                <div style="font-family: inherit"><br></div>
                                                                                <div style="font-family: inherit"><strong>Message : </strong><span style="font-family: arial, helvetica, sans-serif; font-size: 16px">${messageText}</span></div>
                                                                                <div style="font-family: inherit"><br></div>
                                                                                <div style="font-family: inherit"><span style="font-family: arial, helvetica, sans-serif; font-size: 14px">Reply to this email directly to email the sender directly.</span></div>
                                                                                <div></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="fc682270-462a-4f98-b31c-9211806be5b7">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:23px 23px 23px 23px; line-height:22px; text-align:inherit; background-color:#828282;" height="100%" valign="top" bgcolor="#828282" role="module-content">
                                                                            <div>
                                                                                <div style="font-family: inherit; text-align: center"><span style="font-size: 14px; color: #ffffff"><br>
© 2023 Project Annapurna. All rights reserved</span></div>
                                                                                <div style="font-family: inherit; text-align: center"><br></div>
                                                                                <div></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>

    `

    return emailBody
}
