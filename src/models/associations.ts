import User from "./users/userModel";
import Person from "./users/personModel";
import UserRole from "./users/userRoleModel";
import UserRequest from "./users/userRequestModel";
import Status from "./assets/statusModel";
import UserDataHistoric from "./users/userDataHistoricModel";
import UserRolesHistoric from "./users/userRolesHistoricModel";
import Stage from "./assets/stageModel";
import StageType from "./assets/stageTypeModel";
import Vaccine from "./supplys/vaccineModel";
import VaccineType from "./supplys/vaccineTypeModel";
import SwineCutBatches from "./stocks/swineCutBatchesModel";
import SwineCutType from "./stocks/swineCutTypeModel";
import SwineCutProduction from "./stocks/swineCutProductionModel";
import Swine from "./stocks/swineModel";
import Feed from "./stocks/feedModel";
import VaccineBatch from "./supplys/vaccineBatchModel";
import SwineVaccine from "./supplys/swineVaccineModel";
import SwineBatch from "./stocks/swineBatchModel";
import FeedBatche from "./supplys/feedBatcheModel";
import SwineFeed from "./supplys/swineFeedModel";
import StockPrice from "./stocks/stockPriceModel";
import SalesCheck from "./sales/salesCheckModel";
import Client from "./sales/clientModel";
import SalesChecksDetail from "./sales/salesChecksDetailModel";
import CaiCodeRange from "./sales/caiCodeRangeModel";
import CaiCode from "./sales/caiCodeModel";
import CaiCodeCheck from "./sales/caiCodeCheckModel";
//User

User.belongsTo(Person, {foreignKey : "idPerson", targetKey : "idPerson"}); 
User.belongsTo(UserRole, {foreignKey : "idRole", targetKey: "idRole"});
User.hasMany(UserRequest, {foreignKey: "idUser", sourceKey : "idUser"});
User.hasMany(UserDataHistoric, {foreignKey: "idUser", sourceKey:"idUser"});

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

//Status
Status.hasMany(UserRequest, { foreignKey: "idStatus" ,sourceKey:"idStatus"});

//UserDataHistoric
UserDataHistoric.belongsTo(User, {foreignKey: "idUser", targetKey : "idUser"});

//UserRoleHistoric
UserRolesHistoric.belongsTo(UserRole, {foreignKey: "oldRoleId", targetKey:"idRole"});
UserRolesHistoric.belongsTo(UserRole, {foreignKey: "newRoleId", targetKey:"idRole"});
//Stages

Stage.belongsTo(StageType, {foreignKey: "idStageType", targetKey: "idStageType"});

//Vaccine 
Vaccine.belongsTo(Stage, {foreignKey: "idStage", targetKey: "idStage" });
Vaccine.belongsTo(VaccineType, {foreignKey: "idVaccineType", targetKey: "idVaccineType"});

//VaccineBatches
VaccineBatch.belongsTo(Vaccine, {foreignKey: "idVaccine", targetKey: "idVaccine"});

//SwineVaccine
SwineVaccine.belongsTo(SwineBatch, {foreignKey: "idSwineBatch", targetKey: "idSwineBatch"});
SwineVaccine.belongsTo(VaccineBatch, {foreignKey: "idVaccineBatch", targetKey: "idVaccineBatch"});
SwineVaccine.belongsTo(User, {foreignKey: "idUser", targetKey:'idUser'});

//SwineCutBatches
SwineCutBatches.belongsTo(SwineCutType, {foreignKey: "idSwinecutType", targetKey: "idSwinecutType"});

//SwineCutProduction
SwineCutProduction.belongsTo(SwineCutType, {foreignKey: "idSwinecutType", targetKey: "idSwinecutType"});
SwineCutProduction.belongsTo(Swine, {foreignKey: "idSwine", targetKey: "idSwine"});

//Feed
Feed.belongsTo(Stage, {foreignKey: "idStage", targetKey: "idStage"});

//FeedBatche
FeedBatche.belongsTo(Feed, {foreignKey: "idFeed", targetKey: "idFeed"});

//SwineFeed
SwineFeed.belongsTo(SwineBatch, {foreignKey: "idSwineBatch", targetKey: "idSwineBatch"});
SwineFeed.belongsTo(FeedBatche, {foreignKey: "idFeedBatch", targetKey: "idFeedBatch"});
SwineFeed.belongsTo(User, {foreignKey: "idUser", targetKey: "idUser"});

//stockPrice
StockPrice.belongsTo(SwineCutType, {foreignKey: "idSwinecutType", targetKey: "idSwinecutType"});

//SaleCheck
SalesCheck.belongsTo(User, {foreignKey: "idUser", targetKey: "idUser"});
SalesCheck.belongsTo(Client, {foreignKey: "idClient", targetKey: "idClient"});

//SalesChecksDetail
SalesChecksDetail.belongsTo(SalesCheck, {foreignKey: "idSalesCheck", targetKey: "idSalesCheck"});
SalesChecksDetail.belongsTo(SwineCutType, {foreignKey: "idSwinecutType", targetKey: "idSwinecutType"});

//CaiCodeRange
CaiCodeRange.belongsTo(CaiCode, {foreignKey: "idCaiCode", targetKey: "idCaiCode"});

//CaiCodeCheck
CaiCodeCheck.belongsTo(CaiCode, {foreignKey: "idCaiCode", targetKey: "idCaiCode"});
CaiCodeCheck.belongsTo(SalesCheck, {foreignKey: "idSalesCheck", targetKey: "idSalesCheck"});
