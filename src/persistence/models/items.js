module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('items', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamp: false
  });

  return Items;
};