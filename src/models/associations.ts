import User from "./userModel";
import Person from "./personModel";
import UserRole from "./userRoleModel";
import UserRequest from "./userRequestModel";
import Status from "./statusModel";
import UserDataHistoric from "./userDataHistoricModel";
import UserRolesHistoric from "./userRolesHistoricModel";
import Stage from "./stageModel";
import StageType from "./stageTypeModel";
import Vaccine from "./vaccineModel";
import VaccineType from "./vaccineTypeModel";
import SwineCutBatches from "./swineCutBatchesModel";
import SwineCutType from "./swinecutTypeModel";
import SwineCutProduction from "./swineCutProductionModel";
import Swine from "./swineModel";
import Feed from "./feedModel";
import VaccineBatch from "./vaccineBatchModel";
import SwineVaccine from "./swineVaccineModel";
import SwineBatch from "./swineBatchModel";
import FeedBatche from "./feedBatcheModel";
import SwineFeed from "./swineFeedModel";
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