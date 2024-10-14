import { Sequelize } from "sequelize";

const sequelizeTransactions = new Sequelize({
	database: "transactions",
	dialect: "sqlite",
	storage: "./database/transactions.sqlite",
	logging: false,
});

sequelizeTransactions
	.authenticate()
	.then(async () => {
		await sequelizeTransactions
			.sync({ alter: true })
			.then(() => console.log("Database is synchronised for Transactions db"));
		console.log("Connection established for Transactions db");
	})
	.catch((err) => console.error("Unable to connect to Transactions database: ", err));

const sequelizeProducts = new Sequelize({
	database: "products",
	dialect: "sqlite",
	storage: "./database/products.sqlite",
	logging: false,
});


sequelizeProducts
	.authenticate()
	.then(async () => {
		await sequelizeProducts
			.sync({ alter: true })
			.then(() => console.log("Database is synchronised for products db"));
		console.log("Connection established for products db");
	})
	.catch((err) =>
		console.error("Unable to connect to products database: ", err),
	);

const sequelizeUsers = new Sequelize({
	database: "users",
	dialect: "sqlite",
	storage: "./database/users.sqlite",
	logging: false,
});

sequelizeUsers
	.authenticate()
	.then(async () => {
		await sequelizeUsers
			.sync({ alter: true })
			.then(() => console.log("Database is synchronised for users db"));
		console.log("Connection established for users db");
	})
	.catch((err) => console.error("Unable to connect to users database: ", err));

export { sequelizeProducts, sequelizeUsers };
