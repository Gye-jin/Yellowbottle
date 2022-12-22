package com.spring.back.content;

import com.spring.back.entity.Content;

public class ContentTemplate {

	public static String contentTemplate(Content content1, Content content2, Content content3) {
		// [Move C - ZERO] 클릭 시 이동되는 사이트 주소
		String czeroURL = "http://localhost:3000/";
		
		String tp = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n"
				+ "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\r\n"
				+ "<head>\r\n" + "<!--[if gte mso 9]>\r\n" + "<xml>\r\n" + "  <o:OfficeDocumentSettings>\r\n"
				+ "    <o:AllowPNG/>\r\n" + "    <o:PixelsPerInch>96</o:PixelsPerInch>\r\n"
				+ "  </o:OfficeDocumentSettings>\r\n" + "</xml>\r\n" + "<![endif]-->\r\n"
				+ "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\r\n"
				+ "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n"
				+ "  <meta name=\"x-apple-disable-message-reformatting\">\r\n"
				+ "  <!--[if !mso]><!--><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><!--<![endif]-->\r\n"
				+ "  <title></title>\r\n" + "  \r\n" + "    <style type=\"text/css\">\r\n"
				+ "      @media only screen and (min-width: 620px) {\r\n" + "  .u-row {\r\n"
				+ "    width: 600px !important;\r\n" + "  }\r\n" + "  .u-row .u-col {\r\n"
				+ "    vertical-align: top;\r\n" + "  }\r\n" + "\r\n" + "  .u-row .u-col-100 {\r\n"
				+ "    width: 600px !important;\r\n" + "  }\r\n" + "\r\n" + "}\r\n" + "\r\n"
				+ "@media (max-width: 620px) {\r\n" + "  .u-row-container {\r\n" + "    max-width: 100% !important;\r\n"
				+ "    padding-left: 0px !important;\r\n" + "    padding-right: 0px !important;\r\n" + "  }\r\n"
				+ "  .u-row .u-col {\r\n" + "    min-width: 320px !important;\r\n"
				+ "    max-width: 100% !important;\r\n" + "    display: block !important;\r\n" + "  }\r\n"
				+ "  .u-row {\r\n" + "    width: 100% !important;\r\n" + "  }\r\n" + "  .u-col {\r\n"
				+ "    width: 100% !important;\r\n" + "  }\r\n" + "  .u-col > div {\r\n" + "    margin: 0 auto;\r\n"
				+ "  }\r\n" + "}\r\n" + "body {\r\n" + "  margin: 0;\r\n" + "  padding: 0;\r\n" + "}\r\n" + "\r\n"
				+ "table,\r\n" + "tr,\r\n" + "td {\r\n" + "  vertical-align: top;\r\n"
				+ "  border-collapse: collapse;\r\n" + "}\r\n" + "\r\n" + "p {\r\n" + "  margin: 0;\r\n" + "}\r\n"
				+ "\r\n" + ".ie-container table,\r\n" + ".mso-container table {\r\n" + "  table-layout: fixed;\r\n"
				+ "}\r\n" + "\r\n" + "* {\r\n" + "  line-height: inherit;\r\n" + "}\r\n" + "\r\n"
				+ "a[x-apple-data-detectors='true'] {\r\n" + "  color: inherit !important;\r\n"
				+ "  text-decoration: none !important;\r\n" + "}\r\n" + "\r\n"
				+ "table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-container-padding-padding { padding: 30px 10px 20px !important; } #u_content_heading_1 .v-font-size { font-size: 26px !important; } #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 85% !important; } #u_content_text_1 .v-container-padding-padding { padding: 60px 10px 10px !important; } #u_content_text_6 .v-container-padding-padding { padding: 60px 10px 10px !important; } #u_content_text_5 .v-container-padding-padding { padding: 60px 10px 10px !important; } #u_content_button_1 .v-container-padding-padding { padding: 10px !important; } #u_content_button_1 .v-size-width { width: 65% !important; } }\r\n"
				+ "    </style>\r\n" + "  \r\n" + "  \r\n" + "\r\n"
				+ "<!--[if !mso]><!--><link href=\"https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap\" rel=\"stylesheet\" type=\"text/css\"><link href=\"https://fonts.googleapis.com/css2?family=Epilogue:wght@500&display=swap\" rel=\"stylesheet\" type=\"text/css\"><!--<![endif]-->\r\n"
				+ "\r\n" + "</head>\r\n" + "\r\n"
				+ "<body class=\"clean-body u_body\" style=\"margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000\">\r\n"
				+ "  <!--[if IE]><div class=\"ie-container\"><![endif]-->\r\n"
				+ "  <!--[if mso]><div class=\"mso-container\"><![endif]-->\r\n"
				+ "  <table id=\"u_body\" style=\"border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%\" cellpadding=\"0\" cellspacing=\"0\">\r\n"
				+ "  <tbody>\r\n" + "  <tr style=\"vertical-align: top\">\r\n"
				+ "    <td style=\"word-break: break-word;border-collapse: collapse !important;vertical-align: top\">\r\n"
				+ "    <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color: #ecf0f1;\"><![endif]-->\r\n"
				+ "    \r\n" + "\r\n"
				+ "<div class=\"u-row-container\" style=\"padding: 0px;background-color: transparent\">\r\n"
				+ "  <div class=\"u-row\" style=\"Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;\">\r\n"
				+ "    <div style=\"border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;\">\r\n"
				+ "      <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding: 0px;background-color: transparent;\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:600px;\"><tr style=\"background-color: transparent;\"><![endif]-->\r\n"
				+ "      \r\n"
				+ "<!--[if (mso)|(IE)]><td align=\"center\" width=\"600\" style=\"width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;\" valign=\"top\"><![endif]-->\r\n"
				+ "<div class=\"u-col u-col-100\" style=\"max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;\">\r\n"
				+ "  <div style=\"height: 100%;width: 100% !important;\">\r\n"
				+ "  <!--[if (!mso)&(!IE)]><!--><div style=\"height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;\"><!--<![endif]-->\r\n"
				+ "  \r\n"
				+ "<table id=\"u_content_heading_1\" style=\"font-family:'Open Sans',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n"
				+ "  <tbody>\r\n" + "    <tr>\r\n"
				+ "      <td class=\"v-container-padding-padding\" style=\"overflow-wrap:break-word;word-break:break-word;padding:60px 10px 20px;font-family:'Open Sans',sans-serif;\" align=\"left\">\r\n"
				+ "        \r\n"
				+ "  <h1 class=\"v-font-size\" style=\"margin: 0px; line-height: 130%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: Epilogue; font-size: 32px;\"><strong>Hello<br />Yellowbottle Premium</strong></h1>\r\n"
				+ "\r\n" + "      </td>\r\n" + "    </tr>\r\n" + "  </tbody>\r\n" + "</table>\r\n" + "\r\n"
				+ "<table id=\"u_content_image_1\" style=\"font-family:'Open Sans',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n"
				+ "  <tbody>\r\n" + "    <tr>\r\n"
				+ "      <td class=\"v-container-padding-padding\" style=\"overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Open Sans',sans-serif;\" align=\"left\">\r\n"
				+ "        \r\n" + "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n"
				+ "  <tr>\r\n" + "    <td style=\"padding-right: 0px;padding-left: 0px;\" align=\"center\">\r\n"
				+ "      \r\n"
				+ "      <img align=\"center\" border=\"0\" src=\"images/image-1.png\" alt=\"\" title=\"\" style=\"outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 55%;max-width: 319px;\" width=\"319\" class=\"v-src-width v-src-max-width\"/>\r\n"
				+ "      \r\n" + "    </td>\r\n" + "  </tr>\r\n" + "</table>\r\n" + "\r\n" + "      </td>\r\n"
				+ "    </tr>\r\n" + "  </tbody>\r\n" + "</table>\r\n" + "\r\n"
				+ "  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->\r\n" + "  </div>\r\n" + "</div>\r\n"
				+ "<!--[if (mso)|(IE)]></td><![endif]-->\r\n"
				+ "      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->\r\n" + "    </div>\r\n"
				+ "  </div>\r\n" + "</div>\r\n" + "\r\n" + "\r\n" + "\r\n"
				+ "<div class=\"u-row-container\" style=\"padding: 0px;background-color: transparent\">\r\n"
				+ "  <div class=\"u-row\" style=\"Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;\">\r\n"
				+ "    <div style=\"border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;\">\r\n"
				+ "      <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding: 0px;background-color: transparent;\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:600px;\"><tr style=\"background-color: transparent;\"><![endif]-->\r\n"
				+ "      \r\n"
				+ "<!--[if (mso)|(IE)]><td align=\"center\" width=\"600\" style=\"background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;\" valign=\"top\"><![endif]-->\r\n"
				+ "<div class=\"u-col u-col-100\" style=\"max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;\">\r\n"
				+ "  <div style=\"background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;\">\r\n"
				+ "  <!--[if (!mso)&(!IE)]><!--><div style=\"height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;\"><!--<![endif]-->\r\n"
				+ "  \r\n"
				+ "<table id=\"u_content_text_1\" style=\"font-family:'Open Sans',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n"
				+ "  <tbody>\r\n" + "    <tr>\r\n"
				+ "      <td class=\"v-container-padding-padding\" style=\"overflow-wrap:break-word;word-break:break-word;padding:60px 30px 10px;font-family:'Open Sans',sans-serif;\" align=\"left\">\r\n"
				+ "        \r\n"
				+ "  <div style=\"line-height: 140%; text-align: justify; word-wrap: break-word;\">\r\n"
				+ "    <p style=\"font-size: 14px; line-height: 140%;\"><strong><a href ="+content1.getContentUrl()+">"+content1.getContentTitle()+"</a></strong>,</p>\r\n"
				+ "<p style=\"font-size: 14px; line-height: 140%;\"> </p>\r\n"
				+ "<p style=\"font-size: 14px; line-height: 140%;\">"+content1.getContentContent()+"</p>\r\n"
				+ "  </div>\r\n" + "\r\n" + "      </td>\r\n" + "    </tr>\r\n" + "  </tbody>\r\n" + "</table>\r\n"
				+ "\r\n"
				+ "<table id=\"u_content_text_6\" style=\"font-family:'Open Sans',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n"
				+ "  <tbody>\r\n" + "    <tr>\r\n"
				+ "      <td class=\"v-container-padding-padding\" style=\"overflow-wrap:break-word;word-break:break-word;padding:60px 30px 10px;font-family:'Open Sans',sans-serif;\" align=\"left\">\r\n"
				+ "        \r\n"
				+ "  <div style=\"line-height: 140%; text-align: justify; word-wrap: break-word;\">\r\n"
				+ "    <p style=\"font-size: 14px; line-height: 140%;\"><strong><a href="+content2.getContentUrl()+">"+content2.getContentTitle()+"</a></strong>,</p>\r\n"
				+ "<p style=\"font-size: 14px; line-height: 140%;\"> </p>\r\n"
				+ "<p style=\"font-size: 14px; line-height: 140%;\">"+content2.getContentContent()+"</p>\r\n"
				+ "  </div>\r\n" + "\r\n" + "      </td>\r\n" + "    </tr>\r\n" + "  </tbody>\r\n" + "</table>\r\n"
				+ "\r\n"
				+ "<table id=\"u_content_text_5\" style=\"font-family:'Open Sans',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n"
				+ "  <tbody>\r\n" + "    <tr>\r\n"
				+ "      <td class=\"v-container-padding-padding\" style=\"overflow-wrap:break-word;word-break:break-word;padding:60px 30px 10px;font-family:'Open Sans',sans-serif;\" align=\"left\">\r\n"
				+ "        \r\n"
				+ "  <div style=\"line-height: 140%; text-align: justify; word-wrap: break-word;\">\r\n"
				+ "    <p style=\"font-size: 14px; line-height: 140%;\"><strong><a href="+content3.getContentUrl()+">"+content3.getContentTitle()+"</a></strong>,</p>\r\n"
				+ "<p style=\"font-size: 14px; line-height: 140%;\"> </p>\r\n"
				+ "<p style=\"font-size: 14px; line-height: 140%;\">"+content3.getContentContent()+"</p>\r\n"
				+ "  </div>\r\n" + "\r\n" + "      </td>\r\n" + "    </tr>\r\n" + "  </tbody>\r\n" + "</table>\r\n"
				+ "\r\n"
				+ "<table id=\"u_content_button_1\" style=\"font-family:'Open Sans',sans-serif;\" role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n"
				+ "  <tbody>\r\n" + "    <tr>\r\n"
				+ "      <td class=\"v-container-padding-padding\" style=\"overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 30px;font-family:'Open Sans',sans-serif;\" align=\"left\">\r\n"
				+ "        \r\n"
				+ "  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->\r\n"
				+ "<div align=\"center\">\r\n"
				+ "  <!--[if mso]><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"\" style=\"height:37px; v-text-anchor:middle; width:168px;\" arcsize=\"0%\"  stroke=\"f\" fillcolor=\"#ff5770\"><w:anchorlock/><center style=\"color:#FFFFFF;font-family:'Open Sans',sans-serif;\"><![endif]-->  \r\n"
				+ "    <a href=" + czeroURL + " target=\"_blank\" class=\"v-button v-size-width\" style=\"box-sizing: border-box;display: inline-block;font-family:'Open Sans',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ff5770; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:30%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;\">\r\n"
				+ "      <span style=\"display:block;padding:10px 20px;line-height:120%;\"><span style=\"font-size: 14px; line-height: 16.8px;\">Move Yellowbottle</span></span>\r\n"
				+ "    </a>\r\n" + "  <!--[if mso]></center></v:roundrect><![endif]-->\r\n" + "</div>\r\n" + "\r\n"
				+ "      </td>\r\n" + "    </tr>\r\n" + "  </tbody>\r\n" + "</table>\r\n" + "\r\n"
				+ "  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->\r\n" + "  </div>\r\n" + "</div>\r\n"
				+ "<!--[if (mso)|(IE)]></td><![endif]-->\r\n"
				+ "      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->\r\n" + "    </div>\r\n"
				+ "  </div>\r\n" + "</div>\r\n" + "\r\n" + "\r\n"
				+ "    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\r\n" + "    </td>\r\n" + "  </tr>\r\n"
				+ "  </tbody>\r\n" + "  </table>\r\n" + "  <!--[if mso]></div><![endif]-->\r\n"
				+ "  <!--[if IE]></div><![endif]-->\r\n" + "</body>\r\n" + "\r\n" + "</html>\r\n" + "";
		return tp;
	}
}
