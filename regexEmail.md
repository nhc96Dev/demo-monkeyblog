lấy username từ email
const gmail = "nhc221096@gmail.com";
const gmailRegex = /^(.+)@(\S+)$/gm.exec(gmail);
const username = gmailRegex[1];
console.log("PostDetailsPage ~ username: ", username);
