module.exports = (sequelize, DataTypes) => {
  const Survivors = sequelize.define('survivors', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UpdatedAt: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Survivors;
};