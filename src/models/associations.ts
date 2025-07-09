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