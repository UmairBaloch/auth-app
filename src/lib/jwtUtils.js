import jwt from "jsonwebtoken";

const secretKey =
  "zBmCS8SMRVCtRxX69KPOAzD24O4C47bAsrkO3_E2BOv44Mt6bVL1vgAo8oIEpwEL";
export const generateToken = async (payload, expiresIn) => {
  const options = {
    expiresIn: expiresIn || 900,
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized", status: 401 });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: `Unauthorized: ${err.message}`, error: err });
    }
    req.user = decoded;
    next();
  });
};
