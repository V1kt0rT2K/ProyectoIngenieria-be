import User from "./users/userModel";
import Person from "./users/personModel";
import UserRole from "./users/userRoleModel";
import UserRequest from "./users/userRequestModel";
import Status from "./assets/statusModel";
import UserDataHistoric from "./users/userDataHistoricModel";
import UserRolesHistoric from "./users/userRolesHistoricModel";
import StageType from "./assets/stageTypeModel";
import Stage from "./assets/stageModel";
import VaccineType from "./supplys/vaccineTypeModel";
import Vaccine from "./supplys/vaccineModel";
import Swine from "./stocks/swineModel";
import SwineCutBatch from "./stocks/swineCutBatchModel";
import SwineCutType from "./stocks/swineCutTypeModel";
import SwineCutProduction from "./stocks/swineCutProductionModel";
import Feed from "./stocks/feedModel";
import VaccineBatch from "./supplys/vaccineBatchModel";
import SwineVaccine from "./supplys/swineVaccineModel";
import SwineBatch from "./stocks/swineBatchModel";
import FeedBatch from "./supplys/feedBatchModel";
import SwineFeed from "./supplys/swineFeedModel";
import StockPrice from "./stocks/stockPriceModel";
import SalesCheck from "./sales/salesCheckModel";
import Client from "./sales/clientModel";
import SalesChecksDetail from "./sales/salesChecksDetailModel";
import CaiCodeRange from "./sales/caiCodeRangeModel";
import CaiCode from "./sales/caiCodeModel";
import CaiCodeCheck from "./sales/caiCodeCheckModel";
import StatusType from "./assets/statusTypeModel";

/********** USERS SCHEMA *********/  
//User
User.belongsTo(Person, {foreignKey : "idPerson", targetKey : "idPerson"}); 
User.belongsTo(UserRole, {foreignKey : "idRole", targetKey: "idRole"});
User.hasMany(UserRequest, {foreignKey: "idUser", sourceKey : "idUser"});
User.hasMany(UserDataHistoric, {foreignKey: "idUser", sourceKey:"idUser"});
User.hasMany(SwineVaccine,{foreignKey:"idUser", sourceKey:"idUser"});
User.hasMany(SwineFeed,{foreignKey:"idUser", sourceKey:"idUser"});

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

//StageType
StageType.hasMany(Stage, {foreignKey:"idStageType", sourceKey:"idStageType"});

//Stages
Stage.belongsTo(StageType, {foreignKey: "idStageType", targetKey: "idStageType"});
Stage.hasMany(Vaccine, {foreignKey:"idStage", sourceKey:"idStage"});
Stage.hasMany(SwineBatch, {foreignKey:"idStage", sourceKey:"idStage"});
Stage.hasMany(Feed, {foreignKey:"idStage", sourceKey:"idStage"});

/********** SUPPLY SCHEMA *********/  

//VaccineType
VaccineType.hasMany(Vaccine, {foreignKey:"idVaccineType", sourceKey:"idVaccineType"});

//Vaccine
Vaccine.belongsTo(Stage, {foreignKey:"idStage", targetKey:"idStage"});
Vaccine.belongsTo(VaccineType, {foreignKey:"idVaccineType", targetKey:"idVaccineType"});
Vaccine.hasMany(VaccineBatch, {foreignKey:"idVaccine", sourceKey:"idVaccine"});

//VaccineBatches
VaccineBatch.belongsTo(Vaccine, {foreignKey:"idVaccine", targetKey:"idVaccine"});
VaccineBatch.belongsToMany(SwineBatch,{through: SwineVaccine , foreignKey:"idVaccineBatch", otherKey:"idSwineBatch", uniqueKey:"ukVaccineBatch_SwineBatch"});

//Swine
Swine.belongsTo(SwineBatch, {foreignKey:"idSwineBatch", targetKey:"idSwineBatch"});
Swine.belongsToMany(SwineCutType, {through: SwineCutProduction, foreignKey:"idSwine", otherKey:"idSwineCutType", uniqueKey:"ukSwine_SwineCutType"});

//SwineBatches
SwineBatch.hasMany(Swine, {foreignKey:"idSwineBatch", sourceKey:"idSwineBatch"});
SwineBatch.belongsTo(Stage, {foreignKey:"idStage", targetKey:"idStage"});
SwineBatch.belongsToMany(VaccineBatch,{through: SwineVaccine , foreignKey: "idSwineBatch",otherKey:"idVaccineBatch", uniqueKey:"ukVaccineBatch_SwineBatch"});
SwineBatch.belongsToMany(FeedBatch, {through: SwineFeed, foreignKey:"idSwineBatch", otherKey:"idFeedBatch", uniqueKey:"ukSwineBatch_FeedBatch"});

//SwineVaccines
SwineVaccine.belongsTo(User, {foreignKey:"idUser", targetKey:"idUser"});

//SwineFeeds
SwineFeed.belongsTo(User, {foreignKey:"idUser", targetKey:"idUser"});

//Feeds
Feed.belongsTo(Stage, {foreignKey:"idStage", targetKey:"idStage"});
Feed.hasMany(FeedBatch, {foreignKey:"idFeed", sourceKey:"idFeed"});

//FeedBatches
FeedBatch.belongsTo(Feed, {foreignKey:"idFeed", targetKey:"idFeed"});
FeedBatch.belongsToMany(SwineBatch, {through:SwineFeed, foreignKey:"idFeedBatch", otherKey:"idSwineBatch", uniqueKey:"ukSwineBatch_FeedBatch"});

//SwineCutTypes
SwineCutType.hasMany(SwineCutBatch, {foreignKey:"idSwineCutType", sourceKey:"idSwineCutType"});
SwineCutType.belongsToMany(Swine, {through:SwineCutProduction, foreignKey:"idSwineCutType", otherKey:"idSwine", uniqueKey:"ukSwine_SwineCutType"});

//SwineCutBatches
SwineCutBatch.belongsTo(SwineCutType, {foreignKey:"idSwineCutType" , targetKey:"idSwineCutType"});



