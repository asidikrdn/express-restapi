module.exports = (digit) => {
  let otp = [];

  for (let i = 0; i < digit; i++) {
    otp.push(Math.floor(Math.random() * 10));
  }

  return otp.join("");
};