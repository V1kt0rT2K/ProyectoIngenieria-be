import User from "./users/userModel";
import Person from "./users/personModel";
import UserRole from "./users/userRoleModel";
import UserRequest from "./users/userRequestModel";
import Status from "./assets/statusModel";
import UserDataHistoric from "./users/userDataHistoricModel";
import UserRolesHistoric from "./users/userRolesHistoricModel";
import StageType from "./assets/stageTypeModel";
import Stage from "./assets/stageModel";
import SalesCheck from "./sales/salesCheckModel";
import Client from "./sales/clientModel";
import OrderWholesaler from "./sales/orderWholesalerModel";
import OrderWholesalerDetails from "./sales/orderWholesalerDetailsModel";
import SalesChecksDetail from "./sales/salesChecksDetailModel";
import CaiCodeRange from "./sales/caiCodeRangeModel";
import CaiCode from "./sales/caiCodeModel";
import StatusType from "./assets/statusTypeModel";
import SwineSupply from "./supplys/swineSupplyModel";
import Supply from "./supplys/supplyModel";
import SupplyType from "./supplys/supplyTypeModel";
import SupplyBatch from "./supplys/supplyBatchModel";
import SwineBatch from "./stocks/swineBatchModel";
import Product from "./stocks/productModel";
import ProductBatch from "./stocks/productBatchModel";
import SupplyPurcharse from "./orders/supplyPurcharseModel";
import Provider from "./orders/providerModel";
import SupplyPurcharseDetail from "./orders/supplyPurcharseDetailModel";
import Action from "./assets/actionModel";
import ActionRole from "./users/actionRoleModel";
import ClientType from "./sales/clientTypeModel";

/********** USERS SCHEMA *********/  
//User
User.belongsTo(Person, {foreignKey : "idPerson", targetKey : "idPerson"}); 
User.belongsTo(UserRole, {foreignKey : "idRole", targetKey: "idRole"});
User.hasMany(UserRequest, {foreignKey: "idUser", sourceKey : "idUser"});
User.hasMany(UserDataHistoric, {foreignKey: "idUser", sourceKey:"idUser"});
User.hasMany(SwineSupply,{foreignKey:"idUser", sourceKey:"idUser"});
User.hasMany(SalesCheck, {foreignKey:"idUser", sourceKey:"idUser"});
User.hasMany(SupplyPurcharse, {foreignKey:"idUser", sourceKey:"idUser"});


//Person
Person.hasOne(User, {foreignKey: "idPerson", sourceKey:"idPerson"});

//UserRequest
UserRequest.belongsTo(Status, { foreignKey: 'idStatus', targetKey: "idStatus"});
UserRequest.belongsTo(User, {foreignKey:"idUser" , targetKey: "idUser"});
UserRequest.belongsTo(UserRole, {foreignKey : "idRole", targetKey: "idRole"});

//UserRole
UserRole.hasMany(User , {foreignKey: "idRole", sourceKey:"idRole"});
UserRole.hasMany(UserRequest,  {foreignKey : "idRole", sourceKey: "idRole"});
UserRole.hasMany(UserRolesHistoric, {foreignKey:"oldRoleId", sourceKey:"idRole"});
UserRole.hasMany(UserRolesHistoric, {foreignKey:"newRoleId", sourceKey:"idRole"});
UserRole.belongsToMany(Action, { through: ActionRole, foreignKey:"idRole", otherKey:"idAction", uniqueKey:"ukAction_Role"});

//UserDataHistoric
UserDataHistoric.belongsTo(User, {foreignKey: "idUser", targetKey : "idUser"});

//UserRoleHistoric
UserRolesHistoric.belongsTo(UserRole, {foreignKey: "oldRoleId", targetKey:"idRole"});
UserRolesHistoric.belongsTo(UserRole, {foreignKey: "newRoleId", targetKey:"idRole"});

/********** ASSET SCHEMA *********/  

//StatusType
StatusType.hasMany(Status, {foreignKey: "idStatusType", sourceKey:"idStatusType"});

//Status
Status.hasMany(UserRequest, { foreignKey: "idStatus" ,sourceKey:"idStatus"});
Status.belongsTo(StatusType, { foreignKey: "idStatusType", targetKey: "idStatusType"});
Status.hasMany(SupplyPurcharse, {foreignKey:"idStatus", sourceKey:"idStatus"});
Status.hasMany(SupplyPurcharse, {foreignKey:"idStatus", sourceKey:"idStatus"});
Status.hasMany(OrderWholesaler, {foreignKey:"idStatus", sourceKey:"idStatus"});

//StageType
StageType.hasMany(Stage, {foreignKey:"idStageType", sourceKey:"idStageType"});

//Stages
Stage.belongsTo(StageType, {foreignKey: "idStageType", targetKey: "idStageType"});
Stage.hasMany(Supply, {foreignKey:"idStage", sourceKey:"idStage"});
Stage.hasMany(SwineBatch, { foreignKey:"idStage", sourceKey:"idStage"});

//Actions
Action.belongsToMany(UserRole, {through : ActionRole, foreignKey:"idAction", otherKey:"idRole", uniqueKey:"ukAction_Role"});

/********** SUPPLY SCHEMA *********/ 

//SupplyType
SupplyType.hasMany(Supply, {foreignKey:"idSupplyType", sourceKey:"idSupplyType"});

