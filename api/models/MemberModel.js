const conn = require("../connect")
const { DataTypes } = require("sequelize")
const PackageModel = require("./PackageModel")

const MemberModel = conn.define("member", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  packageId: {
    type: DataTypes.BIGINT,
  },
  name: {
    type: DataTypes.STRING(255)
  },
  phone: {
    type: DataTypes.STRING(255)
  },
  pass: {
    type: DataTypes.STRING(255)
  }
})

// หากสร้างตารางแล้ว ให้เอาออก
// MemberModel.sync({alter: true})

// ไม่แนะนำ ทำให้ DB ทำงานหนัก
// MemberModel.belongsTo(PackageModel)

module.exports = MemberModel