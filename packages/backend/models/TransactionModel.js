import { DataTypes, Model } from "sequelize";
import { sequelizeTransactions } from "../database/db.js";

class TransactionModel extends Model {}
TransactionModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		shopperId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		
		productsAmountJson: {
			type: DataTypes.INTEGER,
			allowNull: false,
            
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize: sequelizeTransactions,
		modelName: "transactions",
	},
);

export default TransactionModel;