//Supply 
Supply.belongsTo(Stage, {foreignKey:"idStage", targetKey:"idStage"});
Supply.belongsTo(SupplyType, {foreignKey:"idSupplyType", targetKey:"idSupplyType"});
Supply.hasMany(SupplyBatch, {foreignKey:"idSupply", sourceKey:"idSupply"});
Supply.belongsToMany(SwineBatch, {through: SwineSupply , foreignKey:"idSupply", otherKey:"idSwineBatch"});
Supply.belongsToMany(SupplyPurcharse , {through: SupplyPurcharseDetail , foreignKey:"idSupply", otherKey:"idSupplyPurcharse", uniqueKey:"ukSupplyPurcharse_Supply"});
Supply.hasMany(SwineSupply, {foreignKey:"idSupply", sourceKey:"idSupply"});

//SupplyBatch
SupplyBatch.belongsTo(Supply, {foreignKey:"idSupply", targetKey:"idSupply"});

//SwineSupply
SwineSupply.belongsTo(User, {foreignKey:"idUser", targetKey:"idUser"});
SwineSupply.belongsTo(SwineBatch, {foreignKey:"idSwineBatch", targetKey:"idSwineBatch"});
SwineSupply.belongsTo(Supply, {foreignKey:"idSupply", targetKey:"idSupply"});

/*********** STOCK SCHEMA *********/

//SwineBatch
SwineBatch.belongsToMany(Supply, { through : SwineSupply , foreignKey:"idSwineBatch", otherKey:"idSupply"});
SwineBatch.belongsTo(Stage, {foreignKey:"idStage", targetKey:"idStage"});
SwineBatch.hasMany(ProductBatch, { foreignKey:"idSwineBatch", sourceKey:"idSwineBatch"});
SwineBatch.hasMany(SwineSupply, {foreignKey:"idSwineBatch", sourceKey:"idSwineBatch"});
//Product
Product.belongsToMany(SalesCheck, { through: SalesChecksDetail , foreignKey:"idProduct", otherKey:"idSalesCheck", uniqueKey:"ukSalesCheck_Product"});
Product.hasMany(ProductBatch, { foreignKey:"idProduct", sourceKey:"idProduct"});

//ProductBatch
ProductBatch.belongsTo(Product, {foreignKey:"idProduct", targetKey:"idProduct"});
ProductBatch.belongsTo(SwineBatch, {foreignKey:"idSwineBatch", targetKey:"idSwineBatch"});


/********* SALES SCHEMA **********/

//ClientTypes
ClientType.hasMany(Client, {foreignKey:"idClientType", sourceKey:"idClientType"});

//Clients
Client.hasMany(SalesCheck, {foreignKey:"idClient", sourceKey:"idClient"});
Client.hasMany(OrderWholesaler, {foreignKey:"idClient", sourceKey:"idClient"});
Client.belongsTo(ClientType , {foreignKey:"idClientType", targetKey:"idClientType"});

//SalesChecks
SalesCheck.belongsTo(User, {foreignKey:"idUser", targetKey:"idUser"});
SalesCheck.belongsTo(Client, {foreignKey:"idClient", targetKey:"idClient"});
SalesCheck.belongsToMany(Product, {through:SalesChecksDetail, foreignKey:"idSalesCheck", otherKey:"idProduct", uniqueKey:"ukSalesCheck_Product"});
SalesCheck.belongsTo(CaiCodeRange, {foreignKey:"idCaiCodeRange", targetKey:"idCaiCodeRange"});

//CaiCodes
CaiCode.hasMany(CaiCodeRange, {foreignKey:"idCaiCode", sourceKey:"idCaiCode"});

//CaiCodeRange
CaiCodeRange.belongsTo(CaiCode, {foreignKey:"idCaiCode", targetKey:"idCaiCode"});
CaiCodeRange.hasMany(SalesCheck, {foreignKey:"idCaiCodeRange",sourceKey:"idCaiCodeRange"});

//OrderWholesaler
OrderWholesaler.hasMany(OrderWholesalerDetails, { foreignKey: "idOrderWholesaler", sourceKey: "idOrderWholesaler"});

//OrderWholesalerDetails
OrderWholesalerDetails.belongsTo(OrderWholesaler, { foreignKey: "idOrderWholesaler", targetKey: "idOrderWholesaler" });
OrderWholesalerDetails.belongsTo(Client, { foreignKey: "idClient", targetKey: "idClient" });
OrderWholesalerDetails.belongsTo(Status, { foreignKey: "idStatus", targetKey: "idStatus" });

/********** ORDERS SCHEMA  ***************/

//Provider
Provider.hasMany(SupplyPurcharse, {foreignKey:"idProvider", sourceKey:"idProvider"});

//SupplyPurcharse
SupplyPurcharse.belongsTo(Provider , {foreignKey:"idProvider", targetKey:"idProvider"});
SupplyPurcharse.belongsTo(User, {foreignKey:"idUser", targetKey:"idUser"});
SupplyPurcharse.belongsTo(Status, {foreignKey:"idStatus", targetKey:"idStatus"});
SupplyPurcharse.belongsToMany(Supply ,{ through: SupplyPurcharseDetail, foreignKey:"idSupplyPurcharse", otherKey:"idSupply", uniqueKey:"ukSupplyPurcharse_Supply"});
//RELACION INTERNA  FormerSupplyPurcharse
SupplyPurcharse.hasOne(SupplyPurcharse, {as: "CurrentSupplyPurcharse", foreignKey: "idFormerSupplyPurcharse",sourceKey: "idSupplyPurcharse"});
SupplyPurcharse.belongsTo(SupplyPurcharse, {as: "FormerSupplyPurcharse", foreignKey: "idFormerSupplyPurcharse",targetKey: "idSupplyPurcharse"});

