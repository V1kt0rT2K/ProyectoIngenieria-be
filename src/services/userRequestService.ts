import express, { Express, Request, Response } from "express";
import UserRequest from "../models/userRequestModel";

class UserRequestService {
    constructor(){}

    async getAllRequest() {
        return await UserRequest.findAll();
    }
}

export default UserRequestService;