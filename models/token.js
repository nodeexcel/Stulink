function token(database, type) {
  const Token = database.define(
    "token",
    {
      token: type.STRING,
    },
    { timestamps: false }
  );
  Token.associate = (models) => {
    models.User.hasMany(Token, {
      foreignKey: "userId",
    });
  };
  return Token;
}

module.exports = token;
