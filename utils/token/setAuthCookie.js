// export default function setAuthCookie(res, token) {
//   const secure = !['development', 'test'].includes(process.env.NODE_ENV);
//   return res.cookie('token', token, {
//     expires: new Date(Date.now() + process.env.TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000), // Millisekunden
//     httpOnly: true,
//     secure,
//   });
// }
